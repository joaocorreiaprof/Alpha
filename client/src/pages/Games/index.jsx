// Styles
import "./index.css";

// Images
import Battleship from "../../assets/images/Games/battleship.png";
import EtchASketch from "../../assets/images/Games/etchasketch.png";
import Find from "../../assets/images/Games/find.png";
import SaveDobby from "../../assets/images/Games/savedobby.png";
import Tictactoe from "../../assets/images/Games/tictactoe.png";

// Game Data
const gamesList = [
  {
    name: "Where's Waldo",
    image: Find,
    link: "https://where-s-waldo-a-photo-tagging-ap-production.up.railway.app/",
  },
  {
    name: "Battleship",
    image: Battleship,
    link: "https://joaocorreiaprof.github.io/Battleship/",
  },
  {
    name: "Tic Tac Toe",
    image: Tictactoe,
    link: "https://joaocorreiaprof.github.io/Project-Tic-Tac-Toe/",
  },
  {
    name: "Etch-a-Sketch",
    image: EtchASketch,
    link: "https://joaocorreiaprof.github.io/Etch-a-Sketch/",
  },
  {
    name: "Rock Paper Scissors",
    image: SaveDobby,
    link: "https://joaocorreiaprof.github.io/Project-Rock-Paper-Scissors/",
  },
];

const Games = () => {
  return (
    <div className="games-container">
      <h1 className="games-title">🎮 Play & Enjoy</h1>
      <div className="games-grid">
        {gamesList.map((game, index) => (
          <a
            key={index}
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="game-card"
          >
            <img src={game.image} alt={game.name} className="game-image" />
            <p className="game-name">{game.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Games;
