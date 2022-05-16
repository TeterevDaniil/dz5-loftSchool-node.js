var express = require('express');
var router = express.Router();
const userCTRL = require('../controllers');

router.post('/api/registration', userCTRL.saveNewUser);
router.post('/api/login', userCTRL.UserLogin);
router.post('/api/refresh-token', userCTRL.RefreshToken);
module.exports = router;

