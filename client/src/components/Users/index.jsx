// Dependencies
import { Link } from "react-router-dom"; // Importe o Link

// Hooks
import useUsers from "../../hooks/users/useUsers";

// Styles
import "./index.css";

// Images
import FallbackImage from "../../assets/images/fallbackprofile.jpg";

const Users = () => {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log("Error fetching users", error.message);
  }

  return (
    <div className="users-container">
      <p className="users-title">Users</p>
      <ul>
        {users.map((user) => (
          <Link
            to={`/user-profile/${user.id}`} // Navega para a página do perfil do usuário
            key={user.id}
            className="users-user-container"
          >
            <img
              src={user.profilePicture}
              alt="User profile picture"
              className="users-user-profile-picture"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FallbackImage;
              }}
            />
            {user.username}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Users;
