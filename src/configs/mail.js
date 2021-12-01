const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "be3d6bd48d3a0d",
      pass: "0974c97dc46e0f"
    },
  });

