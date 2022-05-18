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
require('./models');
const app = express();

app.use(
  session({
    store: new FileStore(),
    secret: 'secretWord',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
      async function(username, password, done) {
      const user = await db.getUserByName("teterevdanil@gmail.com");
      console.log(user);
      if (user) {
        console.log("sdsdsdsd");
          return done(null, user);
        } else {
          console.log("1111sdsdsdsd");
          return done(null, false);
        }
    }
  
));



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



app.use(require('./routes'))

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