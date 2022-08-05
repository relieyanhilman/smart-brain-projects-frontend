import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageUrl from "./components/ImageUrl/ImageUrl.js";
import ImageRecognition from "./components/ImageRecognition/ImageRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank.js";
import "./App.css";
import "tachyons";
import Particles from "react-tsparticles";
import paramsParticles from "./paramsParticles";
import React, { Component } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY,
});

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: "",
        joined: "",
      },
    };
  }
  LoadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: new Date(),
      },
    });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          fetch(`${process.env.REACT_APP_API_URL}/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBox(this.calculateFacePosition(response));
      })
      .catch((err) => console.log(err));
  };

  calculateFacePosition = (data) => {
    const boundingBoxPosition =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageElement = document.getElementById("imageID");
    const width = Number(imageElement.width);
    const height = Number(imageElement.height);
    return {
      topRow: boundingBoxPosition.top_row * height,
      leftCol: boundingBoxPosition.left_col * width,
      bottomRow: height - boundingBoxPosition.bottom_row * height,
      rightCol: width - boundingBoxPosition.right_col * width,
    };
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "register") {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles params={paramsParticles} className="particles" />
        <Navigation
          signedOutAfterClick={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageUrl
              onInputChange={this.onInputChange}
              onSubmit={this.onButtonSubmit}
            />
            <ImageRecognition imageUrl={imageUrl} faceBox={box} />
          </div>
        ) : route === "signin" ? (
          <Signin
            loadUser={this.LoadUser}
            signedAfterClick={this.onRouteChange}
          />
        ) : (
          <Register
            loadUser={this.LoadUser}
            RegisteredAfterClick={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
