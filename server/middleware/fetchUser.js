const jwt = require("jsonwebtoken");

const jwtSecret = "haider";

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  try {
    const data = jwt.verify(token, jwtSecret);
    console.log("i am data decoded from jwt", data, "---------");

    req.user = data.user;
    console.log("i am req.user", req.user, "---------------");
    next();
  } catch (error) {
    return res.status(401).send({ error: "please access using a valid token" });
  }
};

module.exports = fetchUser;
