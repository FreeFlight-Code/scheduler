import React, { Component } from 'react';
import '../styles/_Scheduler.scss';
import BusinessForm from './BusinessForm';
import ClientForm from './ClientForm';
// import axios from 'axios';

class Scheduler extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="Scheduler">
        <div className="schedulerHeader">
        <img className='image avatar scheduler' src={this.props.auth.logo}
      alt="logo" />
          <div>
            Welcome {this.props.auth.firstname ? this.props.auth.firstname : this.props.auth.email}!
          </div>
          <a href='/auth/logout'><button className='logout_button'>log out</button></a>
        </div>
        {this.props.auth.auth === 'admin' ?

            < BusinessForm {...this.props} results={this.state.results} /> :
            < ClientForm {...this.props} results={this.state.results} />}
      </div>
    );
  }
}

export default Scheduler;
