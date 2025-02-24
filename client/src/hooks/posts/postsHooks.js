import { useState, useEffect } from "react";
import postsService from "../../services/posts/postsService";

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postsService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async (authorId, content) => {
    try {
      setLoading(true);
      const newPost = await postsService.createPost(authorId, content);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (userId, postId) => {
    try {
      setLoading(true);
      await postsService.likePost(userId, postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.likes?.some((like) => like.userId === userId)
                  ? post.likes.filter((like) => like.userId !== userId)
                  : [...(post.likes || []), { userId }],
              }
            : post
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      await postsService.deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, createPost, likePost, deletePost };
};

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await postsService.displayAllComments(postId);
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const createComment = async (userId, content) => {
    try {
      setLoading(true);
      const newComment = await postsService.createComment(
        userId,
        content,
        postId
      );

      setComments((prevComments) => [newComment, ...prevComments]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { comments, loading, error, createComment };
};

export { usePosts, useComments };
