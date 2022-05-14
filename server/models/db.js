const userSchema = require("./NewUser");

module.exports.addUser = ({
  firstName,
  middleName,
  surName,
  username,
  password
}) => {
   return new Promise((res, req) => {
    const user = new userSchema({ firstName, middleName, surName, username });
    user.setPassword(password);
    res(user.save());
  });
};

module.exports.UserLogin=( username,result)=>{
  userSchema.findOne({username: username}).exec(function(err, user){
    if(err)
      return (err);
      return (user.username);
  });
}
  



// module.exports.UserLogin =(username, )=>{
//     userSchema.findOne({username: username },(err, username)=> {
//     if(err) return (err);
//     const user = username.username;
//     return(user);
//   });
//   return callback;
// }

// module.exports.UserLogin = (username,password)=>{
//       userSchema.findOne({"username": username}, "username",(err,username)=>{
//        if(err)return (err);
//         return ({"username": username});
//        // console.log(username);
//        });;
//   };


module.exports.CheckUser = (username,password)=>{


}