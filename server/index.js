const express = require("express");
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const db = require("./models/db");
const formidable = require('formidable');
const bcrypt = require("bcrypt");
require('./models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Control-Type, Accept"
  );
  next();
});
app.use(passport.initialize());
// app.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      console.log("Strategy work", username);
      const user = await db.getUserByName(username);
      console.log(user);
      if (!user) {
        return done(null, false);
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      console.log(err);
      done(err);
    }
  })
);



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});



app.use("/api",require('./routes'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

app.use(express.static(path.join(__dirname, "..", "build")));

router.get("*", res => {
  res.sendFile = fs.readFileSync(
    path.resolve(path.join(__dirname, "..", "build", "index.html")),
    "utf8"
  );
});


app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

// module.exports = app;
