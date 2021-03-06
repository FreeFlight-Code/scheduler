import React, { Component } from 'react';
import '../styles/_BusinessForm.scss';
import axios from 'axios';
// import { profile } from '../server';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.myDate = this.myDate.bind(this);


  }

  componentWillMount() {
    //state passed through props
    let state = this.props.state;
    //list is the filtered results
    this.setState(state);
    if (
      this.props 
      && this.props.user
      // && this.props.user.firstname 
      // | this.props.user.email 
      && this.props.user.auth === 'admin'
      ) {
      console.log('admin logged in')
      let bid = this.props.user.bid
      axios.get('/api/jobsSingleBusiness/' + bid)
      .then((res) => {
        // let results = res.data;
        console.log('res from back for businesses', res.data);
        this.setState({
          results: res.data,
          list: res.data
        })
      }) 
      .catch(err => console.log(err)) 
    }    
  }

  onChangeHandler(e) {
    let target = e.target.id;
    let value = e.target.value;

    this.setState({ [target]: value })
    this.handleSearch();
  }

  handleSearch(event) {
    // event.preventDefault()
    let sortedData = this.state.results;
    let searchName = this.state.searchName ?this.state.searchName.toLowerCase() : "";
    let searchState = this.state.searchState ?this.state.searchState.toLowerCase() : "";
    let searchCity = this.state.searchCity ? this.state.searchCity.toLowerCase() : "";
    
    console.log(sortedData, 'sorteddata start')

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort names
    if (searchName) {
      sortedData = sortedData.filter((e) => {
        e.businessname.includes(searchName);
      })
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort state
    if (searchState) {
      sortedData = sortedData.filter((e) => {
        e.state.includes(searchState);
      })
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort city
    
    if (searchCity) {
      sortedData = sortedData.filter((e) => {
        e.city.includes(searchCity);
      })
    }
    console.log(sortedData, 'end of filter')
    this.setState({
      list: sortedData
    })
  }

  handleDetails(event) {
    event.preventDefault()
    axios.get(`/api/jobs`).then((res) => {
      let id = this.state.id;
      let sortedData = res.data;
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    id sort
      if (this.state.id) {
        sortedData = sortedData.filter((e) => {
          let index = (e.id);
          console.log(index)
          return index.includes(id);
        })
      }
      this.setState({
        details: sortedData
      })


    })
  }

  myDate(date) {
    let d = new Date(date)
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()
  }

  render() {
    console.log(this.props,'props')
    console.log(this.state, 'state')
    return (
      <div className="Form">


        <form className='controls'>
          Search By:

            <input id='searchName' className='input_business' onChange={this.onChangeHandler.bind(this)} type="text" placeholder='Job name' value={this.state.searchName}></input>

          <input id='searchCity' className='input_business' onChange={this.onChangeHandler.bind(this)} type="text" placeholder='City' value={this.state.searchCity}></input>

          <input id='searchState' className='input_business' onChange={this.onChangeHandler.bind(this)}
            type="text" placeholder='State' value={this.state.searchState}></input>

          <button onClick={this.handleSearch} className="searchButton">Get Jobs</button>
          <p>Custom URL for your clients:</p>
          <p>localhost:3000/#/login/{this.state.bid}</p>

          {/* <button onClick={this.handleDetails} className="searchButton">Get Details</button>
  
            <input className='input_business' onChange={(e) => this.setState({ 'id': e.target.value })} type="text" placeholder='Job ID' value={this.state.id}></input> */}

        </form>
        <table className="resultsContainer">
            <tbody>
          <tr className="tableHeadings">
              {/* <th className="title">ID</th> */}
              <th className="title">Job Name</th>
              <th className="title">Date</th>
              <th className="title">City</th>
              <th className="title">State</th>
          </tr>

          {this.state.list.length > 0 ?
            this.state.list.map((element, i) => {
              
              let mdate = this.myDate(element.jobdate);
              return (
                <tr className='tableItem' key={element.id}>
                  <td>{element.businessname}</td>
                  <td>{mdate}</td>
                  <td>{element.city}</td>
                  <td>{element.state}</td>
                </tr>

          );
          }) : <tr><td> Business...Your appt calendar is empty... </td></tr>
          }

          </tbody>
        </table>

      </div>
    );
  }
}
