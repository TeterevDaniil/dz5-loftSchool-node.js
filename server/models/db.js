const userSchema = require("./NewUser");
const bcrypt = require('bcrypt');

module.exports.addUser = ({firstName,middleName,surName,username,password}) => {
   return new Promise((res, req) => {
    const user = new userSchema({ firstName, middleName, surName, username });
    user.setPassword(password);
    res(user.save());
  });
};



module.exports.Autorization = (Password,password)=>{
  console.log(password);
  console.log(Password);
 
  const pa = !bcrypt.compare(password, Password);
  console.log(pa);
  if(!pa){
   //   res.status(400).json({ error: '2Неверный логин или пароль!'});
   console.log( '2Неверный логин или пароль!');
    return;
  }
  if (pa){
   console.log( '3Неверный логин или пароль!');
  }
}