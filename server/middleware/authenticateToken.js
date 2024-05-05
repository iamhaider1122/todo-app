const jwt = require("jsonwebtoken");

const jwtSecret = "haider";

const authenticateToken = async (req, res, next) => {
    
  const token = req.cookies.token;
  console.log(token,"farooq haider token")
  try {
    const data = jwt.verify(token, jwtSecret);
    console.log("i am data decoded from jwt", data, "---------");

    req.user = data.user;
    console.log("i am req.user", req.user.role, "---------------");
    next();
  } catch (error) {
    return res.status(401).send({ error: "please access using a valid token" });
  }
};

module.exports = authenticateToken;
