// import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const httpResponse = require("./helpers/httpResponse");
const mongoConnection = require("./config/mongo");

// init express app
const app = express();

// Express middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// cors origin
app.use(cors());

// express static
app.use("/public", express.static("public"));

// route apis

// not found api route
app.use((_, res) => {
  return httpResponse.notFoundResponse(res, "Api not found");
});

// mongodb connection
mongoConnection();

// init server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server ready at port : ${port}`);
});
