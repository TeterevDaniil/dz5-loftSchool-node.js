const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String},
  id: { type: String, default: uuidv4() },
  image:{ type: String},
  password:{ type: String},
  middleName: { type: String},
  permission: {
    chat: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true }
    },
    news: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true }
    },
    settings: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true }
    }
  },
  surName: { type: String},
  username: { type: String},
  accessToken: { type: String},
  refreshToken: { type: String},
  accessTokenExpiredAt:{ type: Number, default: new Date().getTime()},
  refreshTokenExpiredAt: { type: Number, default: new Date().getTime()}
}
);

userSchema.methods.setPassword = function(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
 this.password = hash;
};

var User = mongoose.model("User", userSchema);

module.exports = User;