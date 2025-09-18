export function adminNotificationEmail(userData) {
  const { name, company, email, phone, acceptTerms } = userData;
  const registrationDate = new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `<!DOCTYPE html>
<html lang="it" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Nuova registrazione - Stratikey</title>
    
    <!-- Google Fonts Import -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style type="text/css">
        /* Reset styles */
        * { box-sizing: border-box; }
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Base styles */
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f4f4f4;
            font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        
        /* Mobile responsive */
        @media screen and (max-width: 599px) {
            .mobile-padding { padding: 20px !important; }
            .mobile-font-large { font-size: 24px !important; line-height: 28px !important; }
            .mobile-font-medium { font-size: 18px !important; line-height: 22px !important; }
            .mobile-font-small { font-size: 16px !important; line-height: 20px !important; }
            .mobile-hidden { display: none !important; }
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    
    <!-- Main Container Table -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                
                <!-- Email Container -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #390035; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 32px rgba(43, 0, 41, 0.1);">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="center" style="padding: 32px 32px 16px 32px;" class="mobile-padding">
                            <!-- Stratikey Logo -->
                            <img src="https://www.stratikey.com/stratikey-alto.png" alt="Stratikey" width="240" style="display: block; max-width: 100%; height: auto; border: 0; outline: none; text-decoration: none;">
                        </td>
                    </tr>
                    
                    <!-- Hero Section with Gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2b0029 0%, #7a1c66 100%); padding: 40px 32px;" class="mobile-padding">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <h1 style="margin: 0; color: #ffffff; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 32px; font-weight: 700; line-height: 36px; text-align: center;" class="mobile-font-large">
                                            🎉 Nuova Registrazione!
                                        </h1>
                                        <p style="margin: 16px 0 0 0; color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 22px; text-align: center;" class="mobile-font-medium">
                                            Un nuovo utente si è unito alla lista d'attesa
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content Card -->
                    <tr>
                        <td style="padding: 40px 32px;" class="mobile-padding">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td>
                                        <h2 style="margin: 0 0 24px 0; color: #ffffff; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 600; line-height: 24px;">
                                            Dettagli del nuovo utente:
                                        </h2>
                                        
                                        <!-- User Details Table -->
                                        <table border="0" cellpadding="8" cellspacing="0" width="100%" style="background-color: rgba(255,255,255,0.05); border-radius: 12px; margin-bottom: 24px;">
                                            <tr>
                                                <td style="color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; padding: 12px;">
                                                    👤 Nome:
                                                </td>
                                                <td style="color: #ffffff; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; padding: 12px;">
                                                    <strong>${name}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; padding: 12px;">
                                                    🏢 Azienda:
                                                </td>
                                                <td style="color: #ffffff; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; padding: 12px;">
                                                    ${company || 'Non specificata'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; padding: 12px;">
                                                    📧 Email:
                                                </td>
                                                <td style="color: #ffffff; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; padding: 12px;">
                                                    <a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; padding: 12px;">
                                                    📞 Telefono:
                                                </td>
                                                <td style="color: #ffffff; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; padding: 12px;">
                                                    <a href="tel:${phone}" style="color: #ffffff; text-decoration: none;">${phone || 'Non specificato'}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; padding: 12px;">
                                                    📅 Data registrazione:
                                                </td>
                                                <td style="color: #ffffff; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; padding: 12px;">
                                                    ${registrationDate}
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="margin: 24px 0 0 0; color: rgba(255,255,255,0.82); font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px;" class="mobile-font-small">
                                            ✅ L'utente ha ricevuto automaticamente l'email di conferma HTML con il template Stratikey.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2b0029 0%, #7a1c66 100%); padding: 32px;" class="mobile-padding">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 16px 0; color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px; text-align: center;">
                                            Dashboard Admin Stratikey
                                        </p>
                                        <p style="margin: 0; color: #cd8fbe; font-family: 'Outfit', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px; text-align: center;">
                                            <a href="https://www.stratikey.com/" target="_blank" style="color: #ffffff; text-decoration: none; font-weight: 500;">www.stratikey.com</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>`;
}