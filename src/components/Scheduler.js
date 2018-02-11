import React, { Component } from 'react';
import '../styles/_Scheduler.scss';
import BusinessForm from './BusinessForm';
import ClientForm from './ClientForm';
// import axios from 'axios';

// const defaultUser = {
//       firstname: 'Defaultblahblah',
//       password:'test123blahblah',
//       uid:1,
//       lastname: 'FischerDefault',
//       birthday:'5-7-1977',
//       comments: 'none',
//       email: 'davidfisc@hotmailfake.com',
//       businessname: 'The Testing Cafe',
//       bid: 1,
//       link: 'http://www.google.com',
//       logo: 'https://www.independence.aero/files/images/artikelbilder/cruiser4.jpg',
//       auth: 'client'
// }

const logged_in = _ => {
  if (this.props && this.props.user && this.props.user.auth && this.props.user.email) return true;
  else return false;
}

// const getUser = _=>{

//     if (this.props && this.props.user && this.props.user.auth && this.props.user.email) {
//       console.log('user logged in')
//       return this.props.user}
//     else {
//      console.log('user not logged in default user initialized') 
//       return this.state;
//     }
// }

class Scheduler extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results:[],
      list:[]
    }
  }
  componentWillMount() {
    let userInfo = this.props.user;
    this.setState(userInfo)
    //overwrite all data on state with that on props
     if ( this.props.user &&this.props.user.auth) { 
       
     } else {this.props.history.push('/login');
      setTimeout(()=>{
        alert('login failure please try again')
      }, 1000)}
}

    render() {
      console.log(this.props, 'props')
      console.log(this.state, 'state')
      const logout_button = _ => {
        if (this.props && this.props.user)
          if (logged_in) {
            return (<a href='/auth/logout'><button id='logout_button'>log out</button></a>)
          }
          else return (<h1>Hello buttons</h1>)
      }
      return (

        <div className="Scheduler">
          <div className="schedulerHeader">
            <img className='image avatar scheduler' src={this.state.logo} alt="logo" />
            <div>
              Welcome {this.state.firstname}!
          </div>
            {logout_button()}
          </div>
          {this.state.auth === 'admin' ?

            < BusinessForm {...this.props} state={this.state} /> :
            < ClientForm {...this.props} state={this.state} />}
        </div>
      );
    }
  }

  export default Scheduler;
