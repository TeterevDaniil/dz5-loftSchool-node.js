var express = require('express');
var router = express.Router();
const userCTRL = require('../controllers');

router.post('/registration', userCTRL.saveNewUser);
router.post('/login', (req, res, next) => userCTRL.UserLogin(req, res, next));
router.post('/refresh-token', userCTRL.RefreshToken);


module.exports = router;
