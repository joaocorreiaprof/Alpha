// Helper function to handle fetch responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong");
  }
  return response.json();
};

// Send a friend request
export const sendFriendRequest = async (senderId, receiverId) => {
  try {
    const response = await fetch(`/api/friends/send-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId, receiverId }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
};

// Accept a friend request
export const acceptFriendRequest = async (friendshipId) => {
  try {
    const response = await fetch(`/api/friends/accept-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendshipId }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
};

// Deny a friend request
export const denyFriendRequest = async (friendshipId) => {
  try {
    const response = await fetch(`/api/friends/deny-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendshipId }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error denying friend request:", error);
    throw error;
  }
};

// Get all friends of a user
export const getAllFriends = async (userId) => {
  try {
    const response = await fetch(`/api/friends/friends/${userId}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw error;
  }
};

// Get all users who are not friends with the current user
export const getNonFriends = async (userId) => {
  try {
    const response = await fetch(`/api/friends/non-friends/${userId}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching non-friends:", error);
    throw error;
  }
};

// Get all pending friend requests for a user
export const getPendingRequests = async (userId) => {
  try {
    const response = await fetch(`/api/friends/pending-requests/${userId}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error;
  }
};

// Remove a friendship
export const removeFriendship = async (userId1, userId2) => {
  try {
    const response = await fetch(`/api/friends/remove-friendship`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId1, userId2 }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error removing friendship:", error);
    throw error;
  }
};
