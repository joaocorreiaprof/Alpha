//Hooks
import useUsers from "../../hooks/users/useUsers";

//Styles
import "./index.css";

//Images
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
          <div className="users-user-container" key={user.id}>
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
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Users;
