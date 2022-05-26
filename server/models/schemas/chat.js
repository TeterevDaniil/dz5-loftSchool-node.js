const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsScheme = new Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  text: String,
  recipientId: String,
  senderId: String
})

const Chat = mongoose.model('chatMessage', newsScheme);

module.exports = Chat;