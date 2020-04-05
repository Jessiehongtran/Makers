import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Ideas from './components/ideas';
import Join from './components/join';
import Create from './components/create';

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
      <Switch>
        <Route
          exact path="/" 
          render = {
            props => {
              return (
                <> 
                  <h1><span style={{color: `#${randomColor0}`}}>#</span><span style={{color: `#${randomColor1}`}} >M</span><span style={{color: `#${randomColor2}`}} >a</span><span style={{color: `#${randomColor3}`}}>k</span><span style={{color: `#${randomColor4}`}}>e</span><span style={{color: `#${randomColor5}`}}>r</span><span style={{color: `#${randomColor6}`}}>s</span></h1>
                  <p className="quote">"Eventually, it matters more <span style={{color: `red`}}>what you can do</span> than what what you know."</p>
                  <p className="quote">Why not learning by doing?</p>
                  <p className="note">This platform is created to connect people from all walks of life to make something meaningful together so hook up!</p>
                  <Ideas {...props}/>
                </>
              )}}
        />
        <Route
          exact path="/join" 
          render = {
            props => {
              return (
                <> 
                  <Join {...props}/>
                </>
              )}}
        />
        <Route
          exact path="/create" 
          render = {
            props => {
              return (
                <> 
                  <Create {...props}/>
                </>
              )}}
        />
      </Switch>
      
    </div>
  );
  }
}

export default App;
