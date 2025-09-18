export function welcomeEmail(name) {
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Grazie per esserti registrato!</title>
  <style>
    @media (prefers-color-scheme: dark) { .bg { background:#0b0b0c !important; } }
    @media screen and (max-width:600px){ .container{width:100%!important} .px{padding-left:20px!important;padding-right:20px!important} .logo img{max-width:120px!important}}
    a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
  </style>
</head>
<body class="bg" style="margin:0;padding:24px;background:#F2F4F7;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr><td align="center">
      <table role="presentation" class="container" width="640" cellspacing="0" cellpadding="0" border="0"
             style="width:640px;max-width:640px;border-radius:28px;overflow:hidden;
             background:linear-gradient(180deg,#2B0932 0%, #5C1E66 45%, #762A7E 46%, #762A7E 100%);
             box-shadow:0 10px 30px rgba(0,0,0,.18); color:#fff;">
        <tr><td style="height:24px;line-height:24px">&nbsp;</td></tr>

        <!-- LOGO -->
        <tr>
          <td align="center" class="px" style="padding:0 32px">
            <a href="https://www.stratikey.com" target="_blank" class="logo" style="display:inline-block">
              <img src="https://www.stratikey.com/stratikey-alto.png" width="160" alt="Stratikey" style="display:block;border:0;outline:0">
            </a>
          </td>
        </tr>

        <tr><td style="height:28px;line-height:28px">&nbsp;</td></tr>
        <tr><td style="height:1px;background:linear-gradient(180deg,rgba(255,255,255,.0),rgba(255,255,255,.12))"></td></tr>

        <!-- TITOLI -->
        <tr>
          <td align="center" class="px" style="padding:28px 32px 8px 32px">
            <h1 style="margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-weight:800;font-size:28px;line-height:1.25;color:#fff">
              Grazie per esserti registrato!
            </h1>
            <p style="margin:8px 0 0 0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;line-height:1.6;color:#EADAF0">
              Sei ufficialmente nella nostra sala d'attesa.
            </p>
          </td>
        </tr>

        <!-- TESTO -->
        <tr>
          <td class="px" style="padding:20px 32px 24px 32px">
            <div style="background:rgba(0,0,0,.18);border-radius:12px;padding:20px">
              <p style="margin:0 0 12px 0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;line-height:1.8;color:#F5ECF8">
                Ciao <strong>${name}</strong>, grazie per l'interesse verso <strong>Stratikey</strong>.
                Sei tra i primi che contatteremo per aggiornamenti, accessi anticipati e novità.
              </p>
              <p style="margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;line-height:1.8;color:#F5ECF8">
                In qualità di <strong>early supporter</strong>, potrai accedere allo
                <strong>sconto pre-lancio</strong> riservato alla lista d'attesa.
              </p>
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" class="px" style="padding:8px 32px 26px 32px">
            <p style="margin:12px 0 4px 0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:13px;line-height:1.7;color:#D8CBE0">
              Per info: <a href="mailto:info@stratikey.com" style="color:#fff;text-decoration:underline">info@stratikey.com</a>
            </p>
            <p style="margin:0 0 8px 0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-weight:700;font-size:13px">
              <a href="https://www.stratikey.com" style="color:#fff;text-decoration:none">www.stratikey.com</a>
            </p>
            <p style="margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:11px;line-height:1.6;color:#BFAFD0">
              Ricevi questa email perché ti sei registrato alla sala d'attesa di Stratikey.
              &nbsp;<a href="{{unsubscribe_url}}" style="color:#EADAF0;text-decoration:underline">Disiscriviti</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}