//Dependencies
import { useState } from "react";
import { useAuth } from "../../../context/useAuth";
import EmojiPicker from "emoji-picker-react";
import {
  formatDistanceToNow,
  isToday,
  isYesterday,
  differenceInDays,
  format,
} from "date-fns";
//Hooks
import { usePosts, useComments } from "../../../hooks/posts/postsHooks";

//Styles
import "./index.css";

//Icons
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";

//Images
import FallbackImage from "../../../assets/images/fallbackprofile.jpg";

const formatPostDate = (timestamp) => {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (isYesterday(date)) {
    return `Yesterday at ${format(date, "HH:mm")}`;
  } else {
    return `${differenceInDays(new Date(), date)} days ago`;
  }
};

const FeedCenter = () => {
  const { user } = useAuth();
  const { posts, loading, error, createPost } = usePosts();
  const [newPostContent, setNewPostContent] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    createComment,
  } = useComments(selectedPostId);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [showCommentPicker, setShowCommentPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setNewPostContent((prev) => prev + emojiData.emoji);
  };

  const handleCommentEmojiClick = (emojiData) => {
    setNewCommentContent((prev) => prev + emojiData.emoji);
  };

  const handleCreatePost = () => {
    const authorId = user.id;
    createPost(authorId, newPostContent);
    setNewPostContent("");
  };

  const handleCreateComment = () => {
    const userId = user.id;
    createComment(userId, newCommentContent, selectedPostId);
    setNewCommentContent("");
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId((prevSelectedPostId) =>
      prevSelectedPostId === postId ? null : postId
    );
  };

  return (
    <div className="feed-body-center">
      <div className="feed-input-container">
        <textarea
          placeholder="What's on your mind?"
          value={newPostContent}
          onChange={(e) => {
            setNewPostContent(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          className="feed-textarea"
        />
        <div className="feed-input-buttons">
          <div className="extra-buttons">
            <div className="emoji-container">
              <button
                className="feed-open-emoji"
                onClick={() => setShowPicker(!showPicker)}
              >
                😀
              </button>
            </div>
            {showPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </div>
          <button className="feed-post-btn" onClick={handleCreatePost}>
            Post
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-picture-username">
              <img
                src={post.author.profilePicture}
                alt="Post author picture"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FallbackImage;
                }}
              />
              <div className="post-username-date">
                <p className="post-username">{post.author.username}</p>
                <p className="post-date">{formatPostDate(post.updatedAt)}</p>
              </div>
            </div>
            <div className="post-content-container">
              <p className="post-content">{post.content}</p>
            </div>
            <div className="post-options">
              <button className="post-option">
                <AiOutlineLike />
                <p>Like</p>
              </button>
              <button
                className="post-option"
                onClick={() => handleCommentClick(post.id)}
              >
                <FaRegComment />
                <p>Comment</p>
              </button>
            </div>
            <div className="comments-section">
              <button
                className="show-comments-btn"
                onClick={() => handleCommentClick(post.id)}
              >
                {post.comments.length} Comments
              </button>
              {selectedPostId === post.id && (
                <>
                  {commentsLoading && <p>Loading comments...</p>}
                  {commentsError && <p>Error: {commentsError}</p>}
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <p>{comment.content}</p>
                    </div>
                  ))}
                  <div className="comment-input-container">
                    <textarea
                      placeholder="Write a comment..."
                      value={newCommentContent}
                      onChange={(e) => setNewCommentContent(e.target.value)}
                      className="comment-textarea"
                    />
                    <div className="extra-buttons">
                      <div className="emoji-container">
                        <button
                          className="feed-open-emoji"
                          onClick={() =>
                            setShowCommentPicker(!showCommentPicker)
                          }
                        >
                          😀
                        </button>
                      </div>
                      {showCommentPicker && (
                        <EmojiPicker onEmojiClick={handleCommentEmojiClick} />
                      )}
                    </div>
                    <button onClick={handleCreateComment}>Post Comment</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedCenter;
