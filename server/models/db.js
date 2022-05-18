const userSchema = require("./userSchema");
const newsSchema = require("./newsSchema");
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');

module.exports.addUser = ({ firstName, middleName, surName, username, password }) => {
  return new Promise((res, req) => {
    const user = new userSchema({ firstName, middleName, surName, username });
    user.setPassword(password);
    res(user.save());
  });
};

module.exports.addUserToken = (id, token) => {
  const data = { accessToken: token }
  const Token = userSchema.findOneAndUpdate({ id: id }, data, {
    new: true
  });
  return Token;
};

module.exports.UpdateToken = (id, token) => {
  const data = { refreshToken: token }
  const Token = userSchema.findOneAndUpdate({ id: id }, data, {
    new: true
  });
  return Token;
};

module.exports.getToken = (id) => {
  const token = jwt.sign({ id: id }, uuidv1());
  return token;
}

module.exports.deleteUserById = (id) => {
  userSchema.findOneAndDelete({ id: id }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("Deleted User : ", docs);
    }
  });
}


module.exports.getNews = (id) => {
  const news = newsSchema.find();
  return news;
}


module.exports.addNews = (data) => {
  const news = new newsSchema(data);;
  return news.save();
}


module.exports.deletenewsById = (id) => {
  newsSchema.findOneAndDelete({ id: id }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      console.log("Deleted news : ", docs);
    }
  });
}

module.exports.getUsers= () => {
  userSchema.find({}).then(function (users) {
    return users;
    });
}
