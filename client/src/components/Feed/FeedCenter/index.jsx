//Dependecies
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";

//Hooks
import usePosts from "../../../hooks/posts/postsHooks";

//Styles
import "./index.css";

const FeedCenter = () => {
  const { user } = useAuth();
  const { posts, loading, error, createPost } = usePosts();
  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = () => {
    const authorId = user.id;
    createPost(authorId, newPostContent);
    setNewPostContent("");
  };

  return (
    <div className="feed-body-center">
      <p className="todo-center">Feed</p>
      <div className="feed-input-container">
        <input
          type="text"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleCreatePost}>Post</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedCenter;
