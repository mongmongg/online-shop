const db = require("../data/database");
const bcryptjs = require("bcryptjs");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      postal: postal,
      city: city,
    };
  }
  async createAccount() {
    const hashedPassword = await bcryptjs.hash(this.password, 12);
    const newUser = {
      email: this.email,
      password: hashedPassword,
      name: this.fullname,
      address: this.address,
    };
    const result = await db.getDb().collection("users").insertOne(newUser);
    return result;
  }
  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }
  async existAlready() {
    const existUser = await this.getUserWithSameEmail();
    if (existUser) {
      return true;
    } else {
      return false;
    }
  }

  async comparedPassword(password) {
    const isEqual = await bcryptjs.compare(this.password, password);
    return isEqual;
  }
}

module.exports = User;
