import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user info is already in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Fetch user profile from the server
      fetch("/api/auth/profile", { credentials: "include" })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        })
        .catch((err) => console.error("Profile Fetch Error:", err));
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const handleLogout = () => {
    fetch("/api/logout", { credentials: "include" })
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((err) => console.error("Logout Error:", err));
  };

  return (
    <div>
      <h1>React + Google Auth</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
