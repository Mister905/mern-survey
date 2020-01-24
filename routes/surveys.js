const express = require("express");
const router = express.Router();
// IMPORT MIDDLEWAREs
const auth = require("../middlewares/auth");
const require_credits = require("../middlewares/require_credits");
// Model is imported this way to prevent issues during testing
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const survey_template = require("../services/email_templates/survey_template");
const { Path } = require("path-parser");
const { URL } = require("url");

router.post("/create", [auth, require_credits], async (req, res) => {
  try {
    const { survey_title, subject_line, email_body, recipient_list } = req.body;

    const survey = new Survey({
      title: survey_title,
      subject: subject_line,
      body: email_body,
      recipients: recipient_list
        .split(",")
        .map(recipient => ({ email: recipient.trim() })),

      _user: req.user.id,
      date_sent: Date.now()
    });

    const mailer = new Mailer(survey, survey_template(survey));
    await mailer.send();

    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
});

// npx ngrok http 5000
// https://4e43c32c.ngrok.io/surveys/webhooks
router.post("/webhooks", (req, res) => {
  try {
    const events = req.body.map(event => {
      const path_name = new URL(event.url).pathname;
      const p = new Path("/surveys/response/:survey_id/:choice");
      const match = p.test(path_name);
      // p.text(pathname) returns null if the specified path pattern is not matched
      if (match) {
        return {
          email: event.email,
          survey_id: match.survey_id,
          choice: match.choice
        };
      }
    });
    // https://stackoverflow.com/a/58437069
    // get events unique by survey id and email
    const unique_events = events.filter(
      (v, i, a) =>
        a.findIndex(t => t.survey_id === v.survey_id && t.email === v.email) ===
        i
    );

    unique_events.forEach(event => {
      Survey.updateOne(
        {
          _id: event.survey_id,
          recipients: {
            $elemMatch: { email: event.email, responded: false }
          }
        },
        {
          // Key Interpolation to increment dynamic choice value
          $inc: { [event.choice]: 1 },
          // The dollar sign refers to the object returned by $elemMatch
          $set: { "recipients.$.responded": true },
          last_response: new Date()
        }
      ).exec();
      // Notifies sendgrid the responsed was received
      res.send({});
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/response/:survey_id/:choice", (req, res) => {
  res.redirect("/thanks");
});

/* Omit the recipients field - this could be a lot of data and 
we don't need it on the dashboard */
router.get("/", auth, async (req, res) => {
  try {
    const surveys = await Survey.find({ _user: req.user.id })
    .select({
      recipients: false
    })
    .sort({ date_sent: -1 });
    res.send(surveys);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
