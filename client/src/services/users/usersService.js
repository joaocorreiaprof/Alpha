const getAllUsers = async () => {
  try {
    const response = await fetch("/api/users/all-users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default getAllUsers;
