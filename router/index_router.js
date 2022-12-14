const express = require("express");
const userRoutes = require("./users_router");
const indexController = require("../controllers/index_controller");

const router = express.Router();

router.get("/", indexController.price);
router.use("/users", userRoutes);
module.exports = router;
