// API endpoint per registrazione utenti con SendGrid
// Referenced from blueprint:javascript_sendgrid integration

const sgMail = require('@sendgrid/mail');

export default async function handler(req, res) {
  // Solo metodo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Verifica che la chiave API di SendGrid sia presente
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not found');
      return res.status(500).json({ success: false, message: 'Configurazione email non valida' });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Estrai i dati dal form
    const { name, email, company, phone, terms } = req.body;

    // Validazione base
    if (!name || !email || !company) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome, email e azienda sono obbligatori' 
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email non valida' 
      });
    }

    if (!terms) {
      return res.status(400).json({ 
        success: false, 
        message: 'Devi accettare i termini e condizioni' 
      });
    }

    // Prepara il contenuto HTML dell'email per l'utente
    const userEmailHtml = `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrazione Stratikey</title>
    <style>
        body { font-family: 'Outfit', Arial, sans-serif; line-height: 1.6; color: #390035; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #390035 0%, #901d6b 100%); color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
        .content { background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd; }
        .logo { height: 60px; width: auto; }
        .button { background: linear-gradient(90deg, #901d6b 0%, #cd8fbe 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Benvenuto in Stratikey!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Grazie per esserti registrato alla nostra lista di attesa</p>
        </div>
        <div class="content">
            <p>Ciao <strong>${name}</strong>,</p>
            
            <p>Grazie per esserti registrato alla lista di attesa di <strong>Stratikey</strong>! 🎉</p>
            
            <p>La tua registrazione è stata confermata con successo. Ecco un riepilogo dei tuoi dati:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Azienda:</strong> ${company}</p>
                ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
            </div>
            
            <p>Ti contatteremo presto per fornirti l'accesso anticipato alla piattaforma che rivoluzionerà il modo in cui la tua azienda gestisce marketing e vendite.</p>
            
            <p><strong>Cosa succede ora?</strong></p>
            <ul>
                <li>Il nostro team esaminerà la tua richiesta</li>
                <li>Ti invieremo un invito personale quando la piattaforma sarà pronta</li>
                <li>Avrai accesso anticipato a tutte le funzionalità premium</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://stratikey.com" class="button">Visita il nostro sito</a>
            </div>
            
            <p>Se hai domande, non esitare a contattarci all'indirizzo <a href="mailto:info@stratikey.com" style="color: #901d6b;">info@stratikey.com</a></p>
            
            <p>A presto!<br><strong>Il team Stratikey</strong></p>
        </div>
        <div class="footer">
            <p>Stratikey - Il digitale che potenzia il tuo commerciale</p>
            <p>Hai ricevuto questa email perché ti sei registrato su stratikey.com</p>
        </div>
    </div>
</body>
</html>`;

    // Email di notifica per il team (opzionale)
    const adminEmailHtml = `
<h2>Nuova registrazione Stratikey</h2>
<p><strong>Nome:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Azienda:</strong> ${company}</p>
${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
<p><strong>Data registrazione:</strong> ${new Date().toLocaleString('it-IT')}</p>
`;

    // Email di conferma per l'utente
    const userMsg = {
      to: email,
      from: 'info@stratikey.com', // Deve essere un indirizzo verificato in SendGrid
      subject: '🎉 Benvenuto in Stratikey - Registrazione Confermata!',
      text: `Ciao ${name}, grazie per esserti registrato alla lista di attesa di Stratikey! Ti contatteremo presto per fornirti l'accesso anticipato alla piattaforma.`,
      html: userEmailHtml,
    };

    // Email di notifica per il team
    const adminMsg = {
      to: 'info@stratikey.com',
      from: 'info@stratikey.com',
      subject: `📝 Nuova registrazione: ${name} - ${company}`,
      html: adminEmailHtml,
    };

    // Invia entrambe le email
    await Promise.all([
      sgMail.send(userMsg),
      sgMail.send(adminMsg)
    ]);

    console.log('Registration emails sent successfully', { name, email, company });

    return res.status(200).json({ 
      success: true, 
      message: 'Registrazione completata! Controlla la tua email per la conferma.' 
    });

  } catch (error) {
    console.error('SendGrid registration error:', error);
    
    // Se è un errore di SendGrid, fornisci dettagli più specifici
    if (error.response) {
      console.error('SendGrid API response:', error.response.body);
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Errore durante l\'invio dell\'email. Riprova più tardi.' 
    });
  }
}