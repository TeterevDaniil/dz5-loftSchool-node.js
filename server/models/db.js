const userSchema = require("./schemas/user");
const newsSchema = require("./schemas/news");

module.exports.addUser = async (data) => {
  const { username, surName, firstName, middleName, password } = data;
  const newUser = new userSchema({
    username,
    surName,
    firstName,
    middleName,
    image: '',
    permission: {
      chat: { C: true, R: true, D: true, U: true },
      news: { C: true, R: true, D: true, U: true },
      settings: { C: true, R: true, D: true, U: true },
    }
  })
  newUser.setPassword(password);
  const user = await newUser.save();
  return user;
}





// module.exports.addUserToken = (id, token) => {
//   const data = { accessToken: token }
//   const Token = userSchema.findOneAndUpdate({ id: id }, data, {
//     new: true
//   });
//   return Token;
// };

// module.exports.UpdateToken = (id, token) => {
//   const data = { refreshToken: token }
//   const Token = userSchema.findOneAndUpdate({ id: id }, data, {
//     new: true
//   });
//   return Token;
// };

// module.exports.getToken = async (id) => {
//   const token = jwt.sign({ id: id }, uuidv1());
//   return token;
// }

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


module.exports.addNews = async (data,userData) => {
  const { title, text } = data;
  const {_id,firstname,middleName,surName,username} = userData;

  const newNews = new newsSchema({
    created_at: Date(),
    text: text,
    title: title,
    user: {
        firstName: firstname,
        id: _id,
        middleName: middleName,
        surName: surName,
        username: username
    }
  })
 
  const news = await newNews.save();
  return news;
  
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

// module.exports.getUsers = () => {
//   userSchema.find({}, async function (err, docs) {
//     if (err) return console.log(err);
//     console.log(docs);
//     return docs;
//   });
// }


module.exports.getUsers = () => {
  return userSchema.find();
}

module.exports.getUserByName = async (username) => {
  return userSchema.findOne({ username: username });
}

module.exports.getUserById = async (id) => {
  const user = userSchema.findOne({ _id: id });
  return user;
}
