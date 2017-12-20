import React, { Component } from 'react';
import '../styles/_Scheduler.scss';
import BusinessForm from './BusinessForm';
import ClientForm from './ClientForm';
import axios from 'axios';

class Scheduler extends Component {
  constructor(props) {
    super(props)
    this.state = {

      //state is hard coded in to allow continued work, i will do an /auth/me query and take all the info off that, or maybe to a custom query...
      firstname: 'David_me',
      email: 'davidfisc@hotmailfake.com',
      businessName: 'Target the french one',
      business_id: 1,
      link: 'http://www.google.com',
      logo: 'https://www.independence.aero/files/images/artikelbilder/cruiser4.jpg',
      auth: 'client',
      results:[{"jid":1,"businessname":"TTT","firstname":"David","lastname":"Fischer","comments":"none","city":"riverton","state":"utah","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":2,"businessname":"TGH","firstname":"David","lastname":"Fischer","comments":"none","city":"riverton","state":"utah","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":3,"businessname":"smiths","firstname":"rebecca","lastname":"Fischer","comments":"none","city":"las vegas","state":"utah","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":4,"businessname":"galls","firstname":"matt","lastname":"Fischer","comments":"none","city":"las vegas","state":"CA","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":5,"businessname":"winco","firstname":"matt","lastname":"Fischer","comments":"none","city":"las vegas","state":"CA","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1}]
    }
  }



  componentWillMount() {

    //query auth/me then redirect to login if fails


    // get business and jobs from user email/id


    axios.get('http://localhost:3030/api/jobs').then((res) => {
      // console.log(res.data[0], 'jobs recieved')
      this.setState({
        results: res.data
      })
      console.log(this.state.results, 'state set')
    }).catch((err)=>err)
    // axios.get('http://localhost:3030/sessionAuth').then((res) => {
    //   console.log(res, 'req.session on scheduler')
    // })
    // console.log (this.state, 'state on scheduler')
    // console.log(this.props.auth, 'props.auth')

  }

  render() {

    return (
      <div className="Scheduler">
        <div>

          Welcome {this.state.firstname ? this.state.firstname : this.state.email}!
          </div>
        <img className='image avatar scheduler'src={this.state.logo} alt="logo" />

         <div className="schedulerHeader">
        <a href='/auth/logout'>
            <button className='logout_button'>log out</button>
          </a>
        </div>
      { this.state.auth === 'business' || 'admin' ?
          < BusinessForm {...this.props} results={this.state} /> :
    < ClientForm {...this.props} results={this.state} /> } 




      </div>
    );
  }
}

export default Scheduler;
