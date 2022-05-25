const db = require("../models/db");
const newsSchema = require("../models/schemas/news");
const helper = require("../helper/serialize");

module.exports.getNews = async function (req, res) {
    try {
      const news = await db.getNews();
      const responseNews = news.map(n => helper.serializeNews(n))
      res.json(responseNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  module.exports.updateNews = async function (req, res) {
    try {
      const Unews = await newsSchema.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true
      });
      const news = await db.getNews();
      const responseNews = news.map(n => helper.serializeNews(n))
      res.json(responseNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  module.exports.deleteNews = async function (req, res) {
    try {
      const delNews = await newsSchema.findOneAndDelete({_id: req.params.id });
      const news = await db.getNews();
      const responseNews = news.map(n => helper.serializeNews(n))
      res.json(responseNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
  