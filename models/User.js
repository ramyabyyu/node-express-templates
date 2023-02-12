const { Schema, model } = require("mongoose");
const validateEmail = require("../helpers/validateEmail");
const hashPassword = require("../utils/bcrypt/hashPassword");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requird: true,
      unique: true,
      set: validateEmail,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      set: hashPassword,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
