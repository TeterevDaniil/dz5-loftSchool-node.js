const db = require("../models/db");
const formidable = require('formidable');
const userSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path');
const passport = require("passport");
const helper = require("../helper/serialize");


module.exports.saveNewUser = function (req, res, next) {
  try {
    console.log(req.body);
    console.log("xnj nj");
    const user = db.addUser(req.body);
    console.log(`New user ${req.body.username} has been saved!`);
   res.status(200).json({ message: "GOOD" });;

    const form = formidable({ multiples: true });
    form.parse(req, (err, fields) => {
      if (err) {
        next(err);
        return;
      }
      console.log(fields);
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

module.exports.UserLogin = (req, res, next) => {
  passport.authenticate('local', {session: false},  async (err, user, info) => {
    console.log('In controller');
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: "Не верный логин или пароль!" });
    }

    if (user) {
      const token = await db.getToken(user.id);
      console.log(token);
      res.json({
        ...helper.serializeUser(user),
        accessToken:token,
        refreshToken:token,
      });
    }
  })(req, res, next);
}

module.exports.RefreshToken = async function (req, res) {
  try {
    const accessToken = req.headers.authorization;
    const decToken = jwt.decode(accessToken);
    const token = await db.getToken(decToken.id);
    const refreshedToken = await db.UpdateToken(decToken.id, token);
    res.set('authorization', refreshedToken);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports.GetUser = async function (req, res) {
  //const accessToken = req.headers.authorization;
  console.log(req.cookie);
  console.log(req.Authorization);
  console.log(req.authorization);
  console.log(req.rawHeaders.Authorization);
  console.log("hear");

  // if (!accessToken) {
  //   res.status(400).json({ error: "Возникла ошибка авторизации" });
  //   return;
  // }
  // const decToken = jwt.decode(accessToken);
  // const user1 = await userSchema.findOne({ id: decToken.id });
  // res.status(200).json(user1);
}

module.exports.UpdateUser = async function (req, res) {
//   const accessToken = req.headers.authorization;
//    if (!accessToken) {
//      res.status(400).json({ error: "Возникла ошибка авторизации" });
//      return;
//    }
// console.log(req);
//   // const form = formidable({ multiples: true });

console.log('in apdate user');
   const uploadDir = path.join(__dirname,'../uploads/img');
  const formidable = require("formidable");
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: "Возникла ошибка" });
    }
   const {firstName,sureName,middleName,oldPassword,newPassword} = fields;
    
   console.log(files);
  //  console.log(files);
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
    res.status(200);
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
     const news = await db.addNews( ...req.body, userToken);
    // res.json(news);
  } catch (err) {
     console.error(err);
     res.status(400).json({ error: "Что то пошло не так!" });
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
    userSchema.find({}, async function(err, docs){
      if(err) return console.log(err);
      res.json(docs);
  });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
