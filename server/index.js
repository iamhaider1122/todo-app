console.log("farooq");

const express = require("express");
const app = express();
const port = 5500;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am farooq");
});

app.listen(port, () => {
  console.log(`todo-app running on port ${port}`);
});
