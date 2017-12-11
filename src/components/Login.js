import React, { Component } from 'react';
import '../styles/_Login.scss';
// import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="Login">
        <div className=" login container">
          <div className="returnlogin">return customer?</div>
          <div className="title">New Business Registration</div>


{/*This is the input boxes below this line*********************/}
          <p className='login label'>Business Name</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <p className='login label'>HomePage URL</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <p className='login label'>LOGO URL</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <p className='login label'>Admin First Name</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <p className='login label'>Admin Last Name</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <p className='login label'>birthday</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <p className='login label'>password</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <p className='login label'>email</p>
          <input className='input login' type="text" placeholder='Your businessName'/>

          <input type="submit" className='submitbutton' />
        </div>
      </div>
    );
  }
}

export default Login;
