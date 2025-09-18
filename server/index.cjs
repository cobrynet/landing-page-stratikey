const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
// Use ReplitMail for email sending - inline implementation
function getAuthToken() {
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error(
      "No authentication token found. Please set REPL_IDENTITY or ensure you're running in Replit environment."
    );
  }

  return xReplitToken;
}

async function sendReplitEmail(message) {
  const authToken = getAuthToken();

  const response = await fetch(
    "https://connectors.replit.com/api/v2/mailer/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X_REPLIT_TOKEN": authToken,
      },
      body: JSON.stringify({
        to: message.to,
        cc: message.cc,
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: message.attachments,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email");
  }

  return await response.json();
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

// Path to Stratikey logo (in production-safe location)
const logoPath = path.resolve(__dirname, 'assets', 'stratikey-logo.png');

async function sendEmail(options) {
  const msg = {
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  try {
    const result = await sendReplitEmail(msg);
    return {
      accepted: result.accepted || [options.to],
      rejected: result.rejected || [],
      messageId: result.messageId,
      response: 'Email sent successfully with ReplitMail'
    };
  } catch (error) {
    console.error('ReplitMail sending error:', error);
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

    // Build email content for admin notification
    const adminEmailContent = `
NUOVA REGISTRAZIONE ALLA LISTA D'ATTESA

Dettagli del nuovo utente:
- Nome: ${name}
- Azienda: ${company || 'Non specificata'}  
- Email: ${email}
- Telefono: ${phone || 'Non specificato'}
- Data registrazione: ${new Date().toLocaleString('it-IT')}

L'utente ha ricevuto automaticamente l'email di conferma HTML.
    `.trim();

    // Prepare email attachments
    let attachments = [];
    try {
      // Check if logo file exists before attaching
      if (fs.existsSync(logoPath)) {
        attachments.push({
          filename: 'stratikey-logo.png',
          path: logoPath,
          cid: 'stratikey-logo@inline'
        });
      } else {
        console.warn('Logo file not found, sending email without logo attachment');
      }
    } catch (error) {
      console.error('Error checking logo file:', error);
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

    // Send notification email to admin
    const adminResult = await sendEmail({
      to: 'stratikey@gmail.com',
      subject: `Nuova registrazione: ${name}`,
      text: adminEmailContent
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

// ReplitMail uses Replit's internal authentication - no API keys needed

app.listen(port, '0.0.0.0', () => {
  console.log(`Registration API server running on port ${port}`);
  console.log('ReplitMail configured successfully');
});