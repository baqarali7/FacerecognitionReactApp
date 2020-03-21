import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Registor from './components/Registor/Registor'
import ImageLink from './components/ImageLink/ImageLink'
import Rank from './components/Rank/Rank'

const app = new Clarifai.App({
  apiKey: '148ff05b3f244be58dc4ec3d30d6c25d'
 });

const ParticleOptions = {
  "particles": {
      number: {
          value: 300,
          density: {
            enable: true,
            value_area : 1000
  
        }
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
        }
      }
  }
}

class App extends Component {

  constructor () {
    super();
    this.state = {
      input: '',
      ImageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  CalculateFaceLocation = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height) 

    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  OnInputChange = (events) => {
    this.setState({input: events.target.value})
  }

  OnButtonSubmit = () =>{
    this.setState({ImageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.CalculateFaceLocation(response)))
    .catch (err => console.log(err));
  }

  OnRouteChange = (route) =>{
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route=== 'home') {
      this.setState({isSignedIn : true})
    }
    this.setState({route: route});
  }

  render(){

    const {isSignedIn, route, box, ImageUrl} = this.state;

    return (
      <div className="App">
        <Particles className = "Particle"
        params = {ParticleOptions}
        /> 
        <Navigation isSignedIn = {isSignedIn} OnRouteChange = {this.OnRouteChange}/>
        {
        route === 'home' ?
        <div>
        <Logo />
        <Rank />
        <ImageLink 
          OnInputChange={this.OnInputChange}
          OnButtonSubmit = {this.OnButtonSubmit}
        />
        <FaceRecognition box = {box} ImageUrl = {ImageUrl}/>
        </div>
        : (
          this.state.route === 'signin' ?
          <SignIn OnRouteChange = {this.OnRouteChange}/>
        : <Registor OnRouteChange = {this.OnRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
