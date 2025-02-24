import { useState, useEffect } from "react";
import {
  sendFriendRequest,
  acceptFriendRequest,
  denyFriendRequest,
  getAllFriends,
  getNonFriends,
  getPendingRequests,
} from "../../services/friends/friendsService";

// Hook to send a friend request
export const useSendFriendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (senderId, receiverId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sendFriendRequest(senderId, receiverId);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { sendRequest, isLoading, error };
};

// Hook to accept a friend request
export const useAcceptFriendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const acceptRequest = async (friendshipId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await acceptFriendRequest(friendshipId);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { acceptRequest, isLoading, error };
};

// Hook to deny a friend request
export const useDenyFriendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const denyRequest = async (friendshipId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await denyFriendRequest(friendshipId);
      setIsLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  return { denyRequest, isLoading, error };
};

// Hook to fetch all friends of a user
export const useGetAllFriends = (userId) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAllFriends(userId);
        setFriends(response);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchFriends();
    }
  }, [userId]);

  return { friends, isLoading, error };
};

// Hook to fetch all users who are not friends with the current user
export const useGetNonFriends = (userId) => {
  const [nonFriends, setNonFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNonFriends = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getNonFriends(userId);
        setNonFriends(response);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchNonFriends();
    }
  }, [userId]);

  return { nonFriends, isLoading, error };
};

// Hook to fetch all pending friend requests for a user
export const useGetPendingRequests = (userId) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getPendingRequests(userId);
        setPendingRequests(response);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPendingRequests();
    }
  }, [userId]);

  return { pendingRequests, isLoading, error };
};
