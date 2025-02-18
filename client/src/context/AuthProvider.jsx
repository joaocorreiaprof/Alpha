import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import authService from "../services/authService";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get("user");

    if (userParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        console.log("✅ AuthProvider - Parsed user from URL:", parsedUser);
        setUser(parsedUser);
        localStorage.setItem("user", JSON.stringify(parsedUser));
        window.history.replaceState({}, document.title, "/"); // Clear the URL parameter
      } catch (error) {
        console.error(
          "❌ AuthProvider - Failed to parse user from URL:",
          error
        );
      }
    } else if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log(
          "✅ AuthProvider - Parsed user from localStorage:",
          parsedUser
        );
        setUser(parsedUser);
      } catch (error) {
        console.error("❌ AuthProvider - Failed to parse user:", error);
        localStorage.removeItem("user");
      }
    } else {
      authService
        .getProfile()
        .then((data) => {
          if (data?.user) {
            console.log("Fetched user profile from server:", data.user);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        })
        .catch((error) => {
          console.error("❌ AuthProvider - Profile fetch error:", error);
        });
    }
  }, []);

  const loginWithGoogle = () => authService.loginWithGoogle();

  const login = (userData) => {
    if (userData) {
      setUser(userData);
      console.log("Logging in user:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.error("Login failed: userData is undefined");
    }
  };

  const logout = () => {
    authService.logout().then(() => {
      console.log("Logging out user");
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
