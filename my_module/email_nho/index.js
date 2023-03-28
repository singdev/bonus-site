class MailSender {


    constructor() {
    }

    init() {

    }

    async sendEmail(dstEmail, subject, content, libelle) {
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            secure: true,
            auth: {
                user: 'no-reply@pivot40.tech',
                pass: 'ABClotus2022'
            }
        });

        var mailOptions = {
            from: libelle + '<no-reply@pivot40.tech>',
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