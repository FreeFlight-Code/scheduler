import React, { Component } from 'react';
import '../styles/_Scheduler.scss';
import BusinessForm from './BusinessForm';
import ClientForm from './ClientForm';
import axios from 'axios';

class Scheduler extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  componentWillMount() {
    let data = this.props.auth;
    this.setState({
      data
    });
    console.log(data.auth, 'auth on scheduler page for which modal to show');

    //query auth/me then redirect to login if fails
    // axios.get('/auth', ).then((res)=>{
    //   console.log(res.data, 'res.data returned from auth')
    // }).then
    // (axios.get('/auth/me').then((res)=>{
    //     if(res.data){
    //       console.log("user data retrieve successful", res.data)
    //     }
    //   }).catch(console.log('no user returned err')))


    // get business and jobs from user email/id


    axios.get('http://localhost:3030/api/jobs').then((res) => {
      console.log(res.data, 'jobs recieved')
      this.setState({
        results: res.data
      })
    }).catch((err)=>err)
    // axios.get('http://localhost:3030/sessionAuth').then((res) => {
    //   console.log(res, 'req.session on scheduler')
    // })
    // console.log (this.state, 'state on scheduler')
    // console.log(this.props.auth, 'props.auth')
  }
  render() {
    console.log(this.state.data.auth)
    console.log(this.state.data.auth==='admin')
    return (
      <div className="Scheduler">
        <div>
          Welcome {this.props.auth.firstname ? this.props.auth.firstname : this.props.auth.email}!
          </div>
        <img className='image avatar scheduler'src={this.props.auth.logo} alt="logo" />

         <div className="schedulerHeader">
        <a href='/auth/logout'>
            <button className='logout_button'>log out</button>
          </a>
        </div>
      { this.state.data.auth === 'admin' ?
          < BusinessForm {...this.props} results={this.state.results} /> :
    < ClientForm {...this.props} results={this.state.results} /> } 
      </div>
    );
  }
}

export default Scheduler;
