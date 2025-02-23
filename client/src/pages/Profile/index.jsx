//Dependencies
import { useAuth } from "../../context/useAuth";

//Style
import "./index.css";

//Icons
import { FaUserEdit } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";

//Images
import BackgroundImage from "../../assets/images/background.jpg";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="profile-main-container">
      <div className="profile-header">
        <div className="profile-cover">
          <img
            src={BackgroundImage}
            alt="Profile cover images"
            className="profile-cover-img"
          />
        </div>
        <div className="profile-user">
          <div className="profile-user-left">
            <img
              src={user.profilePicture}
              alt="User profile picture"
              className="profile-user-profile-picture"
            />
            <div className="profile-user-name-friends">
              <p className="profile-user-username">{user.username}</p>
              <p>Friends</p>
              <p>display friends</p>
            </div>
          </div>
          <div className="profile-user-right">
            <button className="profile-pic-btn">
              <FaUserEdit />
              Change profile pic
            </button>
            <button className="cover-photo-btn">
              <RiEditBoxFill />
              Change cover photo
            </button>
          </div>
        </div>
      </div>
      <div className="profile-body"></div>
    </div>
  );
};
export default Profile;
