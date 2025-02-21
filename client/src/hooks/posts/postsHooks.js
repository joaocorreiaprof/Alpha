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

  return { posts, loading, error, createPost };
};

export default usePosts;
