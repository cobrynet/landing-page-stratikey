import { Resend } from 'resend';
import { welcomeEmail } from '../emails/welcome.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method Not Allowed' 
    });
  }

  try {
    // Extract fields from request body
    const { to, name } = req.body;

    // Validate required fields
    if (!to) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Missing required field: to' 
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

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: 'Stratikey <info@stratikey.com>',
      to: to,
      subject: 'Grazie per esserti registrato!',
      html: welcomeEmail(name || 'utente')
    });

    if (error) {
      console.error('Resend email error:', error);
      return res.status(500).json({ 
        ok: false, 
        error: error.message || 'Failed to send email'
      });
    }

    console.log('Registration email sent successfully with Resend:', data.id);

    // Return success response matching expected format
    return res.status(200).json({ 
      ok: true,
      id: data.id
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    return res.status(500).json({ 
      ok: false, 
      error: error.message || 'Failed to send email'
    });
  }
}