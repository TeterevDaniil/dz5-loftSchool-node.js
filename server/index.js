const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require("./models/db");

require('dotenv').config();
require('./models/connection');

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

require('./auth/passport');



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

app.use("/api", require('./routes'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "..", "upload")));

app.use("*", (_req, res) => {

  const file = path.resolve(path.join(__dirname, "..", "build", "index.html"));
  res.sendFile(file);

});


app.listen(process.env.PORT, () => {
  console.log("Example app listening on port 3000!");
});

