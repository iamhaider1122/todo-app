const jwt = require("jsonwebtoken");

 

const authenticateToken = async (req, res, next) => {
    
  const token = req.cookies.token;
  console.log(token,"farooq haider tokendfdf")
  console.log(process.env.JWT_SECRET)
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log("i am data decoded from jwt", data, "---------");

    req.user = data.user;
    console.log("i am req.user", req.user.role, "---------------");
    next();
  } catch (error) {
    return res.status(401).send({ error: "please access using a valid token" });
  }
};

module.exports = authenticateToken;
