const express = require("express");
const mongoose = require("mongoose");
// cookie-based session middleware
const cookie_session = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const router = express.Router();
const app = express();
app.use(express.json());

// instruct passport to make use of cookies
// maxAge - how long the cookie will last until expiration (3 hrs)
app.use(
  cookie_session({
    maxAge: 10800000,
    keys: [keys.cookie_key]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MODELS
require("./models/User");
require("./models/Survey");
// Needs to be called after require("./models/User");
require("./services/passport");

mongoose
  .connect(keys.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.log("Error on start: " + err.stack));

mongoose.set("debug", true);

// ROUTES
const auth = require("./routes/auth");
app.use("/auth", auth);
const stripe = require("./routes/stripe");
app.use("/stripe", stripe);
const surveys = require("./routes/surveys");
app.use("/surveys", surveys);

if (process.env.NODE_ENV === "production") {
  // Express serves production assets like main.js
  app.use(express.static("client/build"));
  // Express serves the index.html file if it does not recognize the specified route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
