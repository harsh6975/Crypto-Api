const express = require("express");
const app = express();
const mongoose = require("mongoose");

//importing env 
const dotenv = require("dotenv");
dotenv.config();

// Port for server
const Port = 5000;

//connecting Database
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Error in connecting database", err));

//starting the server
app.listen(Port, () => {
  console.log("Server is running on port ", Port);
});
