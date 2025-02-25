//Dependencies
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useEffect } from "react";

//Components
import Login from "../../components/Login";

//Styles
import "./index.css";

//Icons & images
import { FaGithub } from "react-icons/fa";
import HomeImage from "../../assets/images/home.jpg";
import GoogleImage from "../../assets/images/google.png";

function Home() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User state updated:", user);
    }
  }, [user]);

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="homepage">
      {user ? (
        navigate("/feed")
      ) : (
        <div className="home">
          <div className="home-welcome">
            <div className="home-title-message">
              <p className="home-title">Alpha</p>
              <p className="home-message">
                Connect, share, and engage with the world around you.
              </p>
              <img
                src={HomeImage}
                alt="Digital world image"
                className="home-image"
              />
            </div>
            <div className="home-authentication">
              <div className="home-login">
                <Login />
              </div>
              <div className="home-login-google">
                <img
                  src={GoogleImage}
                  alt="Google image"
                  className="home-google-image"
                />
                <button onClick={loginWithGoogle}>
                  Login/Signup with Google
                </button>
              </div>
              <div className="home-signup">
                <button onClick={goToSignup}>Sign Up</button>
              </div>
            </div>
          </div>
          <div className="footer">
            <p>© {new Date().getFullYear()} Alpha. All rights reserved.</p>
            <a
              href="https://github.com/joaocorreiaprof/Alpha"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <FaGithub size={30} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
