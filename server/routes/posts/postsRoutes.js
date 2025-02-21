require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  createComment,
  displayAllComments,
} = require("../../controllers/posts/postsControllers");

//posts
router.post("/new-post", createPost);
router.get("/all-posts", getAllPosts);

//comments
router.post("/new-comment", createComment);
router.get("/all-comments/:postId", displayAllComments);

module.exports = router;
