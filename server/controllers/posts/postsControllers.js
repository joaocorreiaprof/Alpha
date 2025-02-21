const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Create new post
const createPost = async (req, res) => {
  try {
    const { content, authorId } = req.body;

    if (!content || !authorId) {
      return res
        .status(400)
        .json({ error: "Content and authorId are required." });
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId,
      },
      include: {
        author: {
          select: { id: true, username: true, profilePicture: true },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post." });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, username: true, profilePicture: true },
        },
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
};

module.exports = { createPost, getAllPosts };
