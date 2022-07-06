const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

const sendWelcomeEmail = (email, name) => {
  const data = {
    from: "vatsaldendpara007@gmail.com",
    to: email,
    subject: "Welcome!",
    text: `Welcome to the app, ${name}`,
  };
  try {
    mg.messages().send(data, function (error, body) {});
  } catch (e) {
    console.log(e);
  }
};

const sendCancelEmail = (email, name) => {
  const data = {
    from: "Admin <vatsaldendpara007@gmail.com>",
    to: email,
    subject: "Unsubscribe from Newsletter",
    text: `Dear ${name}, you have been unsubscribed from newsletter`,
  };
  try {
    mg.messages().send(data, function (error, body) {});
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
