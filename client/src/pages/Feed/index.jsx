//Dependencies
import { useAuth } from "../../context/useAuth";

const Feed = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Feed;
