const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripe_secret_key);
const auth = require("../middlewares/auth");

router.post("/add-credits", auth, async (req, res) => {
  try {
    const { token } = req.body;
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "cad",
      description: "$5 for 5 Email Credits",
      source: token.id
    });

    req.user.credits += 5;

    const user = await req.user.save();
    
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
