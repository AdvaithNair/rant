import React from "react";
import { Link } from "react-router-dom";

// Logo
import RantLogo from "../assets/images/RantLogoTransparent.png";

// Material UI
import Button from "@material-ui/core/Button";

export const Landing: React.FC = () => {
  return (
    <div style={{ display: "block" }}>
      <div className="background-image"></div>
      <div className="landing-content">
        <img src={RantLogo} className="landing-logo" alt="Rant Logo"></img>
        <div className="landing-button" style={{ backgroundColor: "#F012BE" }}>
          <Button
            component={Link}
            to="/signup"
            style={{
              fontSize: window.innerWidth > 300 ? "25px" : "15px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: 550
            }}
            fullWidth
          >
            Sign Up
          </Button>
        </div>
        <div className="landing-button" style={{ backgroundColor: "#39CCCC" }}>
          <Button
            component={Link}
            to="/login"
            style={{
              fontSize: window.innerWidth > 300 ? "25px" : "15px",
              color: "white",
              fontFamily: "Montserrat",
              fontWeight: 550
            }}
            fullWidth
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
