import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// Load and process HTML email template
const getEmailTemplate = (templateName, variables = {}) => {
  try {
    const templatePath = path.resolve(process.cwd(), 'server', 'email-templates', `${templateName}.html`);
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
    // Replace variables in template
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

export default async function handler(req, res) {
  // Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  try {
    const { name, company, email, phone, terms } = req.body;
    
    // Handle terms acceptance (accept "on", true, or "true")
    const termsAccepted = terms === 'on' || terms === true || terms === 'true';
    
    // Validate required fields
    if (!name || !email || !termsAccepted) {
      return res.status(400).json({ 
        success: false, 
        message: 'Campi obbligatori mancanti' 
      });
    }
    
    // Validate RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ 
        success: false, 
        message: 'Email service not configured properly' 
      });
    }
    
    // Extract first name from full name for personalization
    const firstName = name.split(' ')[0];

    // Build email content for user confirmation using HTML template
    const userEmailHtml = getEmailTemplate('registration-confirmation', {
      firstName: firstName
    });

    // Build email content for admin notification using HTML template
    const adminEmailHtml = getEmailTemplate('admin-notification', {
      name: name,
      company: company || 'Non specificata',
      email: email,
      phone: phone || 'Non specificato',
      registrationDate: new Date().toLocaleString('it-IT')
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

    // Prepare white logo attachment for both emails
    let logoAttachment = null;
    try {
      const logoWhitePath = path.resolve(process.cwd(), 'server', 'assets', 'stratikey-logo-white.png');
      if (fs.existsSync(logoWhitePath)) {
        const fileContent = fs.readFileSync(logoWhitePath);
        logoAttachment = {
          filename: 'stratikey-logo-white.png',
          content: fileContent.toString('base64'),
          contentType: 'image/png',
          contentId: 'stratikey-logo-white@inline',
          disposition: 'inline'
        };
      }
    } catch (error) {
      console.error('Error loading white logo for attachments:', error);
    }

    // Send confirmation email to the user
    const userEmailData = {
      from: 'Stratikey <info@stratikey.com>',
      to: [email],
      subject: 'Grazie per esserti registrato - Stratikey',
      text: userEmailText,
      html: userEmailHtml || userEmailText, // Fallback to text if HTML fails
    };

    // Add logo attachment if available
    if (logoAttachment) {
      userEmailData.attachments = [logoAttachment];
    }

    const { data: userData, error: userError } = await resend.emails.send(userEmailData);

    if (userError) {
      console.error('Resend user email error:', userError);
      return res.status(500).json({ 
        success: false, 
        message: userError.message || 'Failed to send confirmation email'
      });
    }

    console.log('User confirmation email sent successfully:', userData.id);

    // Send notification email to admin with same design
    const adminEmailData = {
      from: 'Stratikey <info@stratikey.com>',
      to: ['info@stratikey.com'],
      subject: `Nuova registrazione: ${name}`,
      text: adminEmailText,
      html: adminEmailHtml || adminEmailText, // Fallback to text if HTML fails
    };

    // Add logo attachment if available
    if (logoAttachment) {
      adminEmailData.attachments = [logoAttachment];
    }

    const { data: adminData, error: adminError } = await resend.emails.send(adminEmailData);

    if (adminError) {
      console.error('Resend admin email error:', adminError);
      // Don't fail the request if admin email fails, user email was sent
    } else {
      console.log('Admin notification email sent successfully:', adminData.id);
    }

    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Registrazione completata con successo!',
      userEmailId: userData.id,
      adminEmailId: adminData?.id
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Return error response
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Errore interno del server'
    });
  }
}