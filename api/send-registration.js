import { Resend } from 'resend';
import { welcomeEmail } from '../emails/welcome.js';
import { adminNotificationEmail } from '../emails/admin-notification.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Metodo non consentito' 
    });
  }

  try {
    // Extract fields from request body (compatible with frontend)
    const { email, name, company, phone, acceptTerms } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Campo email obbligatorio mancante' 
      });
    }

    // Validate RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ 
        success: false, 
        message: 'Servizio email non configurato correttamente' 
      });
    }

    // Send welcome email to user
    const { data: userData, error: userError } = await resend.emails.send({
      from: 'Stratikey <info@stratikey.com>',
      to: email,
      subject: 'Grazie per esserti registrato!',
      html: welcomeEmail(name || 'utente')
    });

    if (userError) {
      console.error('User email error:', userError);
      return res.status(500).json({ 
        success: false,
        message: userError.message || 'Errore durante l\'invio dell\'email di conferma'
      });
    }

    console.log('User welcome email sent successfully:', userData.id);

    // Send notification email to admin
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'Stratikey <info@stratikey.com>',
      to: 'info@stratikey.com',
      subject: `Nuova registrazione: ${name}`,
      html: adminNotificationEmail({ name, company, email, phone, acceptTerms }),
      text: `NUOVA REGISTRAZIONE ALLA LISTA D'ATTESA

Dettagli del nuovo utente:
- Nome: ${name}
- Azienda: ${company || 'Non specificata'}
- Email: ${email}
- Telefono: ${phone || 'Non specificato'}
- Data registrazione: ${new Date().toLocaleString('it-IT')}

L'utente ha ricevuto automaticamente l'email di conferma HTML.`
    });

    if (adminError) {
      console.error('Admin notification email error:', adminError);
      // Log error but don't fail the entire request since user email was sent
      console.warn('User registration succeeded but admin notification failed');
    } else {
      console.log('Admin notification email sent successfully:', adminData.id);
    }

    // Return success response matching frontend expectations
    return res.status(200).json({ 
      success: true,
      message: 'Registrazione completata con successo!',
      userEmailId: userData.id,
      adminEmailId: adminData?.id || null
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Errore durante la registrazione'
    });
  }
}