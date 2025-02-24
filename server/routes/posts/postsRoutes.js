require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  createComment,
  displayAllComments,
  likePost,
  getPostsByUser,
} = require("../../controllers/posts/postsControllers");

//posts
router.post("/new-post", createPost);
router.get("/all-posts", getAllPosts);
router.get("/user-posts/:userId", getPostsByUser);

//comments
router.post("/new-comment", createComment);
router.get("/all-comments/:postId", displayAllComments);

//likes
router.post("/like-post", likePost);

module.exports = router;
