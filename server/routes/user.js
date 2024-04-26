const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "haider";
const fetchUser = require("../middleware/fetchUser");
//api endpoint to create a new user
router.post(
  "/createUser",
  [
    body("name", "Name must be 5 characters long").isLength({ min: 5 }),
    body("email")
      .isEmail()
      .custom(async (value) => {
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

    const salt = bcrypt.genSaltSync(10);

    const secPass = await bcrypt.hash(req.body.password, salt);

    try {
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      res.send({ jwtToken: authToken });
    } catch (error) {
      res.status(500).send("internal server error occured.");
    }
  }
);

//route for login User

router.post(
  "/loginUser",
  [body("email").isEmail().exists(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      let comparePass = await bcrypt.compare(req.body.password, user.password);

      if (!comparePass) {
        res.status(400).json({ error: "invalid email or password" });
      }

      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      const token = jwt.sign(data, jwtSecret);
      res.json({ token });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interal server error occured.");
  }
});

module.exports = router;

// e bcrypt.compare() method to compare a plain text password with a hashed password stored in your database,
//  bcrypt automatically extracts the salt from the hashed password and uses it for comparison.
