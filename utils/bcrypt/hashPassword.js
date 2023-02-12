const bcrypt = require("bcryptjs");

const saltRounds = 12;

const hashPassword = async (password) => {
  const genSalt = await bcrypt.genSalt(saltRounds);
  const hashed = await bcrypt.hash(password, genSalt);
  return hashed;
};

module.exports = hashPassword;
