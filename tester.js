const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'tiffinboxservice1@gmail.com',
    pass: 'monkxpfcvvuqwcrt',
  },
});
transporter.verify().then(console.log).catch(console.error);
