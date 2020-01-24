module.exports = (req, res, next) => {
  // terminate process if no logged in user is found
  if (!req.user) {
    return res
      .status(401)
      .send({ error: "Valid Authentication Credentials Required" });
  }
  next();
};
