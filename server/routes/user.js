const express = require("express");
const router = express.Router();
const User = require("../models/User");

//api endpoint to create a new user
router.post("/createUser", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.send( user );
});

module.exports = router;
