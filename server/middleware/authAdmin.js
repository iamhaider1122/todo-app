const jwt = require("jsonwebtoken");

 

const authAdmin = async (req, res, next) => {

  const token = req.cookies.token;
 
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    

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
