const getAllPosts = async () => {
  try {
    const response = await fetch("/api/posts/all-posts");
    if (!response.ok) {
      throw new Error("Network response failed");
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw error;
  }
};

const createPost = async (authorId, content) => {
  try {
    const response = await fetch("/api/posts/new-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId, content }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

const createComment = async (userId, content, postId) => {
  try {
    const response = await fetch("/api/posts/new-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, content, postId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create comment");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating comment", error);
    throw error;
  }
};

const displayAllComments = async (postId) => {
  try {
    const response = await fetch(`/api/posts/all-comments/${postId}`);
    if (!response.ok) {
      throw new Error("Network response failed");
    }
    const comments = await response.json();
    return comments;
  } catch (error) {
    console.error("Error fetching comments", error);
    throw error;
  }
};

const likePost = async (userId, postId) => {
  try {
    const response = await fetch("/api/posts/like-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, postId }),
    });

    if (!response.ok) {
      throw new Error("Failed to like/unlike post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    throw error;
  }
};

export default {
  getAllPosts,
  createPost,
  createComment,
  displayAllComments,
  likePost,
};
