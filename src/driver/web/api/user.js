const router = require('express').Router();

const multer = require("multer");

const path = require('path');

const UserRepo = require('../../../adapter/storage/repository/UserMongoRepo');
const CreateUser = require('../../../application/use_case/CreateUser');
const UpdateUser = require('../../../application/use_case/UpdateUser.js');
const GetAllUser = require('../../../application/use_case/GetAllVisite');

const email = require("../../../../my_module/email_nho");

const adminAuthController = require('../../../adapter/controller/adminAuthController');

const userRepo = new UserRepo();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage })

function emailForUser(user) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Demande d' inscription</title>
      <style>
    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
    
      table[class=body] p,
    table[class=body] ul,
    table[class=body] ol,
    table[class=body] td,
    table[class=body] span,
    table[class=body] a {
        font-size: 16px !important;
      }
    
      table[class=body] .wrapper,
    table[class=body] .article {
        padding: 10px !important;
      }
    
      table[class=body] .content {
        padding: 0 !important;
      }
    
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
    
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }
    
      table[class=body] .btn table {
        width: 100% !important;
      }
    
      table[class=body] .btn a {
        width: 100% !important;
      }
    
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
      }
    }
    @media all {
      .ExternalClass {
        width: 100%;
      }
    
      .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
      }
    
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }
    
      .btn-primary table td:hover {
        background-color: #d5075d !important;
      }
    
      .btn-primary a:hover {
        background-color: #d5075d !important;
        border-color: #d5075d !important;
      }
    }
    </style></head>
      <body class style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
          <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
              <div class="header" style="padding: 20px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                  <tr>
                    <td class="align-center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                      <a href="https://gobonus.ga" style="color: #ec0867; text-decoration: underline;"><img src="https://gobonus.ga/img/bonus.png" height="40" alt="BONUS" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Nous avons bien recu votre demande d'inscription. Vous serez recontacté, Cordialement</span>
                <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                        <tr>
                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Bonjour ${user.nom.toUpperCase()} ${user.prenom},</p>
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Nous vous remercions d'avoir rejoind la team BONUS pour répondre aux besoins des entreprises locales.</p>
                
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Nous avons bien reçu votre demande et notre équipe vous re-contactera pour avoir plus d'informations afin de vous créer un compte sur la plateforme d'intermediation. </p>
                
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Ainsi vous pourrez parcourir la marketplace et soumettre vos propositions aux différents appels d'offres.</p>
                            
                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Cordialement,</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
    
                <!-- START FOOTER -->
                <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                        <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">SING SA, BP 2280, Rue Pecqueur Centre Ville, Libreville Gabon</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                        Powered by <a href="https://postdrop.io" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">Postdrop</a>.
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- END FOOTER -->
    
              <!-- END CENTERED WHITE CONTAINER -->
              </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
    
    `;
}

function emailForDonneur(user) {
  return `
    <!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Demande d' inscription</title>
  <style>
@media only screen and (max-width: 620px) {
  table[class=body] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class=body] p,
table[class=body] ul,
table[class=body] ol,
table[class=body] td,
table[class=body] span,
table[class=body] a {
    font-size: 16px !important;
  }

  table[class=body] .wrapper,
table[class=body] .article {
    padding: 10px !important;
  }

  table[class=body] .content {
    padding: 0 !important;
  }

  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class=body] .btn table {
    width: 100% !important;
  }

  table[class=body] .btn a {
    width: 100% !important;
  }

  table[class=body] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  .btn-primary table td:hover {
    background-color: #d5075d !important;
  }

  .btn-primary a:hover {
    background-color: #d5075d !important;
    border-color: #d5075d !important;
  }
}
</style></head>
  <body class style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
              <tr>
                <td class="align-center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                  <a href="https://gobonus.ga" style="color: #ec0867; text-decoration: underline;"><img src="https://gobonus.ga/img/bonus.png" height="40" alt="BONUS" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Nous avons bien recu votre demande d'inscription. Vous serez recontacté, Cordialement</span>
            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Bonjour ${user.nom.toUpperCase()} ${user.prenom},</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Nous vous remercions d'avoir rejoind la team BONUS pour participer à la création d'emploi.</p>
            
            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Nous avons bien reçu votre demande et notre équipe vous re-contactera pour avoir plus d'informations afin de vous créer un compte sur la plateforme d'intermediation. </p>
            
            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Ainsi vous pourrez publier vos appels d'offres sur la marketplace de BONUS,</p>
                        
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Cordialement,</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">SING SA, BP 2280, Rue Pecqueur Centre Ville, Libreville Gabon</span>
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    Powered by <a href="https://postdrop.io" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">Postdrop</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>

    `;
}

function emailForBONUS(user) {
  return `
    <!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Alerte de nouvelle demande d'inscription a Gobonus</title>
  <style>
