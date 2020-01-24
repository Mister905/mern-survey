const express = require("express");
const router = express.Router();
const passport = require("passport");

// The google strategy has an internal identifier of 'google'
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/dashboard");
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  // Passport provides this function to the req object
  req.logout();
  res.redirect("/");
});

module.exports = router;
