import React from "react";

const Navigation = ({ onRouteChange, isSignIn }) => {
  if (isSignIn) {
    return (
      <nav className="flex justify-end">
        <a
          onClick={() => {
            onRouteChange("signout");
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign out
        </a>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end">
        <a
          onClick={() => {
            onRouteChange("signin");
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign in
        </a>
        <a
          onClick={() => {
            onRouteChange("register");
          }}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </a>
      </nav>
    );
  }
};

export default Navigation;
