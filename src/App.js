import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Scheduler from './components/Scheduler';
import Login from './components/Login';
import Home from './components/Home';
import './styles/App.css';



class App extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  setUserInfo (user) {
    this.setState({user})
  }
  render() {
    return (
      <div className="App">
           <Switch>
                    <Route render={ props => <Scheduler {...props} user={this.state.user}/>} path="/scheduler" />
                    <Route render={ props => <Login {...props} setUserInfo={this.setUserInfo}/>} path="/login" />
                    <Route component={ Home } path="/" exact />                
                </Switch>            
      </div>
    );
  }
}

export default App;
