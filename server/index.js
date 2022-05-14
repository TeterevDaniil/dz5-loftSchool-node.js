const express = require("express");
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const passport = require('passport');

 
const app = express();

require('./models');
app.use(require('./routes'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const router = express.Router();

app.use(express.static(path.join(__dirname, "..", "build")));

router.get("*", res => {
    res.sendFile = fs.readFileSync(
      path.resolve(path.join(__dirname, "..", "build", "index.html")),
      "utf8"  
    );
  });


   app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
  });