const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//api endpoint to create a new user
router.post(
  "/createUser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //this will clg object as errors is of type object
      console.log(typeof errors);
      //this will console.log errors object that contain errors as key and array of errors as its value
      console.log(errors);

      //this will extract errors from errors object and will return them in array form
      console.log(errors.array());
      //.json({error:error.array()}) will return json data with key of errors and its value will be an error array
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.create({
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
