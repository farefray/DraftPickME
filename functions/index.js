const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const admin = require('firebase-admin')

try { admin.initializeApp(functions.config().firebase) } catch (e) {
  console.log('DraftPickMe initializeApp failure')
}

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendContactEmail = functions.database.ref('/contacts/{uid}').onCreate((event) => {
  const snapshot = event.data
  const user = snapshot.val()
  // Use nodemailer to send email
  return sendContactEmail(user);
})


function sendContactEmail(body) {
  let email = 'maksym.fedan@gmail.com';
  const mailOptions = {
    from: `Contact Form <noreply@draftpickme.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Someone contacted you!`;
  mailOptions.text = `Hey! I hope you will enjoy our service.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('New welcome email sent to:', email);
  });
}
