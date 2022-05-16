const db = require("../models/db");
const formidable = require('formidable');
const userSchema = require("../models/NewUser");
const { TableRow } = require("@material-ui/core");
const bcrypt = require('bcrypt');

module.exports.saveNewUser = function (req, res, next) {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields) => {
      if (err) {
        next(err);
        return;
      }
      const { firstName, middleName, surName, username, password } = fields;
      const user = db.addUser(fields);
      console.log(`New user ${username} has been saved!`);
      res.json({ fields });
    });
  }
  catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};


module.exports.UserLogin = function (req, res, next) {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields) => {
    const { username, password } = fields;
    const user = await userSchema.findOne({ username });
    if (!user) {
      res.status(400).json({ error: '1Неверный логин или пароль!' });
      return;
    }
    const Password = user.password;
    console.log(password);
    console.log(Password);
    const pa = !bcrypt.compareSync(password, Password);
    console.log(pa);
    if (!pa) {
      res.status(400).json({ error: '2Неверный логин или пароль!' });
      return;
    }
    if (pa) {
      res.json({ user });
    }
  });
};





