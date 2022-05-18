const db = require("../models/db");
const formidable = require('formidable');
const userSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')


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
      return res.redirect("/");
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
    res.status(200).json(user1);
 
  });
};

module.exports.RefreshToken = async function (req, res) {
  try {
    const accessToken = req.headers.authorization;
    const decToken = jwt.decode(accessToken);
    const token = await db.getToken(decToken.id);
    const refreshedToken = await db.UpdateToken(decToken.id, token);
   // req.headers.authorization = refreshedToken;
   // res.send();
   res.set('authorization', refreshedToken);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports.GetUser = async function (req, res) {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.status(400).json({ error: "Возникла ошибка авторизации" });
    return;
  }
  const decToken = jwt.decode(accessToken);
  const user1 = await userSchema.findOne({ id: decToken.id });
  res.status(200).json(user1);
}

module.exports.UpdateUser = async function (req, res) {
  const accessToken = req.headers.authorization;
  // if (!accessToken) {
  //   res.status(400).json({ error: "Возникла ошибка авторизации" });
  //   return;
  // }
  
 // const form = formidable({ multiples: true });
  
 // const uploadDir = path.join(__dirname,'../uploads/img');
 const formidable = require("formidable");
 const form = new formidable.IncomingForm();
 form.parse(req, async function(err, fields, files) {
   if (err) {
     console.error(err);
     return res.status(400).json({ error: "Возникла ошибка" });
   }
    console.log(fields);
    console.log(files);
    // const decToken = jwt.decode(accessToken);
    // const user =  userSchema.findOne({ id: decToken.id })
    // if (!user) {
    //   res.status(400).json({ error: "Возникла ошибка" });
    //   return;
    // }
   
    // if (!bcrypt.compareSync(user.password, Password)) {
    //   res.status(400).json({ error: 'Неверный логин или пароль!' });
    //   return;
    // }
   // console.log(fields.oldPassword);
   // console.log();
    ///const {name, price} = fields;
   /* const {originalFilename} = files.photo;
    const fileName = path.join(uploadDir,files.photo.originalFilename);
 
    const dirPhoto = path.join('./assets/img/products/',files.photo.originalFilename);
    console.log(dirPhoto);
      fs.renameSync(files.photo.filepath, fileName);
     */
  });
  
  // const decToken = jwt.decode(accessToken);
  // const user1 = await userSchema.findOne({ id: decToken.id });
  // res.json({ user1 });
}



module.exports.deleteUser = async function (req, res) {
  try {
    db.deleteUserById(req.params.id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.GetUserPermission = async function (req, res) {
  try {
     console.log(req.params.id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports.GetNews = async function (req, res) {
  try {
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}


module.exports.addNews = async function (req, res) {
  try {
    console.log("hear-news");
      const userToken = req.headers.authorization;
      //const { title, text } = req.body
      console.log(req.body);
   // console.log(userToken);
   // console.log(req.body);
     //  const news = await db.addNews( ...req.body, userToken);
   // res.json(news);
  } catch (err) {
  //  console.error(err);
  //  res.status(400).json({ error: err.message });
  }
}

module.exports.deleteNews = async function (req, res) {
  try {
    await db.deletenewsById(req.params.id);
    const news = await db.getNews();
    res.json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.GetUsers = async function (req, res) {
  try {
    const users = db.getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
