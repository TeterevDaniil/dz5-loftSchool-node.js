const userSchema = require("./NewUser");
const jwt = require('jsonwebtoken');
const { v1: uuidv1 } = require('uuid');

module.exports.addUser = ({firstName,middleName,surName,username,password}) => {
   return new Promise((res, req) => {
    const user = new userSchema({ firstName, middleName, surName, username });
    user.setPassword(password);
    res(user.save());
  });
};

module.exports.addUserToken = (id,token) => {
  const data = {accessToken: token}
  const Token = userSchema.findOneAndUpdate({ id: id }, data, {
    new: true
  });
  return Token;  
};

module.exports.addUserToken = (id,token) => {
  const data = {refreshToken: token}
  const Token = userSchema.findOneAndUpdate({ id: id }, data, {
    new: true
  });
  return Token;  
};





module.exports.getToken= (id)=>{
   const token = jwt.sign({ id: id }, uuidv1());
   return token;
}

module.exports.getUserToken = function(accessToken) {
//  return userSchema.findOne(accessToken);
};