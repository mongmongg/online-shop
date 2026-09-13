function isEmpty(value) {
  return !value || value.trim() === "";
}
function userCredentialAreValid(email, confirmEmail, password) {
  return (
    email &&
    email.includes("@") &&
    confirmEmail &&
    confirmEmail === email &&
    password &&
    password.trim().length >= 6
  );
}
function accountIsValid(
  email,
  confirmEmail,
  password,
  fullname,
  street,
  postal,
  city
) {
  return (
    userCredentialAreValid(email, confirmEmail, password) &&
    !isEmpty(fullname) &&
    !isEmpty(postal) &&
    isEmpty(street) &&
    isEmpty(city)
  );
}
function confirmEmailIsSame(email, confirm) {
  return email === confirm;
}
module.exports = { accountIsValid ,confirmEmailIsSame};
