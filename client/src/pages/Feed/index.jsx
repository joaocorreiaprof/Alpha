//Dependencies
import { useAuth } from "../../context/useAuth";

//Components
import Header from "../../components/Header";

//Styles
import "./index.css";

const Feed = () => {
  const { user, logout } = useAuth();
  return (
    <div className="feed">
      <div className="feed-header">
        <Header />
      </div>
      <div className="user-info">
        <h2>Welcome, {user.username}</h2>
        <p>Email: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Feed;
