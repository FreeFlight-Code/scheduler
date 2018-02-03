import React, { Component } from 'react';
import '../styles/_Scheduler.scss';
import BusinessForm from './BusinessForm';
import ClientForm from './ClientForm';

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
  if ( this.props && this.props.user && this.props.user.auth && this.props.user.email ) return true;
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
      //state is hard coded in to allow continued work, i will do an /auth/me query and take all the info off that, or maybe to a custom query...
      firstname: 'Davidtesting',
      password:'test123',
      uid:1,
      lastname: 'Fischer',
      birthday:'5-7-1977',
      comments: 'none',
      email: 'davidfisc@hotmailfake.com',
      businessname: 'The Testing Cafe',
      bid: 1,
      link: 'http://www.google.com',
      logo: 'https://www.independence.aero/files/images/artikelbilder/cruiser4.jpg',
      auth: '',
      results: [{ "jid": 1, "businessname": "Target", "firstname": "David", "lastname": "Fischer", "comments": "none", "city": "riverton", "state": "utah", "today": "2017-12-10T07:00:00.000Z", "jobdate": "2077-07-07T06:00:00.000Z", "bid": 1, "uid": 1 }, { "jid": 2, "businessname": "Target", "firstname": "David", "lastname": "Fischer", "comments": "none", "city": "riverton", "state": "utah", "today": "2017-12-10T07:00:00.000Z", "jobdate": "2077-07-07T06:00:00.000Z", "bid": 1, "uid": 1 }, { "jid": 3, "businessname": "smiths", "firstname": "rebecca", "lastname": "Fischer", "comments": "none", "city": "las vegas", "state": "utah", "today": "2017-12-10T07:00:00.000Z", "jobdate": "2077-07-07T06:00:00.000Z", "bid": 1, "uid": 1 }, { "jid": 4, "businessname": "galls", "firstname": "matt", "lastname": "Fischer", "comments": "none", "city": "las vegas", "state": "CA", "today": "2017-12-10T07:00:00.000Z", "jobdate": "2077-07-07T06:00:00.000Z", "bid": 1, "uid": 1 }, { "jid": 5, "businessname": "winco", "firstname": "matt", "lastname": "Fischer", "comments": "none", "city": "las vegas", "state": "CA", "today": "2017-12-10T07:00:00.000Z", "jobdate": "2077-07-07T06:00:00.000Z", "bid": 1, "uid": 1 }]
    }
  }
  componentWillMount() {
    // console.log(getUser())
    //overwrite all data on state with that on props
    //Check if  auth is being passed into state, if not 
    if (this.props && this.props.user && this.props.user.firstname | this.props.user.email) {

      //axios.get()  get all jobs for business off query and set this.state.results

    }
  }

  render() {
    const logout_button = _=>{
      if(logged_in())
      if (logged_in()){
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
