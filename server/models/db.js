const userSchema = require("./schemas/user");
const newsSchema = require("./schemas/news");
const messageSchema = require("./schemas/chat");

module.exports.getUserByName = async (username) => {
  return userSchema.findOne({ username: username });
}

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
  return userSchema.findOneAndDelete({ _id: id });
}

module.exports.getUsers = () => {
  return userSchema.find();
}



module.exports.getUserById = async (id) => {
  const user = userSchema.findOne({ _id: id });
  return user;
}


module.exports.getNews = async () => {
  return newsSchema.find().populate('user');
}


module.exports.addNews = async (data, id) => {
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

module.exports.addMessage = async (data) => {
  const { recipientId, senderId, text } = data;
  const newMess = new messageSchema({
    text: text,
    senderId: senderId,
    recipientId:recipientId
  });
  await newMess.save();
  const message = await newMess.save();
  return message;
}

module.exports.getUserMessage = async (recipientId, userId) => {
const message = await messageSchema.find({
  $or: [
    {recipientId:recipientId, senderId:userId},
    {recipientId:userId, senderId:recipientId}
  ]
});

return message;
}