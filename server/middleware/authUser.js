const jwt = require("jsonwebtoken");

 

const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log(data.user.role)
    try {
      if (data && data.user.role === "user") {
        next();
      } else {
        throw new Error("Access denied! only user can access.");
      }
    } catch (error) {
      console.log('i am here authAdmin')
      return res.status(403).send({ error: error.message });
    }
  } catch (error) {
    return res.status(401).json({ error: "Please access using a valid token" });
  }

};

module.exports = authUser;
