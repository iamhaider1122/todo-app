const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Task = require("../models/Task");
const fetchUser = require("../middleware/fetchUser");
const authAdmin=require('../middleware/authAdmin')

router.post(
  "/createTask/:id",
  [
    body("title", "Title must be 5 characters long").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  authAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body.title)
    console.log(req.body.description)
    if (!errors.isEmpty()) {
      console.log("error is coming from this side")
      return res.status(400).json({ errors: errors.array() });
    }
 
    console.log(req.params.id,"/////////////i am id")
    

    try {
      const task = await Task.create({
        user: req.params.id,
        title: req.body.title,
        description: req.body.description,
      });

      res.send(task);
    } catch (error) {
      console.log("error is coming from this side2")
      console.error(error.message);
      res.status(500).send("Internal Server Occured");
    }
  }
);

module.exports = router;
