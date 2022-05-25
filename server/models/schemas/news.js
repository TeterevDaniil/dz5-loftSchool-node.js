const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsScheme = new Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  text: String,
  title: {
    type: String
  },

  user: { type: Schema.Types.ObjectId, ref: "user" }
  
})

const News = mongoose.model('news', newsScheme);

module.exports = News;