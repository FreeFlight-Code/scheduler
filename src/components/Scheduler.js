import React, { Component } from 'react';
import '../styles/_Scheduler.scss';
import BusinessForm from './BusinessForm';
import ClientForm from './ClientForm';
import axios from 'axios';

class Scheduler extends Component {
  constructor(props){
    super(props)
    this.state = ({
      email: this.props.auth.email,
      businessName: this.props.auth.businessName,
      business_id: this.props.auth.business_id,
      link: this.props.auth.link,
      logo: this.props.auth.logo,
      auth: this.props.auth.auth
    })
    // this.props.user = this.state;
  }
  


  componentWillMount(){
    axios.get('http://localhost:3030/sessionAuth').then((res) => {
      console.log(res, 'req.session on scheduler')
    })
    // console.log (this.state, 'state on scheduler')
    // console.log(this.props.auth, 'props.auth')

  }

  render() {
    return (
      <div className="Scheduler">
        <div className="schedulerHeader">
          Welcome {this.state.email}{this.state.auth}!
        <a href='/auth/logout'>
            <button className='logout_button'>log out</button>
          </a>
        </div>
      { this.state.auth === 'business' ?
          < BusinessForm {...this.props} /> :
          < ClientForm {...this.props} /> } 
           


         
      </div>
    );
  }
}

export default Scheduler;
