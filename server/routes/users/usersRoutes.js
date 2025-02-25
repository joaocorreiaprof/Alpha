require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  displayAllUsers,
  displayUserById,
  updateUserProfilePicture,
  updateUserBio,
} = require("../../controllers/users/usersControllers");

router.get("/all-users", displayAllUsers);
router.get("/:userId", displayUserById);
router.put(
  "/:userId/profile-picture",
  upload.single("profilePicture"),
  updateUserProfilePicture
);

router.put("/:userId/bio", updateUserBio);

module.exports = router;
