// Dependencies
import { useAuth } from "../../context/useAuth";

// Hooks
import { useGetAllFriends } from "../../hooks/friends/friendsHooks";

// Images
import FallbackImage from "../../assets/images/fallbackprofile.jpg";

// Styles
import "./index.css";

const Friends = () => {
  const { user } = useAuth();
  const {
    friends,
    isLoading: isFriendsLoading,
    error,
  } = useGetAllFriends(user?.id);

  return (
    <div className="friends-container">
      <p className="friends-title">Friends</p>
      <div className="feed-right-friends">
        {isFriendsLoading ? (
          <p>Loading friends...</p>
        ) : error ? (
          <p>Error fetching friends</p>
        ) : friends.length === 0 ? (
          <p>You have no friends yet</p>
        ) : (
          <div className="feed-friends-list">
            {friends.map((friend) => {
              const friendData =
                friend.senderId === user.id ? friend.receiver : friend.sender;
              if (!friendData) return null;
              return (
                <div key={friendData.id} className="feed-friend-item">
                  <img
                    src={friendData.profilePicture || FallbackImage}
                    alt={`${friendData.username}'s profile`}
                    className="friend-profile-picture"
                  />
                  <p>{friendData.username}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
