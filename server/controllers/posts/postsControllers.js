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

const createComment = async (req, res) => {
  const { userId, content, postId } = req.body;

  if (!userId || !content || !postId) {
    return res
      .status(400)
      .json({ error: "userId, content, and postId are required." });
  }

  try {
    // Cria o comentário e inclui os dados do usuário
    const newComment = await prisma.comment.create({
      data: {
        userId,
        content,
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profilePicture: true, // Inclui a profilePicture do usuário
          },
        },
      },
    });

    res.status(201).json(newComment); // Retorna o comentário com os dados do usuário
  } catch (error) {
    console.error("Error creating comment", error);
    res.status(500).send("An unexpected error occurred");
  }
};

const displayAllComments = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: "postId is required." });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: {
        user: true,
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

const likePost = async (req, res) => {
  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ error: "userId and postId are required." });
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return res.status(200).json({ message: "Like removed." });
    } else {
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return res.status(201).json(newLike);
    }
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

const getPostsByUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "userId is required." });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
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
    console.error("Error fetching posts by user:", error);
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  createComment,
  displayAllComments,
  likePost,
  getPostsByUser,
};
