var express = require('express');
var router = express.Router();
const userCTRL = require('../controllers/user');
const newsCTRL = require('../controllers/news');
const validToken = require('../auth/validToken');


router.post('/registration', (req, res, next) => userCTRL.saveNewUser(req, res, next));
router.post('/login', (req, res, next) => userCTRL.UserLogin(req, res, next));
router.post('/refresh-token', (req, res, next) => userCTRL.RefreshToken(req, res, next));
router.get('/profile', validToken.auth,(req,res,next)=>userCTRL.GetUser(req,res,next));
router.patch('/profile',validToken.auth,(req,res,next)=>userCTRL.UpdateUser(req,res,next)); 
router.get('/users', validToken.auth,(req,res,next)=>userCTRL.GetUsers(req,res,next));
router.delete('/users/:id',validToken.auth,(req,res,next)=>userCTRL.deleteUser(req,res,next));
router.patch('/users/:id/permission',validToken.auth,(req,res,next)=>userCTRL.updatePermission(req,res,next));

router.get('/news',validToken.auth,(req,res,next)=>newsCTRL.getNews(req,res,next));
router.post('/news',validToken.auth,(req,res,next)=>newsCTRL.addNews(req,res,next));
router.patch('/news/:id',validToken.auth,(req,res,next)=>newsCTRL.updateNews(req,res,next));
router.delete('/news/:id',validToken.auth,(req,res,next)=>newsCTRL.deleteNews(req,res,next));

module.exports = router;
