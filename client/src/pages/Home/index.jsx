import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function Home() {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>React + Google Auth</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username}</h2>{" "}
          {/* Display the username property */}
          <p>Email: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={loginWithGoogle}>LogIn / SignUp with Google</button>
          <button onClick={goToSignup}>Sign Up</button>
          <button onClick={goToLogin}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default Home;
