import React, { Component } from 'react';
import '../styles/_ClientForm.scss';
import axios from 'axios';
// import { profile } from '../server';

export default class Client_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.results
      , showaddjob: false
    };
  }

  showJobModal() {
    const flip = !this.state.showaddjob
    // console.log(this.state.showaddjob)
    this.setState({
      showaddjob: flip
    })
  }

  addJob() {

    let obj = {
      businessname: document.querySelector('input#businessName').value
      , jobname: document.querySelector('input#jobName').value
      , city: document.querySelector('input#city').value
      , state: document.querySelector('input#state').value
      , jobdate: document.querySelector('input#jobDate').value
      , comments: document.querySelector('input#comments').value
      , bid: this.state.bid
      , uid: this.state.uid
      , firstname: this.state.firstname
      , lastname: this.state.lastname
    }
    axios.post('/api/addjob/', obj).then((res) => {
      console.log(res.data, 'all jobs this user')
    })
    let id = this.props.state.uid;
    //state passed through props

    this.setState(this.props.state);
    axios.get('/api/jobsSingleCustomer/' + id).then((res) => {
      console.log('successfully got job data')

      //put all jobs for this customer on this.state.results
      this.setState({
        results: res.data,
        list: res.data
      })
      // console.log(this.state, 'state set hopefully with results')
      // console.log(this.props, 'props on client')
    })
      .catch(err => err)
    this.showJobModal();

  }

  componentWillMount() {

    let id = this.props.state.uid;
    //state passed through props

    if (this.props && this.props.user && this.props.user.firstname | this.props.user.email) {
      console.log('client logged in')
      let uid = this.props.user.uid
      axios.get('/api/jobsSingleCustomer' + uid)
      .then((res) => {
        this.setState({
          results: res.data,
          list: res.data
        })
      }) .catch(err => err)
      // console.log(this.state, 'state set hopefully with results')
      // console.log(this.props, 'props on client')
    }
  }

  render() {
    console.log(this.state, 'state on client form')
    const insertTableRow = () => {
      if (this.state && this.state.results && this.state.results.length > 0) {
        let data = this.state.results;
        return (data.map((e, i) => {
          // console.log(e, 'results element')
          let date = new Date(e.jobdate)
          return (
            <tr key={i} className='resultsRow'>
              <td key={i + e.businessname}>{e.businessname}</td>
              <td key={i + e.city}>{e.city}</td>
              <td key={i + e.state}>{e.state}</td>
              <td key={i + '_date'}>{date.toLocaleDateString()}</td>
              <td key={i + '_comments'}>{e.comments}</td>
            </tr>

          )
        }))
      } else
        return (<tr>Client...You have no appts set...</tr>);
    }
    const addJobModal = _ => {
      if (this.state.showaddjob) {
        return (<div name='addJobModal' id="addJobModalContainer">
          <p className='label'>Job Name</p>
          <input id='jobName' className='input' type="text" placeholder='' />
          <p className='label'>Business Name</p>
          <input id='businessName' className='input' type="text" placeholder='' />
          <p className='label'>City</p>
          <input id='city' className='input' type="text" placeholder='' />
          <p className='label'>State</p>
          <input id='state' className='input' type="text" placeholder='' />
          <p className='label'>Job Date</p>
          <input id='jobDate' className='input' type="date" placeholder='' />
          <p className='label'>Comments</p>
          <input id='comments' className='input' type="text" placeholder='' />
          <button onClick={this.addJob.bind(this)} id='addJobButton'>Add Job</button>
          <button onClick={this.showJobModal.bind(this)} id='close'>Cancel</button>
        </div>)
      }
    }
    // console.log(this.state, 'state')
    return (
      <div className="Client_Form">

        <span id='addjob' onClick={this.showJobModal.bind(this)}>add job</span>

        {addJobModal()}

        <table className='resultsTable'>
          <tbody>
            <tr className='tableHeadings'>
              <th>Business</th>
              <th>City</th>
              <th>State</th>
              <th>Date</th>
              <th>Comments</th>
            </tr>
            {insertTableRow()}
          </tbody>
        </table>

      </div>



    );
  }
}
