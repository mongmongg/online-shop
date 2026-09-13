const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const { accountIsValid, confirmEmailIsSame } = require("../util/validation");
const sessionFlash = require("../util/session-flash");
function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      street: "",
      postal: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { userData: sessionData });
}
function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",      
      password: "",     
    };
  }

  res.render("customer/auth/login",{ userData: sessionData });
}
async function signup(req, res, next) {
  const userData = req.body;
  const enteredData = {
    email: userData.email,
    confirmEmail: userData["confirm-email"],
    password: userData.password,
    fullname: userData.fullname,
    street: userData.street,
    postal: userData.postal,
    city: userData.city,
  };
  const user = new User(
    userData.email,
    userData.password,
    userData.fullname,
    userData.street,
    userData.postal,
    userData.city
  );

  try {
    const existAlready = await user.existAlready();
    if (existAlready) {
      sessionFlash.flashDataSession(
        req,
        {
          errorMessage: "User exist already! Try loging in instead",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.createAccount();
  } catch (error) {
    next(error);
  }
  if (
    !accountIsValid(
      userData.email,
      userData.password,
      userData.fullname,
      userData.street,
      userData.postal,
      userData.city
    ) ||
    !confirmEmailIsSame(userData.email, userData["confirm-email"])
  ) {
    sessionFlash.flashDataSession(
      req,
      {
        errorMessage: "Please check your input",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }
  res.redirect("/login");
}
async function signIn(req, res, next) {
  const userData = req.body;
  const newUser = new User(userData.email, userData.password);
  let existingUser;
  try {
    existingUser = await newUser.getUserWithSameEmail();
  } catch (error) {
    next(error);
  }
  const sessionData = {
    errorMessage: "Invalid credentials - please check your email and password",
    email: userData.email,
    password: userData.password,
  };

  if (!existingUser) {
    sessionFlash.flashDataSession(req, sessionData, function () {
      res.redirect("/login");
    });
    return;
  }
  const passwordIsCorrect = await newUser.comparedPassword(
    existingUser.password
  );
  if (!passwordIsCorrect) {
    sessionFlash.flashDataSession(req, sessionData, function () {
      res.redirect("/login");
    });
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}
function signout(req, res) {
  authUtil.userLogoutSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  signIn: signIn,
  signout,
};
