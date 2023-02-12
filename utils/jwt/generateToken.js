const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (encryptData) => {
  const token = await jwt.sign(encryptData, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = generateToken;
