import React, { Component } from 'react';
import '../styles/_ClientForm.scss';
import axios from 'axios';
// import { profile } from '../server';

export default class Client_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobName: '',
      busName: this.props.auth.busName,
      busId: this.props.auth.busId,
      custId: this.props.auth.custId,
      custName: this.props.auth.custName,
      custEmail: this.props.auth.custEmail,
      custAuth: this.props.auth.custAuth,
      date: "",
      state: "",
      city: "",
      comments: "",
      list: [],
      details: []
      // login_profile: profile
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddJob = this.handleAddJob.bind(this);
    this.myDate = this.myDate.bind(this);

  }

  handleSearch(event) {
    console.log(this.state)
    // event.preventDefault()
    let id = this.state.custId;
    // console.log(this.props, 'props on client')
    axios.get('http://localhost:3030/api/jobSingleCustomer/' + id).then((res) => {
      // console.log('handlesearch in  clientform'+res.data)
      let name = (this.state.jobName)
      let state = (this.state.state)
      let city = (this.state.city)
      let comments = (this.state.comments)
      // let comments = (this.state.comments)
      let sortedData = res.data;

      console.log(sortedData)
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort names
      if (name) {
        sortedData = sortedData.filter((e) => {
          if (!name || !e.jobname) return false;
          let nameLower = name ? (name).toLowerCase() : "";
          let index = e.jobname ? (e.jobname).toLowerCase() : "";
          console.log(index)
          return index.includes(nameLower);
        })
      }
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort state
      if (state) {
        sortedData = sortedData.filter((e) => {
          if ( !state || !e.state ) return false;
          let stateLower =state ? (state).toLowerCase() : "";
          let index = e.state ? (e.state).toLowerCase() : "";
          // console.log(index)
          return index.includes(stateLower);
        })
      }
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort city

      if (city) {
        sortedData = sortedData.filter((e) => {
          if ( !city || !e.city ) return false;
          let cityLower = city ? (city).toLowerCase() : "";
          let index = e.city ? (e.city).toLowerCase() : "";
          // console.log(index)
          return index.includes(cityLower);
        })
      }

      if (comments) {
        sortedData = sortedData.filter((e) => {
          if ( !comments || !e.textfield ) return false;
          let cityLower = comments ? (comments).toLowerCase() : "";
          let index = e.textfield ? (e.textfield).toLowerCase() : "";
          // console.log(index)
          return index.includes(cityLower);
        })
      }




      this.setState({
        list: sortedData
      })


    })
  }


  
  handleAddJob(event) {
    event.preventDefault()
    axios.post('http://localhost:3030/api/addjob', ({
      user: this.state
    })).then((res) => {
      // this.handleSearch()
      console.log(res, 'inside addjob')
    })
  }
  componentWillMount() {
    // console.log(this.props.auth, 'props auth')
    // this.handleSearch()
    // console.log(this.props)
  }

  myDate (date) {
    let d= new Date (date)
    return (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()
    }


  render() {

    return (
      <div className="Client_Form">
        <div>
          <span>{this.state.busName}</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <form className='client_Form_container'>


          <input className='input_client' onChange={(e) => this.setState({ 'jobName': e.target.value })} type="text" placeholder='Job name' value={this.state.jobName}></input>

          <input className='input_client' onChange={(e) => this.setState({ 'state': e.target.value })}
            type="text" placeholder='State' value={this.state.state}></input>

          <input className='input_client' onChange={(e) => this.setState({ 'city': e.target.value })} type="text" placeholder='City' value={this.state.city}></input>

           <input type='date' className='input_client' onChange={(e) => this.setState({ 'date': e.target.value })} default={new Date()} value={this.state.date}></input> 

          <input className='input_client' onChange={(e) => this.setState({ 'comments': e.target.value })} type="text" placeholder='Comments' value={this.state.comments}></input>

          <button onClick={this.handleSearch} className="searchButton">Get Jobs</button>

          <button onClick={this.handleAddJob} className="searchButton">Add Job</button>


        </form>
        <div id='clientresults' className="results">Results
          <div className="titleHolder">
            <div className="client_title">ID</div>
            <div className="client_title">Job Name</div>
            <div className="client_title">Job Date</div>
            <div className="client_title">Job City</div>
            <div className="client_title">Job State</div>
          </div>
          <div className='list_container'>
            {this.state.list.map((element, i) => {

              let mdate = this.myDate(element.jobdate);
              return (
                <div className='element_list' key={element.id}>
                  <div>{element.id}</div>
                  <div>{element.jobname}</div>
                  <div>{mdate}</div>
                  <div>{element.city}</div>
                  <div>{element.state}</div>
                </div>

              );
            })}
          </div>
        </div>

      </div>
    );
  }
}
