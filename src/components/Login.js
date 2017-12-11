import React, { Component } from 'react';
import '../styles/_Login.scss';
import axios from 'axios';
// import deflogo_login from '../images/def_logo.png';
class Login extends Component {

  componentWillMount() {
    let params = this.props.location.pathname.split('/').pop();
    if (params === 'Login' || params === 'login') { params = 1 }
    // console.log(params)
    axios.get('http://localhost:3030/api/business/' + params)
      .then((res) => {
        // console.log(res, 'component will mount');
        this.setState({
          businessName: res.data[0].business_name,
          link: res.data[0].redirect,
          logo: res.data[0].logo,
          business_id: res.data[0].id
        })
        // console.log(this.state, 'this.state...at login mount')
      })
  }

  constructor(props) {
    super(props)
    this.state = ({
      c_name: "",
      phone: "",
      email: "",
      password: "",
      businessName: "",
      business_id: "",
      link: "",
      logo: "",
      auth: "unset"
    })
    this.handlelogin = this.handlelogin.bind(this);
  }

  handlelogin() {
    if (!this.state.email || !this.state.password) alert('Must enter a email and password!!!')
    if (this.state.email && this.state.password) {
      axios.post(`http://localhost:3030/login`, {
        email: this.state.email,
        password: this.state.password,
        business_id: this.state.business_id
      }).then((result) => {
        console.log(result, 'data coming from backend to handlelogin');
        let resultSent = result.data.user;
        this.setState({
          busName: resultSent.business_name,
          busLogo: resultSent.logo,
          busLink: resultSent.redirect,
          busId: resultSent.bus_id,
          custId: resultSent.id,
          custName: resultSent.name,
          custEmail: resultSent.email,
          custPhone: resultSent.phone,
          custAuth: resultSent.auth,
          password: "",
          auth: resultSent.auth,
        })
        this.setState({
          password: ""
        })
        this.props.setUserInfo(this.state);
        console.log(this.state, 'state on login')
        this.props.history.push(result.data.redirect);
      });
    }
  }

  render() {
    return (
      <div className="Login">
        <div id='headerLogin'>

          <img className='loginLogo' src={this.state.logo} alt='DEF' />
          <div className='loginBusinessName'>
            {this.state.businessName}<div id="titlesubtext">Custom Scheduler</div>
          </div>

          <div>
            <a href={'http://localhost:3030/auth'}>
              <button className='google_login_button'>GOOGLE+</button>
            </a>
            <input className='input_login email' placeholder='email' type="text" onChange={(event) => {
              this.setState({

                email: event.target.value
              })
            }} value={this.state.email} />
            {/*~~~~~~~~~~~~~~~  buttons separator    ~~~~~~~~~~~~~~~~~~*/}
            <input className='input_login password' placeholder='password' type="text" onChange={(event) => {
              this.setState({
                password: event.target.value
              })
            }} value={this.state.password} />

            <button onClick={this.handlelogin} className='custom_login_button'>LOG IN</button>

            <a href='http://localhost:3030/auth/logout'>
              <button className='logout_button'>log out</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
