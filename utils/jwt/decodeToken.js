require("dotenv").config();
const jwt = require("jsonwebtoken");
const httpResponse = require("../../helpers/httpResponse");
const getToken = require("../../helpers/getToken");

function decodeToken() {
  return async function (req, res, next) {
    try {
      const token = getToken(req);

      if (!token) {
        return httpResponse.unauthorizedResponse(res, "No token");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return httpResponse.badRequestResponse(res, "Invalid authentication");
      }

      // decoded data

      return next();
    } catch (error) {
      return httpResponse.serverErrorResponse(
        res,
        error && error.name === "JsonWebTokenError" ? error : error.message
      );
    }
  };
}

module.exports = decodeToken;
