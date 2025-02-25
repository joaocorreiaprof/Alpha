require("dotenv").config();
const express = require("express");
const router = express.Router();

const {
  displayAllUsers,
  displayUserById,
} = require("../../controllers/users/usersControllers");

// Rota para buscar todos os usuários
router.get("/all-users", displayAllUsers);

// Rota para buscar um usuário pelo ID
router.get("/:userId", displayUserById);

module.exports = router;
