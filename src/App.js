import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Registor from './components/Registor/Registor'
import ImageLink from './components/ImageLink/ImageLink'
import Rank from './components/Rank/Rank'


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

const initialState = {
  input: '',
  ImageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    'id' : '',
    'name' : '',
    'Hobbies' : '',
    'passion' : '',
    'date' : '',
    'email' : '',
    'entries' : '0'
  }
}
class App extends Component {

  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({user : {
      'id' : data.id,
      'name' : data.name,
      'Hobbies' : data.Hobbies,
      'passion' : data.passion,
      'date' : data.date,
      'email' : data.email,
      'entries' : data.entries
    }
    })
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
    fetch("https://blooming-fortress-28783.herokuapp.com/imageUrl", {
            method: 'post',
            headers : {'Content-type':'application/json'},
            body: JSON.stringify({
                input : this.state.input
            })
            })
            .then(responce => responce.json())
            .then(response => {
              if(response) {
                fetch("https://blooming-fortress-28783.herokuapp.com/image", {
                    method: 'put',
                    headers : {'Content-type':'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                    }).then(responce => responce.json())
                      .then(count => {
                      this.setState(Object.assign(this.state.user, {entries: count}))
                })
      }
    this.displayFaceBox(this.CalculateFaceLocation(response))
    })
    .catch (err => console.log(err));
  }

  OnRouteChange = (route) =>{
    if(route === 'signout') {
      this.setState(initialState)
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
        <Rank name = {this.state.user.name} entries = {this.state.user.entries} id = {this.state.user.id}/>
        <ImageLink 
          OnInputChange={this.OnInputChange}
          OnButtonSubmit = {this.OnButtonSubmit}
        />
        <FaceRecognition box = {box} ImageUrl = {ImageUrl}/>
        </div>
        : (
          this.state.route === 'signin' ?
          <SignIn loadUser = {this.loadUser} OnRouteChange = {this.OnRouteChange}/>
        : <Registor loadUser = {this.loadUser} OnRouteChange = {this.OnRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
