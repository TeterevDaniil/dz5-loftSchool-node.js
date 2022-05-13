const userSchema = require("./NewUser");

module.exports.addUser = ({
  middleName,
  firstName,
  surName,
  username,
  password
}) => {
   return new Promise((res, req) => {
    const user = new userSchema({ firstName, middleName, surName, username });
    user.setPassword(password);
    res(user.save());
  });
};