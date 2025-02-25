// Dependencies
import { useParams } from "react-router-dom";
import userProfileHooks from "../../hooks/userProfile/userProfileHooks";

//Hooks
import { useFriendsCount } from "../../hooks/friends/friendsHooks";

//Images
import BackgroundImage from "../../assets/images/background.jpg";
import FallbackImage from "../../assets/images/fallbackprofile.jpg";

//Styles
import "./index.css";

const UserProfile = () => {
  const { id } = useParams(); // Captura o `id` da URL
  const { user, loading, error } = userProfileHooks(id); // Busca os dados do usuário
  const { count, isLoading } = useFriendsCount(user?.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="users-profile-container">
      <div className="users-profile-header">
        <div className="users-profile-cover">
          <img
            src={BackgroundImage}
            alt="Profile cover images"
            className="users-profile-cover-img"
          />
        </div>
        <div className="users-profile-user">
          <div className="users-profile-user-left">
            <img
              src={user.profilePicture}
              alt="User profile picture"
              className="users-profile-user-profile-picture"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FallbackImage;
              }}
            />
            <div className="users-profile-user-name-friends">
              <p className="users-profile-user-username">{user.username}</p>
              <p className="users-profile-display-number-friends">
                {isLoading ? "Loading..." : count} friends
              </p>
            </div>
          </div>
          <div className="users-profile-user-right">
            <button>TO add user as friend</button>
          </div>
        </div>
      </div>
      <div className="user-profile-bio">
        <h2>Bio</h2>
        <p>{user.bio || "No bio available."}</p>
      </div>
    </div>
  );
};

export default UserProfile;
