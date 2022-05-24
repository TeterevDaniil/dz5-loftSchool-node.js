const db = require("../models/db");
const formidable = require('formidable');
const userSchema = require("../models/schemas/user");
const path = require('path');
const passport = require("passport");
const helper = require("../helper/serialize");
const token = require("../auth/token.js")
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports.saveNewUser = async function (req, res, next) {
  const validuser = await db.getUserByName(req.body.username);
  if (validuser) {
    return res.status(409).json({ message: "Пользователь существует" });
  }
  try {
    const newUser = await db.addUser(req.body);
    res.status(201).json({
      ...helper.serializeUser(newUser)
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.UserLogin = (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: "Не верный логин или пароль!" });
      }
      if (user) {
        const generatedToken = await token.createTokens(user);
        res.json({
          ...helper.serializeUser(user),
          ...generatedToken,
        });
      }
    }
  )(req, res, next);
};

module.exports.RefreshToken = async function (req, res) {
  try {
    const refreshToken = req.headers["authorization"];
    const data = await token.refreshTokens(refreshToken);
    res.json({ ...data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports.GetUser = async (req, res) => {
  const user = req.user;
  res.json({
    ...helper.serializeUser(user),
  })
}

module.exports.UpdateUser = async function (req, res) {
  const uploadDir = path.join("..", 'upload', 'img');
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: "Возникла ошибка" });
    }
    const { firstName, surName, middleName, oldPassword, newPassword } = fields;

    if (oldPassword.length === 0 || newPassword.length === 0) {
      return res.status(400).json({ message: "Необходимо ввести пароли" });
    }
    const validPassword1 = bcrypt.compareSync(oldPassword, req.user.hash);
    if (!validPassword1) {
      return res.status(400).json({ message: "Проверьте введенные пароли" });
    }
    const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10), null);

    function link(files, user_img) {
      if (!files.avatar) {
        const link = user_img;
        return link;
      }
      const fileType = files.avatar.mimetype;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        const fileName = path.join(uploadDir, files.avatar.originalFilename);
        const link = path.join('..', '..', 'img', files.avatar.originalFilename);
        fs.renameSync(files.avatar.filepath, fileName);
        return link;
      }
      const link = 'errFile';
      return link;

    }
    const userD = await db.getUserById(req.user._id);
    const image = link(files, userD.image);

    if (image === 'errFile') {
      return res.status(400).json({ message: "Файл не поддерживается" });
    }

    const data = {
      firstName: firstName,
      middleName: middleName,
      surName: surName,
      image: image,
      hash: hash
    }
    const user = await userSchema.findOneAndUpdate({ _id: req.user._id }, data, {
      new: true
    });
    const userData = await db.getUserById(req.user._id);
    return res.json({
      ...helper.serializeUser(userData),
    })
  });

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


module.exports.getNews = async function (req, res) {
  try {
    const news = await db.getNews();
    res.json({news});
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}


module.exports.addNews = async function (req, res) {
  try {
    const news = await db.addNews(req.body, req.user._id);
    const allNews = await db.getNews(); 
    res.json(allNews);
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
    const users = await db.getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
