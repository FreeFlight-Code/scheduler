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
        this.setState(state)
        //list is the filtered results
        this.setState({list:state.results})
    }

   
  
    handleSearch(event) {
      event.preventDefault()
      let sortedData = this.state.results;

        let name = (this.state.businessname).toLowerCase();
        let state = (this.state.state).toLowerCase();
        let city = (this.state.city).toLowerCase();
        // let comments = (this.state.comments).toLowerCase();
  
        console.log(sortedData)
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort names
        if (this.state.name) {
          sortedData = sortedData.filter((e) => {
            let index = (e.jobname).toLowerCase();
            console.log(index)
            return index.includes(name);
          })
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort state
        if (this.state.state) {
          sortedData = sortedData.filter((e) => {
            let index = (e.state).toLowerCase();
            // console.log(index)
            return index.includes(state);
          })
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    sort city
  
        if (this.state.city) {
          sortedData = sortedData.filter((e) => {
            let index = (e.city).toLowerCase();
            // console.log(index)
            return index.includes(city);
          })
        }
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
  
    myDate (date) {
      let d= new Date (date)
      return (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear()
      }

      onChangeHandler(e){
        let target = e.target.id;
        let value = e.target.value;
  
        this.setState({ [target]: value })
        this.handleSearch();
      }
  
    render() {
        // console.log(this.props,'props')
        console.log(this.state,'state')
      return (
        <div className="Form">
  
  
          <form className='controls'>
            Search By:
  
            <input id='searchName' className='input_business' onChange={this.onChangeHandler.bind(this)} type="text" placeholder='Job name' value={this.state.searchName}></input>
  
            <input id='searchCity' className='input_business' onChange={this.onChangeHandler.bind(this)} type="text" placeholder='City' value={this.state.searchCity}></input>
  
            <input id='searchState' className='input_business' onChange={this.onChangeHandler.bind(this)}
              type="text" placeholder='State' value={this.state.searchState}></input>
  
            <button onClick={this.handleSearch} className="searchButton">Get Jobs</button>
  
            {/* <button onClick={this.handleDetails} className="searchButton">Get Details</button>
  
            <input className='input_business' onChange={(e) => this.setState({ 'id': e.target.value })} type="text" placeholder='Job ID' value={this.state.id}></input> */}
  
          </form>
          <table className="resultsContainer">
            <tr className="tableHeadings">
                {/* <th className="title">ID</th> */}
                <th className="title">Job Name</th>
                <th className="title">Date</th>
                <th className="title">City</th>
                <th className="title">State</th>
            </tr>

            {  this.state.list.length>0 ? 
              this.state.list.map((element, i) => {
  
              let mdate = this.myDate(element.jobdate);
              return (
                <tr className='tableItem' key={element.id}>
                  <td>{element.jobname}</td>
                  <td>{mdate}</td>
                  <td>{element.city}</td>
                  <td>{element.state}</td>
                </tr>
                
              );
            }) : <td> ~~~~~  No Data  ~~~~~ </td>
            }
        
          </table>
  
        </div>
      );
    }
  }
  