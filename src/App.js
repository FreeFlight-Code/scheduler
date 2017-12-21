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
      // email: "",
      // password: "",
      // businessName: "",
      // business_id: "",
      // link: "",
      // logo: "",
      auth: {}
    }
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  setUserInfo (info) {
    console.log(info, 'state transfered to app');
    this.setState({
      auth: info
    })
  }
  // componentDidMount(){console.log(this.props, this.state, '...props and state in app')}
  render() {
    return (
      <div className="App">
           <Switch>
                    <Route render={ props => <Scheduler {...props} auth={this.state.auth}/>} path="/scheduler" />
                    <Route render={ props => <Login {...props} setUserInfo={this.setUserInfo}/>} path="/login" />
                    <Route component={ Home } path="/" exact />                
                </Switch>            
      </div>
    );
  }
}

export default App;
