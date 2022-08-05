import React, { Component } from "react";
// import { render } from 'react-dom';
import "./Signin.css";
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onChangeEmail = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.signedAfterClick("home");
        }
      });
  };

  render() {
    const { signedAfterClick } = this.props;
    return (
      <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 tc">Sign In</legend>
                <div className="mt3">
                  <label
                    className="db fw6 lh-copy f6 tc"
                    htmlFor="email-address"
                  >
                    Email
                  </label>
                  <input
                    onChange={this.onChangeEmail}
                    className="pa2 ba b--black input-reset bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6 tc" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.onChangePassword}
                    className="b pa2 input-reset b--black ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>

              <div className="center">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  onClick={() => this.onSubmit()}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  className="pointer tc f6 link dim black db"
                  onClick={() => signedAfterClick("register")}
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Signin;
