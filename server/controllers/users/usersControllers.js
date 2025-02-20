const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const displayAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("An unexpected error occured");
  }
};

module.exports = {
  displayAllUsers,
};
