var nodemailer = require('nodemailer');

var mail = nodemailer.createTransport({
  host: `${process.env.MAILER_HOST}`,
  secure: false,
  auth: {
    user: `${process.env.MAILER_ADDRESS}`,
    pass: `${process.env.MAILER_PASSWORD}`
  }
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';
    if (req.body.name) {
      body = `Name: ${req.body.name}`;
    }

    if (req.body.email) {
      body = body.concat(`\nEmail: ${req.body.email}`);
    }

    if (req.body.phone) {
      body = body.concat(`\nPhone: ${req.body.phone}`);
    }

    if (req.body.comment) {
      body = body.concat(`\nMessage: ${req.body.comment}`);
    }

    var mailOptions = {
      from: `${process.env.MAILER_ADDRESS}`,
      to: `${process.env.RECIPIENT_EMAIL_ADDRESS}`,
      subject: `${process.env.MAILER_SUBJECT}`,
      text: body,
    };

    let resp = await mail.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('error ======', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ status: 'Done sending mail!' });
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
}
