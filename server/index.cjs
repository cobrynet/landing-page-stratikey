const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
// Use Resend for email sending
const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Validate required environment variables on startup
if (!process.env.RESEND_API_KEY) {
  console.error('ERROR: Missing required Resend API key (RESEND_API_KEY)');
  process.exit(1);
}

// Load and process HTML email template
const getEmailTemplate = (templateName, variables = {}) => {
  try {
    const templatePath = path.join(__dirname, 'email-templates', `${templateName}.html`);
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders with actual values
    Object.keys(variables).forEach(key => {
      const placeholder = `{{${key}}}`;
      htmlTemplate = htmlTemplate.replace(new RegExp(placeholder, 'g'), variables[key]);
    });
    
    return htmlTemplate;
  } catch (error) {
    console.error('Error loading email template:', error);
    return null;
  }
};

// Path to Stratikey logos (in production-safe location)
const logoPath = path.resolve(__dirname, 'assets', 'stratikey-logo.png');
const logoWhitePath = path.resolve(__dirname, 'assets', 'stratikey-logo-white.png');

async function sendEmail(options) {
  try {
    // Prepare attachments for Resend format
    let resendAttachments = [];
    if (options.attachments && options.attachments.length > 0) {
      for (const attachment of options.attachments) {
        if (fs.existsSync(attachment.path)) {
          const fileContent = fs.readFileSync(attachment.path);
          resendAttachments.push({
            filename: attachment.filename,
            content: fileContent.toString('base64'),
            contentType: 'image/png',
            contentId: attachment.cid,
            disposition: 'inline'
          });
        }
      }
    }

    const emailData = {
      from: 'Stratikey <info@stratikey.com>',
      to: [options.to],
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    // Add attachments only if they exist
    if (resendAttachments.length > 0) {
      emailData.attachments = resendAttachments;
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(`Resend API error: ${error.message}`);
    }

    return {
      accepted: [options.to],
      rejected: [],
      messageId: data.id,
      response: 'Email sent successfully with Resend'
    };
  } catch (error) {
    console.error('Resend sending error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins in development
app.use(cors());
app.use(express.json());

// Trust proxy for correct IP address handling behind reverse proxy
app.set('trust proxy', 1);

// Rate limiting for registration endpoint
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 registrations per windowMs (increased for testing)
  message: {
    success: false,
    message: 'Troppe richieste di registrazione. Riprova tra qualche minuto.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Registration endpoint with rate limiting
app.post('/api/send-registration', registrationLimiter, async (req, res) => {
  try {
    const { name, company, email, phone, acceptTerms, terms } = req.body;
    
    // Handle both acceptTerms (boolean) and terms (checkbox "on") formats
    const termsAccepted = acceptTerms === true || acceptTerms === 'true' || terms === 'on' || terms === true;
    
    // Validate required fields
    if (!name || !email || !termsAccepted) {
      return res.status(400).json({ 
        success: false, 
        message: 'Campi obbligatori mancanti' 
      });
    }
    
    // Extract first name from full name for personalization
    const firstName = name.split(' ')[0];

    // Build email content for user confirmation using HTML template
    const userEmailHtml = getEmailTemplate('registration-confirmation', {
      firstName: firstName
    });

    // Fallback text email content
    const userEmailText = `
Ciao ${firstName},

Grazie per esserti registrato alla lista d'attesa di Stratikey!

Sei tra i primi che contatteremo per aggiornamenti, accessi anticipati e novità.
In qualità di early supporter, potrai accedere allo sconto pre-lancio riservato alla lista d'attesa.

Cosa aspettarti:
• Aggiornamenti esclusivi sul lancio
• Invito prioritario all'anteprima  
• Sconto pre-lancio riservato

Per info: info@stratikey.com
Sito web: https://www.stratikey.com/

Grazie per essere con noi!
Team Stratikey
    `.trim();

    // Build email content for admin notification using HTML template
    const adminEmailHtml = getEmailTemplate('admin-notification', {
      name: name,
      company: company || 'Non specificata',
      email: email,
      phone: phone || 'Non specificato',
      registrationDate: new Date().toLocaleString('it-IT')
    });

    // Fallback text content for admin
    const adminEmailText = `
NUOVA REGISTRAZIONE ALLA LISTA D'ATTESA

Dettagli del nuovo utente:
- Nome: ${name}
- Azienda: ${company || 'Non specificata'}  
- Email: ${email}
- Telefono: ${phone || 'Non specificato'}
- Data registrazione: ${new Date().toLocaleString('it-IT')}

L'utente ha ricevuto automaticamente l'email di conferma HTML.
    `.trim();

    // Prepare email attachments with white logo
    let attachments = [];
    try {
      // Check if white logo file exists before attaching
      if (fs.existsSync(logoWhitePath)) {
        attachments.push({
          filename: 'stratikey-logo-white.png',
          path: logoWhitePath,
          cid: 'stratikey-logo-white@inline'
        });
      } else {
        console.warn('White logo file not found, sending email without logo attachment');
      }
    } catch (error) {
      console.error('Error checking white logo file:', error);
    }

    // Send confirmation email to the user (HTML + text fallback)
    const userResult = await sendEmail({
      to: email,
      subject: 'Grazie per esserti registrato - Stratikey',
      text: userEmailText,
      html: userEmailHtml,
      attachments: attachments
    });

    console.log('User confirmation email sent successfully:', userResult);

    // Send notification email to admin with same design
    const adminResult = await sendEmail({
      to: 'info@stratikey.com',
      subject: `Nuova registrazione: ${name}`,
      text: adminEmailText,
      html: adminEmailHtml,
      attachments: attachments
    });

    console.log('Admin notification email sent successfully:', adminResult);
    
    res.json({
      success: true,
      message: 'Registrazione completata con successo!'
    });
    
  } catch (error) {
    console.error('Error sending registration email:', error);
    res.status(500).json({
      success: false,
      message: 'Errore durante la registrazione. Riprova più tardi.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Registration API server running on port ${port}`);
  console.log('Resend configured successfully');
});