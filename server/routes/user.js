const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//api endpoint to create a new user
router.post(
  "/createUser",
  [
    body("name").isLength({ min: 5 }),
    body("email")
      .isEmail()
      .custom(async (value) => {
        // Pass req as the second argument
        console.log(value, "farooq haider alvi");
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error("A user already exists with this e-mail address");
        }
      }),
    body("password").isLength({ min: 5 }).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.send(user);
    } catch (error) {
      res.status(500).send("internal server error occured.");
    }
  }
);

//

module.exports = router;
