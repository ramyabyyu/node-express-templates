const User = require("../models/User");
const httpResponse = require("../helpers/httpResponse");
const {
  getAllCommon,
  getOneCommon,
  addOneCommon,
  editOneCommon,
  deleteAllCommon,
  deleteOneCommon,
} = require("../helpers/crud");
const generateToken = require("../utils/jwt/generateToken");

getAllCommon(User);
getOneCommon(User);
addOneCommon(User);
editOneCommon(User);
deleteAllCommon(User);
deleteOneCommon(User);

const signUp = async (req, res) => {
  try {
    const { body } = req;
    const newUser = await User.create({ ...body });
    return httpResponse.createdResponse(res, newUser);
  } catch (error) {
    return httpResponse.badRequestResponse(res, error.message);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  } catch (error) {}
};

module.exports = {
  getAllCommon,
  getOneCommon,
  addOneCommon,
  editOneCommon,
  deleteAllCommon,
  deleteOneCommon,
  signUp,
  signIn,
};
