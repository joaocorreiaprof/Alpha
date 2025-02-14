require("dotenv").config();
const express = require("express");
const router = express.Router();

// Importing controller
const {
  googleAuth,
  googleCallback,
  getProfile,
  logout,
} = require("../controllers/authController");

// Define routes and reference controller methods
router.get("/api/auth/google", googleAuth);
router.get("/api/auth/google/callback", googleCallback);
router.get("/api/auth/profile", getProfile);
router.get("/logout", logout);

module.exports = router;
