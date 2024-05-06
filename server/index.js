const connectToMongo = require("./db");
const cookieParser = require('cookie-parser');


// Use cookie-parser middleware to parse cookies from incoming requests

connectToMongo();
const express = require("express");
const app = express();
const cors=require('cors')

app.use(cookieParser());
const port = 5500;
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am farooq");
});

app.use("/api/user", require("./routes/user"));
app.use("/api/task", require("./routes/task"));

app.listen(port, () => {
  console.log(`todo-app running on port ${port}`);
});
