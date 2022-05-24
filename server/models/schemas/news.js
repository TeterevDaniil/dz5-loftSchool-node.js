const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsScheme = new Schema(
  {
    created_at: Date,
    text: String,
    title: String,
    user: {
        firstName: String,
        id: String,
        image: String,
        middleName: String,
        surName: String,
        username: String
    }
},
  {
    versionKey: false,
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
})

const News = mongoose.model('news', newsScheme);

module.exports = News;