const router = require("express").Router();

// routes
const UserRouter = require("./UserRouter");

router.use("/user", UserRouter);

module.exports = router;
