import React from "react";
import { useState } from "react";

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:4001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          console.log("allGood");
          loadUser(user);
          onRouteChange("home");
        } else {
          console.log("bad login");
        }
      });
  };

  return (
    <section className="br2 ba b--black-10 mv4 w-90 w-60-m w-30-l center shadow-5">
      <main className="pa4 black-80 w-100">
        <form className="measure center">
          <fieldset
            id="sign_up"
            className="ba b--transparent ph0 mh0"
          >
            <legend className="f1 fw6 ph0 mh0 tc">Sign In</legend>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="pa2 f7 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label
                className="db fw6 lh-copy f6"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="b f7 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="flex justify-center">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="button"
              value="Sign in"
              onClick={onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3 tc">
            <p
              onClick={() => {
                onRouteChange("register");
              }}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Signin;
