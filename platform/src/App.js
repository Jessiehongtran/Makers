import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';

// Component imports
import Ideas from './components/ideas';
import Join from './components/join';
import Create from './components/create';
import Nav from './components/navigation';
import Banner from './components/banner';

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
                  <Create {...props}/>
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
