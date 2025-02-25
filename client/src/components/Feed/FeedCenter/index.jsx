// Dependencies
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
// Hooks
import { usePosts, useComments } from "../../../hooks/posts/postsHooks";
import {
  useSendFriendRequest,
  useGetNonFriends,
} from "../../../hooks/friends/friendsHooks";

// Styles
import "./index.css";

// Icons
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

// Images
import FallbackImage from "../../../assets/images/fallbackprofile.jpg";

const formatPostDate = (timestamp) => {
  if (!timestamp) return "Just now";
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
  const { posts = [], loading, createPost, likePost, deletePost } = usePosts();
  const [newPostContent, setNewPostContent] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const {
    comments = [],
    loading: commentsLoading,
    error: commentsError,
    createComment,
  } = useComments(selectedPostId);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [showCommentPicker, setShowCommentPicker] = useState(false);

  // Fetch non-friends
  const {
    nonFriends,
    isLoading: isNonFriendsLoading,
    error: nonFriendsError,
  } = useGetNonFriends(user?.id);

  // Send friend request
  const { sendRequest, isLoading: isSendingRequest } = useSendFriendRequest();

  // Carousel state
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleSendFriendRequest = async (receiverId) => {
    try {
      await sendRequest(user.id, receiverId);
      alert("Friend request sent!");
      window.location.reload();
    } catch (error) {
      alert("Failed to send friend request.");
      console.log(error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewPostContent((prev) => prev + emojiData.emoji);
  };

  const handleCommentEmojiClick = (emojiData) => {
    setNewCommentContent((prev) => prev + emojiData.emoji);
  };

  const handleCreatePost = async () => {
    const authorId = user.id;
    await createPost(authorId, newPostContent);
    setNewPostContent("");
  };

  const handleCreateComment = async () => {
    const userId = user.id;
    await createComment(userId, newCommentContent, selectedPostId);
    setNewCommentContent("");
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId((prevSelectedPostId) =>
      prevSelectedPostId === postId ? null : postId
    );
  };

  const handleLikeClick = async (postId) => {
    await likePost(user.id, postId);
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
  };

  // Carousel scroll handlers
  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setScrollPosition((prev) =>
      Math.min(prev + 1, Math.ceil(nonFriends.length / 4) - 1)
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
      <div className="feed-friend-request-container">
        <h3>People You May Know</h3>
        {isNonFriendsLoading && <p>Loading non-friends...</p>}
        {nonFriendsError && <p>Error: {nonFriendsError}</p>}
        <div className="feed-friend-request">
          {nonFriends.length > 0 ? (
            <>
              {scrollPosition > 0 && (
                <button className="carousel-button left" onClick={scrollLeft}>
                  &lt;
                </button>
              )}
              {nonFriends
                .slice(scrollPosition * 4, (scrollPosition + 1) * 4)
                .map((nonFriend) => (
                  <div key={nonFriend.id} className="non-friend-item">
                    <img
                      src={nonFriend.profilePicture || FallbackImage}
                      alt={nonFriend.username}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FallbackImage;
                      }}
                      className="non-friend-profile-picture"
                    />
                    <div className="non-friend-details">
                      <p className="non-friend-username">
                        {nonFriend.username}
                      </p>
                      <button
                        className="send-friend-request-btn"
                        onClick={() => handleSendFriendRequest(nonFriend.id)}
                        disabled={isSendingRequest}
                      >
                        {isSendingRequest ? "Sending..." : "Add friend"}
                      </button>
                    </div>
                  </div>
                ))}
              {scrollPosition < Math.ceil(nonFriends.length / 4) - 1 && (
                <button className="carousel-button right" onClick={scrollRight}>
                  &gt;
                </button>
              )}
            </>
          ) : (
            <p>No non-friends to display.</p>
          )}
        </div>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-picture-username">
              <img
                src={post.author?.profilePicture || FallbackImage}
                alt="Post author picture"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FallbackImage;
                }}
              />
              <div className="post-username-date">
                <p className="post-username">{post.author?.username}</p>
                <p className="post-date">{formatPostDate(post.updatedAt)}</p>
              </div>
            </div>
            <div className="post-content-container">
              <p className="post-content">{post.content}</p>
            </div>
            <div className="comment-likes-comments">
              <div className="count-likes">
                <AiFillLike className="count-likes-icon" />
                <p>{post.likes?.length || 0}</p>
              </div>
              <button
                className="show-comments-btn"
                onClick={() => handleCommentClick(post.id)}
              >
                {post.comments?.length || 0} Comments{" "}
              </button>
            </div>
            <div className="post-options">
              <button
                className="post-option"
                onClick={() => handleLikeClick(post.id)}
              >
                {post.likes?.some((like) => like.userId === user.id) ? (
                  <AiFillLike className="like-icon-blue" />
                ) : (
                  <AiOutlineLike />
                )}
                <p>Like</p>
              </button>
              <button
                className="post-option"
                onClick={() => handleCommentClick(post.id)}
              >
                <FaRegComment />
                <p>Comment</p>
              </button>
              {post.authorId === user.id && (
                <button
                  className="post-option"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <FaTrashAlt />
                  <p>Delete</p>
                </button>
              )}
            </div>
            <div className="comments-section">
              {selectedPostId === post.id && (
                <>
                  {commentsLoading && <p>Loading comments...</p>}
                  {commentsError && <p>Error: {commentsError}</p>}
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-person-picture">
                        <img
                          src={comment.user?.profilePicture || FallbackImage}
                          alt="Profile picture of the user that commented"
                        />
                        <div className="comment-user-username-data">
                          <p className="comment-user-username">
                            {comment.user?.username}
                          </p>
                          <p className="post-date">
                            {formatPostDate(comment.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <p className="comment-user-content">{comment.content}</p>
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
                    <button
                      className="btn-post-comment"
                      onClick={handleCreateComment}
                    >
                      Comment
                    </button>
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
