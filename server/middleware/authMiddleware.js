const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], "mySecretKey");
    req.user = await User.findById(verified.userId);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = {protect};