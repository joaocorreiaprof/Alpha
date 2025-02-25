// Dependencies
import { Link } from "react-router-dom";

// Hooks
import useUsers from "../../hooks/users/useUsers";
import { useAuth } from "../../context/useAuth";

// Styles
import "./index.css";

// Images
import FallbackImage from "../../assets/images/fallbackprofile.jpg";

const Users = () => {
  const { users, loading, error } = useUsers();
  const { user: currentLoggedUser } = useAuth(); //Destructure and rename `user` to `currentLoggedUser`. User already in use

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return console.log("Error fetching users", error.message);
  }

  // Filter out the current logged-in user
  const filteredUsers = users.filter(
    (user) => user.id !== currentLoggedUser.id
  );

  return (
    <div className="users-container">
      <p className="users-title">Users</p>
      <ul>
        {filteredUsers.map((user) => (
          <Link
            to={`/user-profile/${user.id}`}
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
