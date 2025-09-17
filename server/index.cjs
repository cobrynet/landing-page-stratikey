const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { sendEmail } = require('./email-service.cjs');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins in development
app.use(cors());
app.use(express.json());

// Rate limiting for registration endpoint
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 registrations per windowMs
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
    const { name, company, email, phone, acceptTerms } = req.body;
    
    // Validate required fields
    if (!name || !email || !acceptTerms) {
      return res.status(400).json({ 
        success: false, 
        message: 'Campi obbligatori mancanti' 
      });
    }
    
    // Build email content
    const emailContent = `
Nuova registrazione ricevuta dal sito Stratikey:

Nome e Cognome: ${name}
Azienda: ${company || 'Non specificata'}
Email: ${email}
Telefono: ${phone || 'Non specificato'}
Termini accettati: ${acceptTerms ? 'Sì' : 'No'}

Data registrazione: ${new Date().toLocaleDateString('it-IT')} alle ${new Date().toLocaleTimeString('it-IT')}
    `.trim();

    // Send email using Replit Mail integration
    const result = await sendEmail({
      to: 'info@stratikey.com',
      subject: `Nuova registrazione - ${name}`,
      text: emailContent
    });

    console.log('Email sent successfully:', result);
    
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
});