const { csrfSync } = require("csrf-sync");
const { generateToken, invalidCsrfTokenError, csrfSynchronisedProtection } =
  csrfSync({
    getConfig: (req) => req.session,
  });

function addCsrfToken(req, res, next) {
  res.locals.csrfToken = generateToken(req);
  next();
}
module.exports = {
  generateToken,
  invalidCsrfTokenError,
  addCsrfToken,
  csrfSynchronisedProtection,
};
