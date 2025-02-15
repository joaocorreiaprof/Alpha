const getProfile = async () => {
  try {
    const response = await fetch("/api/auth/profile", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch profile");
    return await response.json();
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return null;
  }
};

const loginWithGoogle = () => {
  window.location.href = "/api/auth/google";
};

const logout = async () => {
  try {
    await fetch("/api/logout", { credentials: "include" });
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

const signUp = async (userData) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    return await response.json();
  } catch (error) {
    console.error("Sign Up Error:", error);
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export default { getProfile, loginWithGoogle, logout, signUp, login };
