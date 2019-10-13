import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';

const app = new Clarifai.App({
  apiKey: '5e0726b1066a474f8944ceef9346b3f4'
 });

const ParticlesOptions = {
    particles:{
      number:{
        value:30,
        density:{
          enable: true,
          value_area: 800
        }
      }
    }
}

 class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn : false
    }
  }

  onInputChange = (event) =>{
    this.setState({
      input: event.target.value
    });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width-clarifaiFace.right_col * width,
      bottomRow : height-clarifaiFace.bottom_row * height
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box : box});
  }

  onButtonSubmit = (event) => {
    this.setState({
      imageUrl : this.state.input
    })
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
      response => this.displayFaceBox(this.calculateFaceLocation(response))
    )
    .catch(
      (err) => console.log(err)
    )
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false});
    }else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render(){
    const {isSignedIn,imageUrl,route,box} = this.state;
    return (
      <div className = "App">
        <Particles className ="particles"
        params = {ParticlesOptions}
        />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
        <Logo />
        { route === 'home'
        ? <div>
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box = {box} imageUrl = {imageUrl}/>
          </div>
        : (
          route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} /> 
          : <Register onRouteChange = {this.onRouteChange} />
        )
        }
      </div>
    );
  }
}

export default App;