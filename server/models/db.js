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


module.exports.getNews = () => {
  console.log("here");
  const news = newsSchema.find({}).populate('user').exec(function (err, docs) {
      if (err) return (err);
      console.log('The author is %s', docs.user);
     
    });
  // return news.map(news => ({
  //   id: news.id,
  //   title: news.title,
  //   created_at: news.created_at,
  //   text: news.text,
  //   user: {
  //     id: news.user.id,
  //     username: news.user.username,
  //     firstName: news.user.firstName,
  //     middleName: news.user.middleName,
  //     image: news.user.image
  //   }
  // }));
}


module.exports.addNews = async (data,id) => {
  const { title, text } = data;
 
  const newNews = new newsSchema({
    user: id,
    title,
    text
  });

  await newNews.save();
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
