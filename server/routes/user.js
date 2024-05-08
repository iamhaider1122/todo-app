const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
const authAdmin = require("../middleware/authAdmin");
const authenticateToken = require("../middleware/authenticateToken");


//api endpoint to create a new user admin/user
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
    body("password","Password must be 6 characters long").isLength({ min: 6 }).exists(),
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

      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({ token: token });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email) {
        console.log('i am error from already')
        errors.errors.push({ msg: "Email already exists", path: "email" });
           return res.status(400).json({ errors: errors.array() });
      }
      res.status(500).send({error:"Internal Server Occured"});
    }
  }
);

//route for login User admin/user
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
   
      const token = jwt.sign(data, process.env.JWT_SECRET);
            console.log(token)
         res.cookie('token', token,{httpOnly:true,path:'/',domain:'http:localhost:3000'}).status(200).json({token,success:true})
      // res.json({ token: token });
    } catch (error) {
      send({error:"Internal Server Occured"})
    }
  }
);


//endpoint to check if the user is valid checking token admin/user
router.get('/protected',authenticateToken, async(req,res)=>{

   
  if(req.user.role==='admin' || req.user.role==='user'){
    return res.status(200).json({success:true,role:req.user.role})
  }
  else{
    return res.status(400).json({error:"unauthenticated user"})
  }

})


//endPoint to fetch all users::admin/user

router.get("/getAllUsers" ,authenticateToken ,async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    console.log(users)
    res.send(users);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({error:"Internal Server Occured"})
  }
});

//endPoint to fetch a user::admin/user
router.get("/getUser/:id", authenticateToken ,async (req, res) => {
  try {
    console.log(req.params.id);
    let userId = req.params.id;
    const user = await User.findById(userId).select("-password");
   
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({error:"Internal Server Occured"})
  }
});




module.exports = router;




