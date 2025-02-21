require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
} = require("../../controllers/posts/postsControllers");

router.post("/new-post", createPost);
router.get("/all-posts", getAllPosts);

module.exports = router;
