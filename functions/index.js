const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

import fire from '../src/config';

// 送信に使用するメールサーバーの設定
const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailEmail,
      pass: gmailPassword
    }
});

exports.sendMail = fire.firestore().collection('mails').onCreate((snap) => {
    // メール設定
    let adminMail = {
      from: gmailEmail,
      to: 'ponn3412@gmail.com',
      subject: "mail test",
      text: 'hi this is a test mail from firebase'
    };
  
    mailTransport.sendMail(adminMail, (err, info) => {
      if (err) {
        return console.error(`send failed. ${err}`);
      }
      return console.log("send success.");
    });
})
  
// exports.sendMail = functions.https.onCall((data, context) => {
//     // メール設定
//     let adminMail = {
//       from: gmailEmail,
//       to: 'ponn3412@gmail.com',
//       subject: "mail test",
//       text: 'hi this is a test mail from firebase'
//     };
  
//     mailTransport.sendMail(adminMail, (err, info) => {
//       if (err) {
//         return console.error(`send failed. ${err}`);
//       }
//       return console.log("send success.");
//     });
// });
  