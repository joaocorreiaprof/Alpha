require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  displayAllUsers,
  displayUserById,
  updateUserProfilePicture,
} = require("../../controllers/users/usersControllers");

// Rota para buscar todos os usuários
router.get("/all-users", displayAllUsers);

// Rota para buscar um usuário pelo ID
router.get("/:userId", displayUserById);

// Rota para atualizar a foto de perfil do usuário
router.put(
  "/:userId/profile-picture",
  upload.single("profilePicture"),
  updateUserProfilePicture
);

module.exports = router;
