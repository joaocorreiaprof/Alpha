//Dependencies
import { useState } from "react";

//Context
import { useAuth } from "../../context/useAuth";

//Hooks
import {
  useGetPendingRequests,
  useAcceptFriendRequest,
  useDenyFriendRequest,
} from "../../hooks/friends/friendsHooks";

//Styles
import "./index.css";

//Images
import FallbackImage from "../../assets/images/fallbackprofile.jpg";

const Friends = () => {
  const { user } = useAuth();
  const { pendingRequests, isLoading, error } = useGetPendingRequests(user?.id);
  const { acceptRequest, isLoading: isAccepting } = useAcceptFriendRequest();
  const { denyRequest, isLoading: isDenying } = useDenyFriendRequest();
  const [actionLoading, setActionLoading] = useState(null);

  const handleAccept = async (friendshipId) => {
    setActionLoading(friendshipId);
    await acceptRequest(friendshipId);
    setActionLoading(null);
  };

  const handleDeny = async (friendshipId) => {
    setActionLoading(friendshipId);
    await denyRequest(friendshipId);
    setActionLoading(null);
  };

  return (
    <div className="friends-page-container">
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
    </div>
  );
};

export default Friends;
