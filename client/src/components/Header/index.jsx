//Style
import "./index.css";

//Icons
import { FcMindMap } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import { HiHome } from "react-icons/hi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";
import { SiMessenger } from "react-icons/si";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-icon-container">
          <FcMindMap className="header-icon" />
        </div>
        <div className="header-search">
          <CiSearch className="search-icon" />
          <span className="tooltip">Search</span>
          <input type="text" placeholder="Search people" />
        </div>
      </div>
      <div className="header-center">
        <div className="header-icon-container">
          <HiHome className="header-icon" />
          <span className="tooltip">Home</span>
        </div>
        <div className="header-icon-container">
          <MdOutlineOndemandVideo className="header-icon" />
          <span className="tooltip">Videos</span>
        </div>
        <div className="header-icon-container">
          <MdGroups2 className="header-icon" />
          <span className="tooltip">Groups</span>
        </div>
        <div className="header-icon-container">
          <FaGamepad className="header-icon" />
          <span className="tooltip">Games</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-icon-container">
          <SiMessenger className="header-icon" />
          <span className="tooltip">Messenger</span>
        </div>
        <div className="header-icon-container">
          <IoMdNotifications className="header-icon" />
          <span className="tooltip">Notifications</span>
        </div>
        <div className="header-icon-container">
          <CgProfile className="header-icon" />
          <span className="tooltip">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
