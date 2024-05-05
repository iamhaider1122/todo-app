const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "haider";
const fetchUser = require("../middleware/fetchUser");
const authAdmin = require("../middleware/authAdmin");
const authenticateToken = require("../middleware/authenticateToken");
//api endpoint to create a new user
router.post(
  "/createUser",
  [
    body("name", "Name must be 5 characters long").isLength({ min: 5 }),
    body("email").isEmail(),
    body("role")
      .exists()
      .custom(async (value) => {
        console.log(value, "i am value");
        const existingUser = await User.findOne({ role: value });
        if (existingUser) {
          if (existingUser.role === "admin" && value === "admin") {
            throw new Error("Admin already exists");
          }
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
        role: req.body.role,
      });

      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(data, jwtSecret);
      res.json({ token: token });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email) {
        return res.status(400).json({ errors: [{ msg: "Email already exists", path: "email" }] });
      }
      res.status(500).send("internal server error occured.");
    }
  }
);

//route for login User
router.post(
  "/loginUser",
  [body("email").isEmail().exists(), body("password").exists()],
  async (req, res) => {
    console.log(req.body.email, req.body.password, req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('error occuring here')
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      let comparePass = await bcrypt.compare(req.body.password, user.password);

      if (!comparePass) {
       return res.status(401).json({ error: "invalid email or password" });
      }

      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
   
      const token = jwt.sign(data, jwtSecret);
            console.log(token)
         res.cookie('token', token,{httpOnly:true,path:'/',domain:'http:localhost:3000'}).status(200).json({token,success:true})
      // res.json({ token: token });
    } catch (error) {
      console.log(error);
    }
  }
);

//endpoint to check if the user is valid checking token
router.get('/protected',authenticateToken, async(req,res)=>{

  if(req.user.role==='admin' || req.user.role==='user'){
    return res.status(200).send("authenticated user")
  }
  else{
    return res.status(400).send("unauthenticated user")
  }

})


//endPoint to fetch all users

router.get("/getAllUsers", authAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interal server error occured.");
  }
});

//endPoint to fetch a user
router.get("/getUser/:id", authAdmin, async (req, res) => {
  try {
    console.log(req.params.id);
    let userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("interal server error occured.");
  }
});

module.exports = router;

// e bcrypt.compare() method to compare a plain text password with a hashed password stored in your database,
//  bcrypt automatically extracts the salt from the hashed password and uses it for comparison.

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZjYxMWM2MjRjYmNkNGUxMGNkZTdkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDM4NjE5NX0.3WJQOYttPA_Hk202uI9WeLi8ejqzeHsqevHV_b2kCik
