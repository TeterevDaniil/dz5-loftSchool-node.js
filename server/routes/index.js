var express = require('express');
var router = express.Router();
const userCTRL = require('../controllers');

router.post('/api/registration', userCTRL.saveNewUser);
router.post('/api/login', userCTRL.UserLogin);
 router.post('/api/refresh-token', userCTRL.RefreshToken);
// router.get('/api/profile', userCTRL.GetUser);
// router.patch('/api/profile', userCTRL.UpdateUser);
// router.delete('/api/users/:id', userCTRL.deleteUser);
// router.get('/api/users', userCTRL.GetUsers);
// router.patch('/api/users/:id/permission', userCTRL.GetUserPermission);


// router.get('/api/news', userCTRL.GetNews);
// router.post('/api/news', userCTRL.addNews);
// router.delete('/api/news/:id', userCTRL.deleteNews);

module.exports = router;

