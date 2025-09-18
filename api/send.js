const nodemailer = require('nodemailer');

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
    const { to, subject, text, html } = req.body;

    // Validate required fields
    if (!to || !subject) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Missing required fields: to and subject are required.' 
      });
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Prepare email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: to,
      subject: subject,
      text: text || '', // Fallback to empty string if not provided
      html: html || undefined // Only include HTML if provided
    };

    // Send email using await (critical for Vercel serverless functions)
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    // Return success response
    return res.status(200).json({ 
      ok: true,
      messageId: info.messageId
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