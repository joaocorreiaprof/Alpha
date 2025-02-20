require("dotenv").config();
const express = require("express");
const router = express.Router();

const { displayAllUsers } = require("../../controllers/users/usersControllers");
router.get("/all-users", displayAllUsers);

module.exports = router;
