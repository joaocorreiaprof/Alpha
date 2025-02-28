const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Send a friend request
const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const friendship = await prisma.friendship.create({
      data: {
        senderId,
        receiverId,
        status: "PENDING",
      },
    });
    res.status(201).json(friendship);
  } catch (error) {
    res.status(400).json({ error: "Failed to send friend request" });
  }
};

// Accept a friend request
const acceptFriendRequest = async (req, res) => {
  const { friendshipId } = req.body;

  try {
    const updatedFriendship = await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: "ACCEPTED" },
    });
    res.status(200).json(updatedFriendship);
  } catch (error) {
    res.status(400).json({ error: "Failed to accept friend request" });
  }
};

// Deny a friend request
const denyFriendRequest = async (req, res) => {
  const { friendshipId } = req.body;

  try {
    const updatedFriendship = await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: "REJECTED" },
    });
    res.status(200).json(updatedFriendship);
  } catch (error) {
    res.status(400).json({ error: "Failed to deny friend request" });
  }
};

// Get all friends of a user
const getAllFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const friends = await prisma.friendship.findMany({
      where: {
        OR: [
          { senderId: userId, status: "ACCEPTED" },
          { receiverId: userId, status: "ACCEPTED" },
        ],
      },
      include: {
        sender: true,
        receiver: true,
      },
    });
    res.status(200).json(friends);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch friends" });
  }
};

// Get all users who are not friends with the current user
const getNonFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const allUsers = await prisma.user.findMany();
    const friends = await prisma.friendship.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    const friendIds = friends.map((f) =>
      f.senderId === userId ? f.receiverId : f.senderId
    );
    const nonFriends = allUsers.filter(
      (user) => user.id !== userId && !friendIds.includes(user.id)
    );

    res.status(200).json(nonFriends);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch non-friends" });
  }
};

const getPendingRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const pendingRequests = await prisma.friendship.findMany({
      where: {
        OR: [
          { receiverId: userId, status: "PENDING" },
          { senderId: userId, status: "PENDING" },
        ],
      },
      include: {
        sender: { select: { id: true, username: true, profilePicture: true } },
        receiver: {
          select: { id: true, username: true, profilePicture: true },
        },
      },
    });

    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch pending friend requests" });
  }
};

// Remove a friendship
const removeFriendship = async (req, res) => {
  const { userId1, userId2 } = req.body;

  try {
    const deletedFriendship = await prisma.friendship.deleteMany({
      where: {
        OR: [
          { senderId: userId1, receiverId: userId2, status: "ACCEPTED" },
          { senderId: userId2, receiverId: userId1, status: "ACCEPTED" },
        ],
      },
    });

    if (deletedFriendship.count === 0) {
      return res.status(404).json({ error: "Friendship not found" });
    }

    res.status(200).json({ message: "Friendship removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove friendship" });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  denyFriendRequest,
  getAllFriends,
  getNonFriends,
  getPendingRequests,
  removeFriendship,
};
