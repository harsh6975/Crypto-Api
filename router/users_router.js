const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get("/transactions/:address", userController.transactions);
router.get("/balance/:address", userController.balance);


module.exports = router;
