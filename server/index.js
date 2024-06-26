const connectToMongo = require("./db");
const cookieParser = require('cookie-parser');
require('dotenv').config()

// Use cookie-parser middleware to parse cookies from incoming requests

connectToMongo();
const express = require("express");
const app = express();
const cors=require('cors')

app.use(cookieParser());


const port = 5500;
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Allow sending cookies
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am farooq");
});

app.use("/api/user", require("./routes/user"));
app.use("/api/task", require("./routes/task"));

app.listen(port, () => {
  console.log(process.env.JWT_SECRET)
  console.log(`todo-app running on port ${port}`);
});
