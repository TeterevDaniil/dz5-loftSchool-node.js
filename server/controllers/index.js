const db = require("../models/db");
const formidable = require('formidable');
const bcrypt = require('bcrypt');

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


    module.exports.UserLogin = function(req,res){
      const form = formidable({ multiples: true });
      form.parse(req, (err, fields) => {
        if(err){
          res.status(400).json({ error: err.message });
        }
        const aproveUser = async function(fields, err){   
          if(err){
            return(err);
          }
        const {username,password} = fields;
        if(!username||!password){
          return res.redirect("/");
        }
         var salt = bcrypt.genSaltSync(10);
         var hash = bcrypt.hashSync(password, salt);
         this.password = hash;
         var userData =  db.UserLogin(username)
         
        console.log(userData);
        
       //res.json({ username });
        }
        aproveUser(fields);
       });
    }

