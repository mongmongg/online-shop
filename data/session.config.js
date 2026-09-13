const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongodbStore(session);

  const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017/",
    databaseName: "online-shop",
    collection: "sessions",
  });

  return sessionStore;
}

function createSessionConfig() {
  return {
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  };
}
module.exports = { createSessionConfig };
