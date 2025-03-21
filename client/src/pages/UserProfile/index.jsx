// Dependencies
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import userProfileHooks from "../../hooks/userProfile/userProfileHooks";
import EmojiPicker from "emoji-picker-react";
import {
  formatDistanceToNow,
  isToday,
  isYesterday,
  differenceInDays,
  format,
} from "date-fns";

// Hooks
import {
  useFriendsCount,
  useGetAllFriends,
  useSendFriendRequest,
  useRemoveFriendship,
  useGetPendingRequests, // Import the hook
} from "../../hooks/friends/friendsHooks";
import { useUserPosts, useComments } from "../../hooks/posts/postsHooks";

// Images
import BackgroundImage from "../../assets/images/background.jpg";
import FallbackImage from "../../assets/images/fallbackprofile.jpg";

// Icons
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";

// Styles
import "./index.css";

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

const UserProfile = () => {
  const { id } = useParams();
  const { user: loggedInUser } = useAuth();
  const { user, loading, error } = userProfileHooks(id);
  const { count, isLoading } = useFriendsCount(user?.id);
  const { friends, isLoading: isFriendsLoading } = useGetAllFriends(user?.id);
  const { posts = [], likePost } = useUserPosts(user?.id);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const {
    comments = [],
    loading: commentsLoading,
    error: commentsError,
    createComment: createPostComment,
  } = useComments(selectedPostId);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [showCommentPicker, setShowCommentPicker] = useState(false);

  const areFriends = friends.some(
    (friend) =>
      friend.senderId === loggedInUser.id ||
      friend.receiverId === loggedInUser.id
  );

  const { sendRequest, isLoading: isSendingRequest } = useSendFriendRequest();
  const { pendingRequests } = useGetPendingRequests(loggedInUser.id);

  const isRequestPending = pendingRequests.some(
    (request) =>
      request.receiverId === user?.id || request.senderId === user?.id
  );

  const handleCommentEmojiClick = (emojiData) => {
    setNewCommentContent((prev) => prev + emojiData.emoji);
  };

  const handleCreateComment = async () => {
    const userId = loggedInUser.id;
    await createPostComment(userId, newCommentContent, selectedPostId);
    setNewCommentContent("");
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId((prevSelectedPostId) =>
      prevSelectedPostId === postId ? null : postId
    );
  };

  const handleLikeClick = async (postId) => {
    await likePost(postId, loggedInUser.id);
  };

  const handleSendFriendRequest = async () => {
    try {
      await sendRequest(loggedInUser.id, user.id);
      alert("Friend request sent!");
      window.location.reload();
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Failed to send friend request.");
    }
  };

  const { remove, isLoading: isRemovingFriend } = useRemoveFriendship();

  const handleRemoveFriendship = async () => {
    try {
      await remove(loggedInUser.id, user.id);
      alert("Friendship removed!");
      window.location.reload();
    } catch (error) {
      console.error("Error removing friendship:", error);
      alert("Failed to remove friendship.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="users-profile-container">
      <div className="users-profile-header">
        <div className="users-profile-cover">
          <img
            src={BackgroundImage}
            alt="Profile cover images"
            className="users-profile-cover-img"
          />
        </div>
        <div className="users-profile-user">
          <div className="users-profile-user-left">
            <img
              src={user.profilePicture}
              alt="User profile picture"
              className="users-profile-user-profile-picture"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FallbackImage;
              }}
            />
            <div className="users-profile-user-name-friends">
              <p className="users-profile-user-username">{user.username}</p>
              <p className="users-profile-display-number-friends">
                {isLoading ? "Loading..." : count} friends
              </p>
            </div>
          </div>
          <div className="users-profile-user-right">
            {areFriends ? (
              <button
                onClick={handleRemoveFriendship}
                disabled={isRemovingFriend}
                className="btn-remove-friend"
              >
                {isRemovingFriend ? "Removing..." : "Remove Friendship"}
              </button>
            ) : isRequestPending ? (
              <button className="btn-pending-friend" disabled>
                Pending to accept
              </button>
            ) : (
              <button
                onClick={handleSendFriendRequest}
                disabled={isSendingRequest}
                className="btn-add-friend"
              >
                {isSendingRequest ? "Sending..." : "Send friend request"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-body-left">
          <div className="body-bio">
            <p className="body-bio-title">Bio</p>
            <p className="body-bio-description">{user.bio}</p>
          </div>
          <div className="body-friends">
            <p className="body-friends-title">Friends</p>
            <p className="profile-display-number-friends">
              {isLoading ? "Loading..." : count} friends
            </p>
            {isFriendsLoading ? (
              <p>Loading friends...</p>
            ) : error ? (
              <p>Error fetching friends</p>
            ) : friends.length === 0 ? (
              <p>You have no friends yet</p>
            ) : (
              <div className="friends-list">
                {friends.map((friend) => {
                  const friendData =
                    friend.senderId === user.id
                      ? friend.receiver
                      : friend.sender;
                  if (!friendData) return null;
                  return (
                    <div
                      key={friendData.id}
                      className="body-friend-profile-item"
                    >
                      <img
                        src={friendData.profilePicture || FallbackImage}
                        alt={`${friendData.username}'s profile`}
                        className="body-friend-profile-picture"
                      />
                      <p className="body-friend-profile-username">
                        {friendData.username}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="profile-body-right">
          <div className="profile-body-user-posts">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
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
                      <p className="post-date">
                        {formatPostDate(post.updatedAt)}
                      </p>
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
                      {post.likes?.some(
                        (like) => like.userId === loggedInUser.id
                      ) ? (
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
                                src={
                                  comment.user?.profilePicture || FallbackImage
                                }
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
                            <p className="comment-user-content">
                              {comment.content}
                            </p>
                          </div>
                        ))}
                        <div className="comment-input-container">
                          <textarea
                            placeholder="Write a comment..."
                            value={newCommentContent}
                            onChange={(e) =>
                              setNewCommentContent(e.target.value)
                            }
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
                              <EmojiPicker
                                onEmojiClick={handleCommentEmojiClick}
                              />
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
