//Dependencies
import { useAuth } from "../../context/useAuth";
import { Link } from "react-router-dom";

//Style
import "./index.css";

//Icons
import { CiSearch } from "react-icons/ci";
import { HiHome } from "react-icons/hi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { SiMessenger } from "react-icons/si";
import { IoMdNotifications } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";

//Images
import FallbackImage from "../../assets/images/fallbackprofile.jpg";
import AlphaIcon from "../../assets/alphaIcon.png";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/feed" className="header-icon-container">
          <img src={AlphaIcon} alt="Alpha icon" className="alpha-icon" />
        </Link>
        <div className="header-search">
          <CiSearch className="search-icon" />
          <span className="tooltip">Search</span>
          <input type="text" placeholder="Search people" />
        </div>
      </div>
      <div className="header-center">
        <Link to="/feed" className="header-icon-container">
          <HiHome className="header-icon" />
          <span className="tooltip">Home</span>
        </Link>
        <Link to="/videos" className="header-icon-container">
          <MdOutlineOndemandVideo className="header-icon" />
          <span className="tooltip">Videos</span>
        </Link>
        <Link to="/groups" className="header-icon-container">
          <MdGroups2 className="header-icon" />
          <span className="tooltip">Groups</span>
        </Link>
        <Link to="/games" className="header-icon-container">
          <FaGamepad className="header-icon" />
          <span className="tooltip">Games</span>
        </Link>
      </div>
      <div className="header-right">
        <Link to="/messenger" className="header-icon-container">
          <SiMessenger className="header-icon" />
          <span className="tooltip">Messenger</span>
        </Link>
        <div className="header-icon-container">
          <IoMdNotifications className="header-icon" />
          <span className="tooltip">Notifications</span>
        </div>
        <div className="header-icon-container">
          <button onClick={logout} className="header-logout-btn">
            <TbLogout2 className="header-icon" />
          </button>
          <span className="tooltip">Logout</span>
        </div>
        <Link to="/profile" className="header-icon-container">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="user-picture"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FallbackImage;
            }}
          />
          <span className="tooltip">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
