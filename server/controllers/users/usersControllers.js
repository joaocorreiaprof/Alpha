const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Função para buscar todos os usuários
const displayAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

// Função para buscar um usuário pelo ID
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

module.exports = {
  displayAllUsers,
  displayUserById,
};
