const db = require("../models/db");
const formidable = require('formidable');
const userSchema = require("../models/NewUser");
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

module.exports.saveNewUser = function(req, res,next) {
      try {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields) => {
          if (err) {
            next(err);
            return;
          }
         const { firstName, middleName, surName,username,password} = fields;
         const user = db.addUser(fields);
         console.log(`New user ${username} has been saved!`);
         res.json({ fields });
       });
      }
      catch(err){
        console.error(err);
        res.status(400).json({ error: err.message });
      }
    }


    module.exports.UserLogin = function(req,res,next){
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields) => {
        const {username, password} = fields;

        passport.use(new LocalStrategy({
          username,
          password
              }, (username, password,done)=>{
                userSchema.findOne({ username : username},function(err,user){
                //  console.log("sfdfsdf");
                  return err 
                    ? done(err)
                    : user
                      ? password === user.password
                        ? done(null, user)
                        : done(console.log("Incorrect password"))
                      : done(null, false, { message: 'Incorrect username.' });
                });
              }));

   
       });
    }


