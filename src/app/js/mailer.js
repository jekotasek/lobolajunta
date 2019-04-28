var nodemailer = require('nodemailer');

mailer = {};

mailer.mailOptions = {
    from: 'lajunta2019@gmail.com',
    to: 'lajunta2019@gmail.com',
    subject: 'Test',
    html: '<h2>TEST</h2><br><h4>TEST/h4>'
};


mailer.connect = function(){
    this.transporter = nodemailer.createTransport({
        pool: true,
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lajunta2019@gmail.com',
            pass: 'temporal2019'
        }
    });
}

mailer.sendMail = function(){
    this.transporter.sendMail(this.mailOptions, 
        (error, info) => {
            if (error)
                console.log(error);
            console.log("ALERT SENT");
        }
    );
}

module.exports = mailer;
