const sg_mail = require("@sendgrid/mail");
const keys = require("../config/keys");

class Mailer {
  constructor({ subject, recipients }, template_content) {
    sg_mail.setApiKey(keys.sendgrid_key);
    this.msg = {
      to: recipients.map(({ email }) => email),
      from: "no-reply@mern-survey.ca",
      subject: subject,
      html: template_content,
      trackingSetting: { enable_text: true, enabled: true }
    };
  }

  async send() {
    const response = await sg_mail.send(this.msg);
    return response;
  }
}

module.exports = Mailer;
