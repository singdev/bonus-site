class MailSender {


    constructor(){
    }

    init() {

    }

    async sendEmail(dstEmail, subject, content, libelle) {
      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'nho.notification@gmail.com',
              pass: 'ABClotus'
          }
      });
  
      var mailOptions = {
          from: libelle + '<nho.notification@gmail.com>',
          to: dstEmail,
          subject: subject,
          html: content
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
      });
    }
  }

  module.exports = new MailSender();