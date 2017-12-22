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
        // console.log(this.state)
        // this.props.setUserInfo(this.state);
        // this.props.history.push('/scheduler');
      }
    }
  }
  disableToggle(element, input) {
    var elem = document.getElementById(element);
    console.log(elem.attribute)
  }

  handleSubmit() {
    const profile = this.state;

    if (this.state.user_password) {
      if (this.state.user_email) {

        axios.post('/login', profile)
        .then((res)=>{
          if (res && res.data && res.data.user){

          this.props.setUserInfo(res.data.user);
          this.props.history.push('/scheduler');
          }
        })
        .catch((err)=>console.log(err, 'problem sending profile'))
      } else {
        alert('Please enter an email')
      }
    } else {
      alert('Please enter a password');
    }

  }

  // submitButtonActive();
  // if (this.state.abletologin) {
  //   this.props.setUserInfo(this.state);
  //   this.props.history.push('/scheduler');
  // }
  // console.log('error on submit')
  // }

  render() {
    // const disabledButtonToggle = ()=>{
    //   if (this.state.abletologin===true){
    //     document.getElementbyId("formSubmitButton") "disabled=true";
    //   } else {
    //     return "disabled=true";
    //   }
    
    // }
      

    return (
      <div className="Login">
        <div className=" login container">
          {/* <div className="returnlogin">return customer?</div>*/}
          <div className="title">New Business Registration</div>


          {/*This is the input boxes below this line*********************/}
          <p className='login label'>Business Name</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'businessname') }} className='input login' type="text" placeholder='' />

          <p className='login label'>HomePage URL</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'business_homepage_url') }} className='input login' type="text" placeholder='' />

          <p className='login label'>LOGO URL</p>
          <input onChange={(e) => { this.handleInputChange(e.target.value, 'business_logo_url') }} className='input login' type="text" placeholder='' />

          <div className="admininfo"><div id='admininfo'>Admin Info</div>

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
