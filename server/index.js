const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const port = 5500;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am farooq");
});

app.use("/api/user", require("./routes/user"));

app.listen(port, () => {
  console.log(`todo-app running on port ${port}`);
});