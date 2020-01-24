const passport = require("passport");
const google_strategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
passport.serializeUser((user, done) => {
  /*
    user.id is the piece of information that authenticates users 
    in their follow up requests - this is the item ID assigned
    by mongoDB - this is done to support multiple 3rd party authentication
    providers - e.g. they may login with facebook instead of google and therefore would not have a google ID to lookup
  */
  done(null, user.id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const user = await User.findById(user_id);
    done(null, user);
  } catch (error) {
    console.log(error.message);
  }
});

passport.use(
  new google_strategy(
    {
      clientID: keys.google_client_id,
      clientSecret: keys.google_client_secret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (access_token, refresh_token, profile, done) => {
      try {
        const preexisting_user = await User.findOne({ google_id: profile.id });
        if (preexisting_user) {
          // preexisting_user is passed as an arg. to passport.serializeUser
          done(null, preexisting_user);
        }
        const new_user = await new User({ google_id: profile.id }).save();
        // new user is passed as an arg. to passport.serializeUser
        done(null, new_user);
      } catch (error) {
        console.log(error.message);
      }
    }
  )
);
