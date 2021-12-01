import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

// Component imports
import Ideas from './components/ideas';
import Join from './components/join2';
import Create from './components/create2';
import Nav from './components/navigation';
import Banner from './components/banner';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Mine from './components/yourProject';
import Categories from './components/categories';

// Material-UI imports
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
     
    };
}

render(){

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Switch>
        <Route
          exact path="/" 
          render = {
            props => {
              return (
                <> 
                  <Nav {...props} />
                  <Banner {...props}/>
                  <Ideas {...props}/>
                </>
              )}}
        />
        <Route
          exact path="/signup" 
          render = {
            props => {
              return (
                <> 
                  <SignUp {...props} />
                </>
              )}}
        />
        <Route
          exact path="/signin" 
          render = {
            props => {
              return (
                <> 
                  <SignIn {...props} />
                </>
              )}}
        />
        <Route
          exact path="/join" 
          render = {
            props => {
              return (
                <> 
                  <Nav {...props} />
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
                  <Nav {...props} />
                  <Create {...props}/>
                </>
              )}}
        />
        <Route
          exact path="/categories" 
          render = {
            props => {
              return (
                <> 
                  <Nav {...props} />
                  <Categories {...props}/>
                </>
              )}}
        />
        <Route
          exact path="/myprojects" 
          render = {
            props => {
              return (
                <> 
                  <Nav {...props} />
                  <Mine {...props}/>
                </>
              )}}
        />
      </Switch>
      
    </div>
    </ThemeProvider>
  );
  }
}

export default App;
