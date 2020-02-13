import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ideas from './components/ideas';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
        

    };
}

render(){
  var randomColor0 = Math.floor(Math.random()*16777215).toString(16);
  var randomColor1 = Math.floor(Math.random()*16777215).toString(16);
  var randomColor2 = Math.floor(Math.random()*16777215).toString(16);
  var randomColor3 = Math.floor(Math.random()*16777215).toString(16);
  var randomColor4 = Math.floor(Math.random()*16777215).toString(16);
  var randomColor5 = Math.floor(Math.random()*16777215).toString(16);
  var randomColor6 = Math.floor(Math.random()*16777215).toString(16);
  

  return (
    <div className="App">
      <h1><span style={{color: `#${randomColor0}`}}>#</span><span style={{color: `#${randomColor1}`}} >M</span><span style={{color: `#${randomColor2}`}} >a</span><span style={{color: `#${randomColor3}`}}>k</span><span style={{color: `#${randomColor4}`}}>e</span><span style={{color: `#${randomColor5}`}}>r</span><span style={{color: `#${randomColor6}`}}>s</span></h1>
      <p className="quote">"Eventually, it matters more <span style={{color: `red`}}>what you can do</span> than what what you know."</p>
      <p className="quote">Why not learning by doing?</p>
      <Ideas />
    </div>
  );
  }
}

export default App;