@media only screen and (max-width: 620px) {
  table[class='body'] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class='body'] p,
table[class='body'] ul,
table[class='body'] ol,
table[class='body'] td,
table[class='body'] span,
table[class='body'] a {
    font-size: 16px !important;
  }

  table[class='body'] .wrapper,
table[class='body'] .article {
    padding: 10px !important;
  }

  table[class='body'] .content {
    padding: 0 !important;
  }

  table[class='body'] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class='body'] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class='body'] .btn table {
    width: 100% !important;
  }

  table[class='body'] .btn a {
    width: 100% !important;
  }

  table[class='body'] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  .btn-primary table td:hover {
    background-color: #842363 !important;
  }

  .btn-primary a:hover {
    background-color: #842363 !important;
    border-color: #842363 !important;
  }
}
</style></head>
  <body class style="background-color: #161f33; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #161f33; width: 100%;" width="100%" bgcolor="#161f33">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
              <tr>
                <td class="align-center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                  <a href="https://gobonus.ga" style="color: #842363; text-decoration: underline;"><img src="https://gobonus.ga/img/bonus_b.png" height="70" alt="BONUS" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Notification de nouvelle connexion a Gobonus, Veuillez vous connecter a la plateforme d'administration.</span>
            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Bonjour,</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Le système BONUS vient de recevoir une nouvelle demande d'inscription.</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; min-width: 100%; width: 100%;" width="100%">
                          <tbody>
                            <tr>
                              <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #842363;" valign="top" align="center" bgcolor="#842363"> <a href="https://gobonus.ga/admin" target="_blank" style="border: solid 1px #842363; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #842363; border-color: #842363; color: #ffffff;">Ouvrir</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">${user.nom.toUpperCase()} ${user.prenom}, souhaite devenir ${user.type} </p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">A +.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>

            <!-- START FOOTER -->
            <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                <tr>
                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    <span class="apple-link" style="color: #9a9ea6; font-size: 12px; text-align: center;">SING SA, BP 2280, Rue Pecqueur Centre Ville, Libreville Gabon</span>
                  </td>
                </tr>
                <tr>
                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #9a9ea6; font-size: 12px; text-align: center;" valign="top" align="center">
                    Powered by <a href="https://postdrop.io" style="color: #9a9ea6; font-size: 12px; text-align: center; text-decoration: none;">Postdrop</a>.
                  </td>
                </tr>
              </table>
            </div>
            <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
          </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
    `;
}

router.get("/", adminAuthController.verifyAccessToken, async (req, res, next) => {
  const r = await GetAllUser(userRepo);
  if (r) {
    res.send(r);
  } else {
    res.sendStatus(500);
  }
});

router.post("/", upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'fiche_circuit', maxCount: 1 },
  { name: 'faillite', maxCount: 1 },
  { name: 'cnss', maxCount: 1 },
  { name: 'imposition', maxCount: 1 },
  { name: 'compte_certifie', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
]), async (req, res, next) => {
  const userData = req.body;
  if (req.files['cv']) {
    userData.cvURL = "/uploads/" + req.files['cv'][0].filename;
  }
  if (req.files['logo']) {
    userData.logoURL = "/uploads/" + req.files['logo'][0].filename;
  }
  if (req.files['fiche_circuit']) {
    userData.ficheCircuitURL = "/uploads/" + req.files['fiche_circuit'][0].filename;
  }
  if (req.files['faillite']) {
    userData.failliteURL = "/uploads/" + req.files['faillite'][0].filename;
  }
  if (req.files['cnss']) {
    userData.cnssURL = "/uploads/" + req.files['cnss'][0].filename;
  }
  if (req.files['imposition']) {
    userData.impositionURL = "/uploads/" + req.files['imposition'][0].filename;
  }
  if (req.files['compte_certifie']) {
    userData.compteCertifieURL = "/uploads/" + req.files['compte_certifie'][0].filename;
  }
  const r = await CreateUser(userData, userRepo);
  if (r) {
    if (req.body.type == "prestataire") {
      try {
        email.sendEmail(req.body.email, "Demande d'inscription à BONUS", emailForUser(req.body), "BONUS");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        email.sendEmail(req.body.email, "Demande d'inscription à BONUS", emailForDonneur(req.body), "BONUS");
      } catch (err) {
        console.log(err);
      }
    }

    try {
      email.sendEmail("contact@gobonus.ga", "BONUS Demande d'inscription", emailForBONUS(req.body), "BONUS");
    } catch (err) {
      console.log(err);
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

router.post("/update/:id", adminAuthController.verifyAccessToken, async (req, res, next) => {
  const r = await UpdateUser(req.params.id, req.body, userRepo);
  if (r) {
    res.send(r);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;