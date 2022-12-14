const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get("/transactions/:address", userController.transactions);

module.exports = router;
