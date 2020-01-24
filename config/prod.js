// prod.js - unlike dev.js we commit this to git!!!
module.exports = {
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  mongo_uri: process.env.MONGO_URI,
  cookie_key: process.env.COOKIE_KEY,
  stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  sendgrid_key: process.env.SENDGRID_KEY,
  email_redirect_domain: process.env.EMAIL_REDIRECT_DOMAIN
};
