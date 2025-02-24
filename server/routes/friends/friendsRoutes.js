require("dotenv").config();
const express = require("express");
const router = express.Router();
const friendsController = require("../../controllers/friends/friendsControllers");

// Send a friend request
router.post("/send-request", friendsController.sendFriendRequest);

// Accept a friend request
router.post("/accept-request", friendsController.acceptFriendRequest);

// Deny a friend request
router.post("/deny-request", friendsController.denyFriendRequest);

// Get all friends of a user
router.get("/friends/:userId", friendsController.getAllFriends);

// Get all users who are not friends with the current user
router.get("/non-friends/:userId", friendsController.getNonFriends);

// Get all pending friend requests for a user
router.get("/pending-requests/:userId", friendsController.getPendingRequests);

module.exports = router;
