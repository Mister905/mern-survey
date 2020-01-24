module.exports = (req, res, next) => {
    // terminate process if no logged in user is found
    if (req.user.credits < 1) {
      return res
        .status(403)
        .send({ error: "Insufficient Funds" });
    }
    next();
  };
  