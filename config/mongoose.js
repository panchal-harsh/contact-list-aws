//require the library
require('dotenv').config();
const mongoose = require("mongoose");

//connect to the database
mongoose.connect(process.env.MONGO_URI);

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on("error", function (err) {
  console.log(err.message);
});

//up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});
