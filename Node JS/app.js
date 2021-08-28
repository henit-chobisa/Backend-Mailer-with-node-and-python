const mailer = require('nodemailer');
const express = require('express');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2
var smtpTransport = require('nodemailer-smtp-transport');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

const oauth2Client = new OAuth2(
    "Client ID",
    "Client Secret",
    "https://developers.google.com/oauth2playground"
);

oauth2Client.setCredentials({
    refresh_token : "REFERESH TOKEN"
});

const accessToken = oauth2Client.getAccessToken();

app.post('/api/sendEmail', async function(req, res){
    const mails = req.body;
    for (const i in mails) {
        const mail = mails[i]['email'];
        await sendEmail(mail);
    }
    
    res.send('got it');
})

async function sendEmail(user){
    let transporter = mailer.createTransport({
        service : "gmail",
        auth: {
            type : "OAuth2",
            user : "USER",
            clientId : "CLIENT_ID",
            clientSecret : "CLIENT_SECRET",
            refreshToken : "REFRESH_TOKEN",
            accessToken : accessToken,
        },
    });
    try {
        let info = await transporter.sendMail({
            from : 'FROM',
            to : String(user),
            subject: 'SUBJECT',
            text: 'TEXT MESSAGE',
            html: `HTML`
        });
        console.log("Message Sent : %s", info.messageId);
        console.log('Preview URL: %s', mailer.getTestMessageUrl(info));

    } catch (err) {
        console.log(err)
    }
};

app.listen(PORT, () => {
    console.log('listening on port 4000');
});

