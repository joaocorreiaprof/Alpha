//Styles
import "./index.css";
import { useEffect } from "react";

const Messenger = () => {
  useEffect(() => {
    window.open("https://binary-buzz-production.up.railway.app", "_blank");
  }, []);

  return (
    <div className="messenger-container">
      <h1>Opening Messenger in a new tab...</h1>
      <div className="messenger-info">
        <p>This Messenger app is currently a separate application.</p>
        <p>You will need to create a unique account for it.</p>
        <p>The app does not share content or information with Alpha.</p>
        <p>It is a separate app that belongs to the company.</p>
        <p>Thank you for your understanding.</p>
      </div>
    </div>
  );
};

export default Messenger;
