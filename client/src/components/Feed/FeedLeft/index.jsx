//Dependencies
import { useAuth } from "../../../context/useAuth";
import { Link } from "react-router-dom";

//Icons
import { BsFillPeopleFill } from "react-icons/bs";
import { FcConferenceCall } from "react-icons/fc";
import { FaGamepad } from "react-icons/fa6";
import { FcSms } from "react-icons/fc";

//Styles
import "./index.css";

//Images
import MilesInMiles from "../../../assets/images/products/miles.png";
import FileUploader from "../../../assets/images/products/uploader.png";
import BookMinder from "../../../assets/images/products/book.png";
import Freaky from "../../../assets/images/products/freaky.png";
import FallbackImage from "../../../assets/images/fallbackprofile.jpg";

const FeedLeft = () => {
  const { user } = useAuth();
  return (
    <div className="feed-body-left">
      <div className="feed-body-left-pages">
        <Link to="/profile" className="feed-body-left-page">
          <button className="feed-body-left-page-btn">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="feed-user-picture"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FallbackImage;
              }}
            />
            <p>{user.username}</p>
          </button>
        </Link>
        <Link to="/friends" className="feed-body-left-page">
          <button className="feed-body-left-page-btn">
            <BsFillPeopleFill className="feed-icon-btn" />
            <p>Friends</p>
          </button>
        </Link>
        <Link to="/groups" className="feed-body-left-page">
          <button className="feed-body-left-page-btn">
            <FcConferenceCall className="feed-icon-btn" />
            <p>Groups</p>
          </button>
        </Link>
        <Link to="/games" className="feed-body-left-page">
          <button className="feed-body-left-page-btn">
            <FaGamepad className="feed-icon-btn" />
            <p>Games</p>
          </button>
        </Link>
        <Link to="/messenger" className="feed-body-left-page">
          <button className="feed-body-left-page-btn">
            <FcSms className="feed-icon-btn" />
            <p>Messenger</p>
          </button>
        </Link>
      </div>
      <div className="feed-body-left-companies">
        <p className="feed-body-left-companies-title">Featured Products</p>
        <a
          href="https://blog-api-production-3f1e.up.railway.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="feed-body-left-company-link"
        >
          <div className="feed-body-left-company-div">
            <img
              src={MilesInMiles}
              alt="Miles in Mind Project"
              className="feed-body-left-company-picture"
            />
            <div className="feed-body-left-company-text">
              <p className="company-name">Miles in Mind</p>
              <p className="company-description">Insightful blog content</p>
            </div>
          </div>
        </a>
        <a
          href="https://file-uploader-production-1ba7.up.railway.app/log-in"
          target="_blank"
          rel="noopener noreferrer"
          className="feed-body-left-company-link"
        >
          <div className="feed-body-left-company-div">
            <img
              src={FileUploader}
              alt="Miles in Mind Project"
              className="feed-body-left-company-picture"
            />
            <div className="feed-body-left-company-text">
              <p className="company-name">File Uploader</p>
              <p className="company-description">
                Fast file upload/download tool
              </p>
            </div>
          </div>
        </a>
        <a
          href="https://inventory-application-production-3863.up.railway.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="feed-body-left-company-link"
        >
          <div className="feed-body-left-company-div">
            <img
              src={BookMinder}
              alt="Miles in Mind Project"
              className="feed-body-left-company-picture"
            />
            <div className="feed-body-left-company-text">
              <p className="company-name">Book Minder</p>
              <p className="company-description">Track your book collection</p>
            </div>
          </div>
        </a>
        <a
          href="https://getfreaky.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="feed-body-left-company-link"
        >
          <div className="feed-body-left-company-div">
            <img
              src={Freaky}
              alt="Miles in Mind Project"
              className="feed-body-left-company-picture"
            />
            <div className="feed-body-left-company-text">
              <p className="company-name">Freaky</p>
              <p className="company-description">
                Trendy clothing & accessories
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default FeedLeft;
