import React, { Component } from 'react';
import '../styles/_ClientForm.scss';
import axios from 'axios';
// import { profile } from '../server';

export default class Client_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busName: this.props.auth.businessname,
      busId: this.props.auth.bid,
      custId: this.props.auth.uid,
      custName: this.props.auth.firstname + ' ' + this.props.auth.lastname,
      custEmail: this.props.auth.email,
      custAuth: this.props.auth.auth,
      results: []
      // login_profile: profile
    };
    this.addJobModal = this.addJobModal.bind(this);
  }

  addJobModal() {
    console.log('show modal')
  }
  componentWillMount() {

    let id = this.state.custId;
    // console.log(this.state.custId, 'custid')
    // let id = 1;
    axios.get('/api/jobsSingleCustomer/' + id).then((res) => {
      console.log(res.data, 'all jobs this user')

      //put all jobs for this customer on this.state.results
      this.setState({
        results: res.data
      })
      // console.log(this.state, 'state set hopefully with results')
      // console.log(this.props, 'props on client')
    })
      .catch(err => err)

  }

  render() {
    const insertTableRow = () => {
      if (this.state && this.state.results && this.state.results.length > 0) {
        let data = this.state.results;
        return (data.map((e, i) => {
          console.log(e, 'results element')
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
        return (<tr><th>no scheduled jobs</th></tr>);
    }
    // console.log(this.state, 'state')
    return (
      <div className="Client_Form">
        <div className='resultsContainer'>
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
          <span id='addjob' onClick={() => { this.addJobModal() }}>add job</span>
          <form name='addJobModal' className="addJobModalContainer" action='localhost:3030/api/test' method='GET'>

            <div className="title">Add a New Job</div>

            <p className='label'>Job Name</p>

            <input name='jobName' className='input' type="text" placeholder='' />

            <p className='label'>Business Name</p>

            <input name='businessName' className='input' type="text" placeholder='' />

            <p className='label'>City</p>

            <input name='city' className='input' type="text" placeholder='' />

            <p className='label'>State</p>

            <input name='state' className='input' type="text" placeholder='' />

            <p className='label'>Job Date</p>

            <input name='jobDate' className='input' type="date" placeholder='' />

            <p className='label'>Comments</p>

            <input name='Comments' className='input' type="text" placeholder='' />
            <input value='submit' type="submit" className="submit"/>
          </form>
        </div>

      </div>



    );
  }
}
