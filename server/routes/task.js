const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Task = require("../models/Task");
const fetchUser = require("../middleware/fetchUser");

router.post(
  "/createTask",
  [
    body("title", "Title must be 5 characters long").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (req.user.role !== "admin") {
        throw new Error("Only Admin can create Task");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    try {
      const task = await Task.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
      });

      res.send(task);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Occured");
    }
  }
);

module.exports = router;
