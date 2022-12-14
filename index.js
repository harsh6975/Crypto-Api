const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./router/index_router");

// Importing env
const dotenv = require("dotenv");
dotenv.config();

// Port for server
const Port = 5000;

// Connecting Database
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Error in connecting database", err));

// Using express router
app.use("/", route);

//starting the server
app.listen(Port, () => {
  console.log("Server is running on port ", Port);
});
