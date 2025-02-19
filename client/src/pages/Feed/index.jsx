//Dependencies

//Components
import FeedLeft from "../../components/Feed/FeedLeft";
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
        <p>center content</p>
      </div>
      <div className="feed-right">
        <FeedRight />
      </div>
    </div>
  );
};

export default Feed;
