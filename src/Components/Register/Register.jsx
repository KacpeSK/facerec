import React from "react";
import { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitRegister = () => {
    console.log(name, email, password);
    fetch("http://localhost:4001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      })
      .catch((error) => {
        console.log("Ups");
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
            <legend className="f1 fw6 ph0 mh0 tc">Register</legend>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="pa2 f7 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
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
              value="Register"
              onClick={onSubmitRegister}
            />
          </div>
        </form>
      </main>
    </section>
  );
};

export default Register;
