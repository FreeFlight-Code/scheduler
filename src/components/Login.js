import React, { Component } from 'react';
import '../styles/_Login.scss';
import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      abletologin: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.submitButtonActive = this.submitButtonActive.bind(this);
  }
  componentWillMount() {
    //checks to see if it should load a business logo and info on initial load

    if (!(this.props.location.pathname === '/login' | this.props.location.pathname === '/login/')) {
      let bid = this.props.location.pathname.split('/').pop();
      this.setState({
        bid: bid
      })
      axios.get('/api/singleBusiness/' + bid)
      .then((res) => {
        console.log(res, 'login.js res')
        let data = res.data[0];
        this.setState(data)
      })
      .catch(err => err)
    }
  }

//all data put into input fields is added to state
handleInputChange(e, str) {
  e = e.toLowerCase();
  this.setState({
    [str]: e
  })
  if (this.state.user_password) {
    if (this.state.user_email) {
      this.setState({
        abletologin: true,
      })
    }
  }
}
//not currently functioning
// disableToggle(element, input) {
//   var elem = document.getElementById(element);
//   console.log(elem.attribute)
// }
//sends data from state to /login--- requires name and email
handleSubmit() {
  let bid;
  const profile = this.state;
  // console.log(this.state.businessname, 'businessname state')
  if (!this.state.businessname) { 
    bid = this.state.bid;
  } else if (this.state.businessname) {
    bid = 9999;
  }

  if (this.state.user_password) {
    if (this.state.user_email) {
      // console.log(this.state)
      axios.post('login/' + bid, profile)
        .then((res) => {
          // console.log('front end login at submit', res)
          if (res && res.data && res.data.user) {

            this.props.setUserInfo(res.data.user);
            this.props.history.push('/scheduler');
          }
        })
        .catch((err) => console.log('problem sending profile', err))
    } else {
      alert('Please enter an email')
    }
  } else {
    alert('Please enter a password');
  }
}

render() {
  // console.log(this.state, 'state')

  //if no id is found in url business creation info is rendered
  const adminAndClientRender = () => {
    if (this.props.location.pathname === '/login' | this.props.location.pathname === '/login/') {
      return (
        <div>
          <div className="title">New Business Registration</div>
          <p className='login label'>Business Name</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'businessname') }} className='input login' type="text" placeholder='' />

          <p className='login label'>HomePage URL</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'business_homepage_url') }} className='input login' type="text" placeholder='' />

          <p className='login label'>LOGO URL</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'business_logo_url') }} className='input login' type="text" placeholder='' />
        </div>
      )
    } else {
      return (

        <img className='image avatar login' src={this.state.logo} alt="logo" />)
    }
  }
  return (

    <div className="Login">
      <div className=" login container">
        {adminAndClientRender()}

        <div className="admininfo"><div id='admininfo'>{!this.state ? 'Admin Info' : 'Register Here'}</div>

          <p className='login label'>First Name</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'user_firstname') }} className='input login' type="text" placeholder='' />

          <p className='login label'>Last Name</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'user_lastname') }} className='input login' type="text" placeholder='' />

          <p className='login label'>birthday</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'user_birthday') }} className='input login' type="text" placeholder='mm/dd/yyyy' />

          <p className='login label'>password</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'user_password') }} className='input login' type="text" placeholder='required to login' />

          <p className='login label'>email</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'user_email') }} className='input login' type="text" placeholder='required to login' />

          <input id="formSubmitButton" onClick={() => { this.handleSubmit() }} type="submit" className='submitbutton' />
        </div>
      </div>
    </div>
  );
}
}

export default Login;
