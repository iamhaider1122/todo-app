const mongoose = require("mongoose");

const mongoUri = "mongodb://localhost:27017/todo_app";

const connectToMongo = () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch(() => {
      console.log("Error connection to MongoDB:", error);
    });
};

module.exports = connectToMongo;
