const path = require("path");

const express = require("express");
const {
  csrfSynchronisedProtection,
  addCsrfToken,
} = require("./middleware/csrf");
const session = require("express-session");

const { createSessionConfig } = require("./data/session.config");
const db = require("./data/database");
const { handleErrors } = require("./middleware/error-handling");

const app = express();
const authRoute = require("./routes/auth.routes");
const baseRoute = require("./routes/base.routes");
const {checkAuthStatus} = require("./middleware/check-auth");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));

app.use(addCsrfToken);
app.use(checkAuthStatus);

app.use(baseRoute);
app.use(authRoute);
app.use(handleErrors);

db.connectToDatabase()
  .then(function () {
    app.listen(3000, () => {
      console.log("Server Started");
    });
  })
  .catch(function (error) {
    console.log("Failed to connect to database!");
    console.log(error);
  });
