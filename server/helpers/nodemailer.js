const nodemailer = require("nodemailer");

function sendMail(item, email) {
  let transporter = nodemailer.createTransport({
    service: process.env.SECRET_SERVICE,
    auth: {
      user: process.env.SECRET_EMAIL,
      pass: process.env.SECRET_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.SECRET_EMAIL,
    to: email,
    subject: "TIKIPIDII - Transaction success",
    text: `Your transaction for ${item} has been accepted. Please wait for your item at your home and stay healthy`,
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    console.log("Email sent: " + info.response);
  });
}

module.exports = sendMail;
