const getAllPosts = async () => {
  try {
    const response = await fetch("/api/posts/all-posts");
    if (!response.ok) {
      throw new Error("Network response failded");
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

export default { getAllPosts, createPost };
