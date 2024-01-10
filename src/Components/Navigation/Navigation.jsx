import React from "react";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav className="flex justify-end">
      <a
        onClick={() => {
          onRouteChange("signin");
        }}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign out
      </a>
    </nav>
  );
};

export default Navigation;
