import React from "react";

const Sigin = ({ onRouteChange }) => {
  return (
    <section className="br2 ba b--black-10 mv4 w-90 w-60-m w-30-l center">
      <main className="pa4 black-80 w-100">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 tc">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="email-address">
                Email
              </label>
              <input
                className="pa2 f7 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" for="password">
                Password
              </label>
              <input
                className="b f7 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="flex justify-center">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={() => {
                onRouteChange("home");
              }}
            />
          </div>
          <div className="lh-copy mt3 tc">
            <a href="#0" className="f6 link dim black db">
              Sign up
            </a>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Sigin;
