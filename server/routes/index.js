var express = require('express');
var router = express.Router();
const userCTRL = require('../controllers');
const validToken = require('../auth/validToken');


router.post('/registration', (req, res, next) => userCTRL.saveNewUser(req, res, next));
router.post('/login', (req, res, next) => userCTRL.UserLogin(req, res, next));
router.post('/refresh-token', (req, res, next) => userCTRL.RefreshToken(req, res, next));
router.get('/profile', validToken.auth,(req,res,next)=>userCTRL.GetUser(req,res,next));
router.patch('/profile',validToken.auth,(req,res,next)=>userCTRL.UpdateUser(req,res,next)); 
router.get('/users', validToken.auth,(req,res,next)=>userCTRL.GetUsers(req,res,next));
router.delete('/users/:id', userCTRL.deleteUser);

router.get('/news',validToken.auth,(req,res,next)=>userCTRL.getNews(req,res,next));
router.post('/news',validToken.auth,(req,res,next)=>userCTRL.addNews(req,res,next));

module.exports = router;
