const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const admin = require('firebase-admin')
const config = functions.config();

try { admin.initializeApp(config.firebase) } catch (e) {
  console.log('DraftPickMe initializeApp failure')
}

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = config.gmail.email;
const gmailPassword = config.gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendContactEmail = functions.database.ref('/contacts/{uid}').onCreate((snapshot, context) => {
  let value = snapshot.val();
  sendContactEmail(value);
  return snapshot.ref.child('sent').set(true);
})

function sendContactEmail(contactData) {
  const mailOptions = {
    from: contactData.fromName + ` <no-reply@draftpickme.com>`,
    to: contactData.to,
  };

  mailOptions.subject = 'Someone want to contact you!';
  mailOptions.text = contactData.message;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('New contact email sent to:', contactData.to);
  });
}
