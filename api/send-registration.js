import { Resend } from 'resend';
import { welcomeEmail } from '../emails/welcome.js';

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

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: 'Stratikey <info@stratikey.com>',
      to: email,
      subject: 'Grazie per esserti registrato!',
      html: welcomeEmail(name || 'utente')
    });

    if (error) {
      console.error('Resend email error:', error);
      return res.status(500).json({ 
        success: false,
        message: error.message || 'Errore durante l\'invio dell\'email'
      });
    }

    console.log('Registration email sent successfully with Resend:', data.id);

    // Return success response matching frontend expectations
    return res.status(200).json({ 
      success: true,
      message: 'Registrazione completata con successo!',
      id: data.id
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Errore durante la registrazione'
    });
  }
}