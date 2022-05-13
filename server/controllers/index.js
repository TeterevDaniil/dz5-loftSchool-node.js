const db = require("../models/db");

module.exports.saveNewUser = async function(req, res) {
    try {
     const user = await db.addUser(req.body);
     console.log(`New user ${user.username} has been saved, with user_id ${user.id}`);
     res.json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  };

