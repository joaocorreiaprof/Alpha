//Dependencies
import { useState } from "react";

//Context
import { useAuth } from "../../context/useAuth";

//Hooks
import {
  useGetPendingRequests,
  useAcceptFriendRequest,
  useDenyFriendRequest,
  useSendFriendRequest,
  useGetNonFriends,
} from "../../hooks/friends/friendsHooks";

//Styles
import "./index.css";

//Images
import FallbackImage from "../../assets/images/fallbackprofile.jpg";
import FriendsImage from "../../assets/images/friends.png";

const Friends = () => {
  const { user } = useAuth();
  const { pendingRequests, isLoading, error } = useGetPendingRequests(user?.id);
  const { acceptRequest, isLoading: isAccepting } = useAcceptFriendRequest();
  const { denyRequest, isLoading: isDenying } = useDenyFriendRequest();
  const [actionLoading, setActionLoading] = useState(null);

  const {
    nonFriends,
    isLoading: isNonFriendsLoading,
    error: nonFriendsError,
  } = useGetNonFriends(user?.id);
  const { sendRequest, isLoading: isSendingRequest } = useSendFriendRequest();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleAccept = async (friendshipId) => {
    setActionLoading(friendshipId);
    await acceptRequest(friendshipId);
    setActionLoading(null);
    window.location.reload();
  };

  const handleDeny = async (friendshipId) => {
    setActionLoading(friendshipId);
    await denyRequest(friendshipId);
    setActionLoading(null);
    window.location.reload();
  };

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

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setScrollPosition((prev) =>
      Math.min(prev + 1, Math.ceil(nonFriends.length / 4) - 1)
    );
  };

  return (
    <div className="friends-page-container">
      <div className="friends-page-container-left">
        <p className="friends-page-container-title">Pending friends requests</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching requests</p>
        ) : pendingRequests.length === 0 ? (
          <p>No pending friend requests</p>
        ) : (
          <div className="all-pending-container">
            {pendingRequests.map((request) => (
              <div key={request.id} className="pending-user">
                <img
                  src={request.sender?.profilePicture}
                  alt="Requested user profile picture"
                  className="request-user-picture"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FallbackImage;
                  }}
                />
                <p className="friends-page-username-request">
                  {request.sender?.username}
                </p>
                <button
                  className="receive-friend-request-accept-btn"
                  onClick={() => handleAccept(request.id)}
                  disabled={isAccepting || actionLoading === request.id}
                >
                  {actionLoading === request.id && isAccepting
                    ? "Accepting..."
                    : "Confirm"}
                </button>
                <button
                  className="receive-friend-request-denied-btn"
                  onClick={() => handleDeny(request.id)}
                  disabled={isDenying || actionLoading === request.id}
                >
                  {actionLoading === request.id && isDenying
                    ? "Denying..."
                    : "Remove"}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="friends-people-you-may-know-container">
          <h3>People You May Know</h3>
          {isNonFriendsLoading && <p>Loading non-friends...</p>}
          {nonFriendsError && <p>Error: {nonFriendsError}</p>}
          <div className="friends-people-you-may-know">
            {nonFriends.length > 0 ? (
              <>
                {scrollPosition > 0 && (
                  <button
                    className="friends-carousel-button left"
                    onClick={scrollLeft}
                  >
                    &lt;
                  </button>
                )}
                {nonFriends
                  .slice(scrollPosition * 4, (scrollPosition + 1) * 4)
                  .map((nonFriend) => (
                    <div key={nonFriend.id} className="friends-non-friend-item">
                      <img
                        src={nonFriend.profilePicture || FallbackImage}
                        alt={nonFriend.username}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = FallbackImage;
                        }}
                        className="friends-non-friend-profile-picture"
                      />
                      <div className="friends-non-friend-details">
                        <p className="friends-non-friend-username">
                          {nonFriend.username}
                        </p>
                        <button
                          className="friends-send-friend-request-btn"
                          onClick={() => handleSendFriendRequest(nonFriend.id)}
                          disabled={isSendingRequest}
                        >
                          {isSendingRequest ? "Sending..." : "Add friend"}
                        </button>
                      </div>
                    </div>
                  ))}
                {scrollPosition < Math.ceil(nonFriends.length / 4) - 1 && (
                  <button
                    className="friends-carousel-button right"
                    onClick={scrollRight}
                  >
                    &gt;
                  </button>
                )}
              </>
            ) : (
              <p>No non-friends to display.</p>
            )}
          </div>
        </div>
      </div>
      <div className="friends-page-container-right">
        <img src={FriendsImage} alt="Friends image" />
        <p className="friends-phrase">Laughter is louder with good company!</p>
      </div>
    </div>
  );
};

export default Friends;
