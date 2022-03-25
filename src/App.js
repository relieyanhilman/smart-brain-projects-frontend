import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrl from './components/ImageUrl/ImageUrl.js';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank.js';
import './App.css';
import 'tachyons'
import Particles from 'react-tsparticles';
import paramsParticles from './paramsParticles';
import React, {Component} from 'react';
import Clarifai from 'clarifai';

// const Clarifai = require('clarifai');
// const {ClarifyStub, grpc} = require("clarifai-nodejs-grpc");
 //You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: '7980cbf1b1234dd38f9ac35b3dcf3f09'
});
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
  }
  
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
            id: '',
            name: '',
            email: '',
            entries: '',
            joined: ''
      }
    }
  }
  LoadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: new Date()
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  // onButtonSubmit = () => {
  //   this.setState({imageUrl: this.state.input})
  //   const raw = JSON.stringify({
  //     "user_app_id": {
  //       "user_id": "mwp63eo7hy99",
  //       "app_id": "rely-supper-93"
  //     },
  //     "inputs": [
  //       {
  //         "data": {
  //           "image": {
  //             "url": this.state.input
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Authorization': 'Key 7980cbf1b1234dd38f9ac35b3dcf3f09'
  //     },
  //     body: raw
  //   };
  //   // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  //     // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  //     // this will default to the latest version_id

  //     fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs", requestOptions)
  //     .then(response => {
  //       if (response){
  //         fetch('http://localhost:3000/image', {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body : JSON.stringify({
  //             userId : this.state.user.id
  //           })
  //         }).then(result => result.json())
  //         .then(finalResult => {
  //           this.setState(Object.assign(this.state.user, {entries: finalResult}));
            
  //         })
  //       }
  //       return response.text() 
  //       })
  //     .then(result => JSON.parse(result, null, 2))
  //     .then(finalResult => this.displayFaceBox(this.calculateFacePosition(finalResult)))
  //     .catch(error => console.log('error', error));

  //     console.log(this.state.user.entries);
          
  //   }

  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
    // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    // so you would change from:
    // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    // to:
    // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('https://smart-brain-projects-relieyan.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFacePosition(response))
      })
      .catch(err => console.log(err));
  }


    calculateFacePosition = (data) => {
      const boundingBoxPosition = (data.outputs[0].data.regions[0].region_info.bounding_box);
      const imageElement = document.getElementById("imageID");
      const width = Number(imageElement.width);
      const height = Number(imageElement.height);
      return{
        topRow: boundingBoxPosition.top_row * height,
        leftCol: boundingBoxPosition.left_col * width,
        bottomRow: height - (boundingBoxPosition.bottom_row * height),
        rightCol: width - (boundingBoxPosition.right_col * width)
      }
    }
    displayFaceBox = (box) => {
      this.setState({box: box})
    }

    onRouteChange = (route) => {
      if (route === 'signin'){
        this.setState(initialState)
      }else if (route === 'home'){
        this.setState({isSignedIn: true})
      }else if (route === 'register'){
        this.setState({isSignedIn: false})
      }
      this.setState({route: route})
    }

  render() {
    const {imageUrl, box, route, isSignedIn} = this.state
    return (
      <div className="App">
        <Particles params={paramsParticles} className='particles' />
        <Navigation signedOutAfterClick={this.onRouteChange} isSignedIn={isSignedIn} />
        {this.state.route === 'home'
          ? 
            <div>
              
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageUrl 
                onInputChange={this.onInputChange} 
                onSubmit={this.onButtonSubmit}/>
              <ImageRecognition imageUrl={imageUrl} faceBox={box}/>
            </div>
          : (
            route === 'signin' 
            ?
              <Signin loadUser={this.LoadUser} signedAfterClick={this.onRouteChange}/>
            : <Register loadUser={this.LoadUser} RegisteredAfterClick={this.onRouteChange}/>

            ) 
    
        }
        
      </div>
    );
  }
}

export default App;
