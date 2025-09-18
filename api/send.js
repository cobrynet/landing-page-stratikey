import { Resend } from 'resend';
import { welcomeEmail } from '../emails/welcome.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  try {
    // Extract required fields from request body
    const { to, name } = req.body;

    // Validate required fields
    if (!to || !name) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Missing required fields: to and name are required.' 
      });
    }

    // Validate RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({ 
        ok: false, 
        error: 'Email service not configured properly' 
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Stratikey <onboarding@resend.dev>',
      to: to,
      subject: 'Grazie per esserti registrato!',
      html: welcomeEmail(name),
      text: `Grazie per esserti registrato!\n\nCiao ${name}, grazie per l'interesse verso Stratikey.\nSei tra i primi che contatteremo per aggiornamenti, accessi anticipati e novità.\n\nIn qualità di early supporter, potrai accedere allo sconto pre-lancio riservato alla lista d'attesa.\n\nPer info: info@stratikey.com\nwww.stratikey.com`
    });

    if (error) {
      console.error('Resend email error:', error);
      return res.status(500).json({ 
        ok: false, 
        error: error.message || 'Failed to send email'
      });
    }

    console.log('Email sent successfully with Resend:', data.id);

    // Return success response
    return res.status(200).json({ 
      ok: true,
      id: data.id
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Return error response
    return res.status(500).json({ 
      ok: false, 
      error: error.message || 'Failed to send email'
    });
  }
}