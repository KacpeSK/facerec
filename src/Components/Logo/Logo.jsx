import React from "react";
import Tilt from "../Tilt/Tilt";
import "./Logo.css";

const Logo = () => {
  const source = "/src/assets/brain_transparent.png";
  return (
    <div className="ma4 logo">
      <Tilt source={source} />
    </div>
  );
};

export default Logo;
