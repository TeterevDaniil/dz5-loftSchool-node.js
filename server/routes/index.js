var express = require('express');
var router = express.Router();
const userCTRL = require('../controllers');

router.post('/api/registration', userCTRL.saveNewUser);
router.post('/api/login', userCTRL.UserLogin);
module.exports = router;

