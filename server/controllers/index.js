const db = require("../models/db");
const formidable = require('formidable');
const userSchema = require("../models/NewUser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      res.status(400).json({ error: 'Неверный логин или пароль!' });
      return;
    }
    const Password = user.password;
    if (!bcrypt.compareSync(password, Password)) {
      res.status(400).json({ error: 'Неверный логин или пароль!' });
      return;
    }
    const token = await db.getToken(user.id);
    await db.addUserToken(user.id, token);
 /////неуверен что создание куки необходимо 
    res.cookie("accessToken", token, {
      maxAge: 7 * 60 * 60 * 1000,
      path: "/",
      httpOnly: false
    });
 /////////////
    const user1 = await userSchema.findOne({ username });
    res.json({ user1 });
  });
};

module.exports.RefreshToken = async function (req, res) {
  try {
    const accessToken = req.headers.authorization;
    const decToken = jwt.decode(accessToken);
    const token = await db.getToken(decToken.id);
    const refreshedToken = await db.addUserToken(decToken.id, token);
    res.set('authorization', refreshedToken);
    res.send()

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}



