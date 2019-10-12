import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';

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
      imageUrl: ''
    }
  }

  onInputChange = (event) =>{
    this.setState({
      input: event.target.value
    });
  }

  calculateFaceLocation = (data) => {

  }

  onButtonSubmit = (event) => {
    this.setState({
      imageUrl : this.state.input
    })
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
      function(response) {
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

      },
      function(err) {
        // there was an error
      }
    );
  }

  render(){
    return (
      <div className = "App">
        <Particles className ="particles"
        params = {ParticlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;