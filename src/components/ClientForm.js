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

  }
  componentWillMount() {
    
    let id = this.state.custId;
    console.log(this.state.custId, 'custid')
    // let id = 1;
    axios.get('http://localhost:3030/api/jobsSingleCustomer/' + id).then((res) => {
      // console.log(res.data, 'all jobs this customer')
      this.setState({
        results: res.data
      })
      // console.log(this.state, 'state set hopefully with results')
    })
    .catch(err=>err)

  }

  render() {
    const insertTableRow = () => {
      if (this.state && this.state.results && this.state.results.length>0) {
      let data = this.state.results;
      // return (<tr><td>{data[1].businessname}</td></tr>);
      return (data.map((e, i) => {
        console.log(e, 'results element')
      return (
          <tr key={i} className='resultsRow'>
            <td key={i + e.businessname}>{e.businessname}</td>
            <td key={i + e.city}>{e.city}</td>
            <td key={i + e.state}>{e.state}</td>
            {/*<td key={i + e.jobdate}>{e.jobdate}</td>*/}
          </tr>
        
        )
        }))
      } else 
      return (<tr><td>no scheduled jobs</td></tr>);
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
          <input type="date" />
        </div>


      </div>
    );
  }
}
