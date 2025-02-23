const nodemailer = require('nodemailer');
const pug = require('pug')
const htmlToText = require('html-to-text');


class Email {

    constructor(user, url) {
        this.from = `Nebil Ahmed <${process.env.EMAIL_FROM}>`;
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
    }

    createTransportEmail() {
        if (process.env.NODE_ENV === "production") {
            // SendGrid or another service : 
            const transporterProduction = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.USERNAME_SENDGRID,
                    pass: process.env.PASSWORD_SENDGRID
                }
            });

            return transporterProduction;
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        return transporter;
    }

    // Send the actual Email : 
    async send(template, subject) {

        // 1) rendre HTML based on a pug template :
        const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject: subject
        });

        // 2) define mailOptions 
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: html,
            text: htmlToText.convert(html)
        };

        // 3) create Transport 
        const transporter = this.createTransportEmail();

        // 4) send Email : 
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

    };


    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natrous Family!');
    };


    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (Valid only for 10 min)');
    }

}


module.exports = Email;
