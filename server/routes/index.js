var express = require('express');
var router = express.Router();
const userCTRL = require('../controllers');

router.post('/registration', userCTRL.saveNewUser);
router.post('/login', (req, res, next) => userCTRL.UserLogin(req, res, next));
router.post('/refresh-token', userCTRL.RefreshToken);
router.get('/profile', userCTRL.GetUser);
router.patch('/profile', userCTRL.UpdateUser);

router.get('/users', userCTRL.GetUsers);
router.delete('/users/:id', userCTRL.deleteUser);

router.post('/news', userCTRL.addNews);

module.exports = router;
