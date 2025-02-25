const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cloudinary = require("../../config/cloudinaryConfig");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const displayAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

const displayUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

const updateUserProfilePicture = async (req, res) => {
  const { userId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(file.buffer);
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePicture: result.secure_url },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

const updateUserBio = async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { bio },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

module.exports = {
  displayAllUsers,
  displayUserById,
  updateUserProfilePicture,
  updateUserBio,
};
