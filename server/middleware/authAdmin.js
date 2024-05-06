const jwt = require("jsonwebtoken");

const jwtSecret = "haider";

const authAdmin = async (req, res, next) => {
  const token = req.header("auth-token");
  try {
    const data = jwt.verify(token, jwtSecret);
    

    try {
      if (data && data.user.role === "admin") {
        next();
      } else {
        throw new Error("Access denied! only admin can access all users.");
      }
    } catch (error) {
      console.log('i am here authAdmin')
      return res.status(403).send({ error: error.message });
    }
  } catch (error) {
    return res.status(401).json({ error: "Please access using a valid token" });

  }
};

module.exports = authAdmin;
