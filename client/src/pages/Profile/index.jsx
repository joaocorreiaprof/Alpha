// Dependencies
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import EmojiPicker from "emoji-picker-react";
import {
  formatDistanceToNow,
  isToday,
  isYesterday,
  differenceInDays,
  format,
} from "date-fns";
import imageCompression from "browser-image-compression";
// Hooks
import { useUserPosts, useComments } from "../../hooks/posts/postsHooks";
import {
  useFriendsCount,
  useGetAllFriends,
} from "../../hooks/friends/friendsHooks";

// Styles
import "./index.css";

// Icons
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { FaTrashAlt, FaUserEdit, FaEdit } from "react-icons/fa";

// Images
import BackgroundImage from "../../assets/images/background.jpg";
import FallbackImage from "../../assets/images/fallbackprofile.jpg";

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

const Profile = () => {
  const { user, updateUserProfilePicture, updateUserBio } = useAuth();
  const { count, isLoading } = useFriendsCount(user?.id);
  const { friends, isLoading: isFriendsLoading } = useGetAllFriends(user?.id);
  const {
    posts = [],
    loading,
    error,
    createPost,
    likePost,
    deletePost,
  } = useUserPosts(user.id);
  const [newPostContent, setNewPostContent] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const {
    comments = [],
    loading: commentsLoading,
    error: commentsError,
    createComment: createPostComment,
  } = useComments(selectedPostId);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [showCommentPicker, setShowCommentPicker] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);

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
    await createPostComment(userId, newCommentContent, selectedPostId);
    setNewCommentContent("");
  };

  const handleCommentClick = (postId) => {
    setSelectedPostId((prevSelectedPostId) =>
      prevSelectedPostId === postId ? null : postId
    );
  };

  const handleLikeClick = async (postId) => {
    await likePost(postId, user.id);
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });

        console.log("Original file size:", file.size / 1024 / 1024, "MB");
        console.log(
          "Compressed file size:",
          compressedFile.size / 1024 / 1024,
          "MB"
        );

        const formData = new FormData();
        formData.append("profilePicture", compressedFile);

        setUpdating(true);
        setUpdateError(null);
        try {
          const response = await fetch(
            `/api/users/${user.id}/profile-picture`,
            {
              method: "PUT",
              body: formData,
            }
          );
          if (!response.ok) {
            throw new Error("Network response failed");
          }
          const updatedUser = await response.json();
          alert("Profile picture updated successfully!");
          // Update the user's profile picture in the context
          updateUserProfilePicture(updatedUser.profilePicture);
        } catch (error) {
          setUpdateError(error);
          alert("Failed to update profile picture.");
        } finally {
          setUpdating(false);
        }
      } catch (error) {
        console.error("Error compressing image:", error);
        alert("Failed to compress image.");
      }
    }
  };

  const handleBioEdit = () => {
    setEditingBio(true);
  };

  const handleBioSave = async () => {
    setUpdating(true);
    setUpdateError(null);
    try {
      const response = await fetch(`/api/users/${user.id}/bio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bio");
      }

      const updatedUser = await response.json();
      updateUserBio(updatedUser.bio); // Update the bio in the context
      setEditingBio(false);
      alert("Bio updated successfully!");
    } catch (error) {
      setUpdateError(error);
      alert("Failed to update bio.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="profile-main-container">
      <div className="profile-header">
        <div className="profile-cover">
          <img
            src={BackgroundImage}
            alt="Profile cover images"
            className="profile-cover-img"
          />
        </div>
        <div className="profile-user">
          <div className="profile-user-left">
            <img
              src={user.profilePicture}
              alt="User profile picture"
              className="profile-user-profile-picture"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FallbackImage;
              }}
            />
            <div className="profile-user-name-friends">
              <p className="profile-user-username">{user.username}</p>
              <p className="profile-display-number-friends">
                {isLoading ? "Loading..." : count} friends
              </p>
            </div>
          </div>
          <div className="profile-user-right">
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="profile-picture-input"
              onChange={handleProfilePictureChange}
            />
            <button
              className="profile-pic-btn"
              onClick={() =>
                document.getElementById("profile-picture-input").click()
              }
            >
              <FaUserEdit />
              Change profile pic
            </button>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-body-left">
          <div className="body-bio">
            <p className="body-bio-title">Bio</p>
            {editingBio ? (
              <>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  className="bio-textarea"
                />
                <button className="bio-save-btn" onClick={handleBioSave}>
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="body-bio-description">{user.bio}</p>
                <button className="bio-edit-btn" onClick={handleBioEdit}>
                  <FaEdit />
                  Edit
                </button>
              </>
            )}
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
          <div className="profile-body-input-post">
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
                  {showPicker && (
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  )}
                </div>
                <button className="feed-post-btn" onClick={handleCreatePost}>
                  Post
                </button>
              </div>
            </div>
          </div>
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

export default Profile;
