//Styles
import "./index.css";

//Components
import Users from "../../Users";

//Images
import Dog from "../../../assets/images/News/dog.png";
import LedZeppelins from "../../../assets/images/News/led.png";
import Porto from "../../../assets/images/News/porto.png";
import Dating from "../../../assets/images/News/dating.png";
import FallbackImage from "../../../assets/images/fallbackprofile.jpg";

const FeedRight = () => {
  return (
    <div className="feed-body-right">
      <div className="feed-body-right-sponsored">
        <p className="feed-body-right-sponsored-title">Sponsored</p>
        <a
          href="https://www.nytimes.com/2025/02/17/us/runaway-dog-scrim-new-orleans-hero.html"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsorship-link"
        >
          <div className="sponsorship">
            <img
              src={Dog}
              alt="Picture of a dog"
              className="sponsorship-image"
            />
            <div className="sponsorship-text">
              <p className="sponsorship-text-title">
                How a Runaway Dog Became a Hero for New Orleans
              </p>
              <p className="sponsorship-text-site">nytimes.com</p>
            </div>
          </div>
        </a>
        <a
          href="https://www.wsj.com/arts-culture/music/led-zeppelins-physical-graffiti-turns-50-c5bb7645?mod=music_news_article_pos2"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsorship-link"
        >
          <div className="sponsorship">
            <img
              src={LedZeppelins}
              alt="Picture of Led Zeppelins"
              className="sponsorship-image"
            />
            <div className="sponsorship-text">
              <p className="sponsorship-text-title">
                Led Zeppelin’s ‘Physical Graffiti’ Turns 50
              </p>
              <p className="sponsorship-text-site">wsj.com</p>
            </div>
          </div>
        </a>
        <a
          href="https://www.fcporto.pt/pt/noticias/20250219-pt-temos-que-ser-fortes-nos-duelos"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsorship-link"
        >
          <div className="sponsorship">
            <img
              src={Porto}
              alt="Picture of Porto coach"
              className="sponsorship-image"
            />
            <div className="sponsorship-text">
              <p className="sponsorship-text-title">
                Temos que ser fortes nos duelos
              </p>
              <p className="sponsorship-text-site">fcporto.pt</p>
            </div>
          </div>
        </a>
        <a
          href="https://www.theguardian.com/us-news/2025/feb/13/tinder-hinge-match-investigation"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsorship-link"
        >
          <div className="sponsorship">
            <img
              src={Dating}
              alt="Picture of a dating app"
              className="sponsorship-image"
            />
            <div className="sponsorship-text">
              <p className="sponsorship-text-title">
                How Tinder, Hinge and their corporate owner chose profits over
                safety
              </p>
              <p className="sponsorship-text-site">theguardian.com</p>
            </div>
          </div>
        </a>
      </div>
      <div className="feed-body-right-friends">
        <p className="todo-friends">Friends</p>
      </div>
      <div className="feed-body-right-users">
        <Users />
      </div>
    </div>
  );
};

export default FeedRight;
