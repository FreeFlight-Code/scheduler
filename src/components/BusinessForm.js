import React, { Component } from 'react';
import '../styles/_BusinessForm.scss';
import axios from 'axios';
// import { profile } from '../server';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
            //state is hard coded in to allow continued work, i will do an /auth/me query and take all the info off that, or maybe to a custom query...
            firstname: 'David',
            email: 'davidfisc@hotmailfake.com',
            businessName: 'Target the french one',
            business_id: 1,
            link: 'http://www.google.com',
            logo: 'https://www.independence.aero/files/images/artikelbilder/cruiser4.jpg',
            auth: 'admin',
            results:[{"jid":1,"businessname":"Target","firstname":"David","lastname":"Fischer","comments":"none","city":"riverton","state":"utah","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":2,"businessname":"Target","firstname":"David","lastname":"Fischer","comments":"none","city":"riverton","state":"utah","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":3,"businessname":"smiths","firstname":"rebecca","lastname":"Fischer","comments":"none","city":"las vegas","state":"utah","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":4,"businessname":"galls","firstname":"matt","lastname":"Fischer","comments":"none","city":"las vegas","state":"CA","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1},{"jid":5,"businessname":"winco","firstname":"matt","lastname":"Fischer","comments":"none","city":"las vegas","state":"CA","today":"2017-12-10T07:00:00.000Z","jobdate":"2077-07-07T06:00:00.000Z","bid":1,"uid":1}]
          }
        
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.myDate = this.myDate.bind(this);
    

  }


  handleSearch(event) {
    event.preventDefault()
    axios.get(`/api/jobs`).then((res) => {
      // console.log(res.data)
      let name = (this.state.name).toLowerCase();
      let state = (this.state.state).toLowerCase();
      let city = (this.state.city).toLowerCase();
      // let comments = (this.state.comments).toLowerCase();
      let sortedData = res.data;

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
    
    componentWillMount() {
      console.log(this.state)
    }
    

  render() {

    return (
      <div className="Form">


        <form className='form_container'>
          Search By:

          <input className='input_business' onChange={(e) => this.setState({ 'name': e.target.value })} type="text" placeholder='Job name' value={this.state.name}></input>

          <input className='input_business' onChange={(e) => this.setState({ 'state': e.target.value })}
            type="text" placeholder='State' value={this.state.state}></input>

          <input className='input_business' onChange={(e) => this.setState({ 'city': e.target.value })} type="text" placeholder='City' value={this.state.city}></input>

          <button onClick={this.handleSearch} className="searchButton">Get Jobs</button>

          {/* <button onClick={this.handleDetails} className="searchButton">Get Details</button>

          <input className='input_business' onChange={(e) => this.setState({ 'id': e.target.value })} type="text" placeholder='Job ID' value={this.state.id}></input> */}

        </form>
        <div className="results">Results
          <div className="titleHolder">
              <div className="title">ID</div>
              <div className="title">Job Name</div>
              <div className="title">Job Date</div>
              <div className="title">Job City</div>
              <div className="title">Job State</div>
          </div>
          <div className='list_container'>
          {  this.state.list.length ? 
            this.state.list.map((element, i) => {

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
          }) : <div> ~~~~~  No Data  ~~~~~ </div>
          }
          </div>
        </div>

      </div>
    );
  }
}
