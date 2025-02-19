//Dependencies

//Components
import FeedLeft from "../../components/Feed/FeedLeft";
import FeedCenter from "../../components/Feed/FeedCenter";
import FeedRight from "../../components/Feed/FeedRight";

//Styles
import "./index.css";

const Feed = () => {
  return (
    <div className="feed-body">
      <div className="feed-left">
        <FeedLeft />
      </div>
      <div className="feed-center">
        <FeedCenter />
      </div>
      <div className="feed-right">
        <FeedRight />
      </div>
    </div>
  );
};

export default Feed;
