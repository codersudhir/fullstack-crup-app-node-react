const nodemailer = require('nodemailer');

let transporter;

const wrapedSendMail = async (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, result) => {
            if (error) {
                console.log(`Error is ${error}`);
                reject({ success: false, error });
            } else {
                resolve({ success: true, result });
            }
        });
    });
}

const Initialize = async () => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'teambharatconnect@gmail.com',
            pass: "xsramlnozrwhtrlc"
        },
    });
    await transporter.verify();
}

const sendEmail = async (recipient, subject, body) => {
    try {
        await Initialize();

        const mailOptions = {
            from: 'no-reply@bharatconnect.com',
            to: recipient,
            subject,
            text: body,
        };

        const { success, error } = await wrapedSendMail(mailOptions);

        if (!success) {
            throw error;
        }
        return { success: true, message: 'Email sent' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Could not send email. Error: ' + error };
    }
}

module.exports = { sendEmail };
