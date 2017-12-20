import React, { Component } from 'react';
import '../styles/_BusinessForm.scss';
// import axios from 'axios';
// import { profile } from '../server';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName:"",
            searchCity:"",
            searchState:"",
            searchDate:""
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.myDate = this.myDate.bind(this);
        this.updateSearchOnState = this.updateSearchOnState.bind(this);

    }

    componentWillMount() {
        this.setState({
            ...this.props.results
        })
        console.log(this.state, 'state')
        console.log(this.props, 'props')
    }
    handleSearch() {

    }
    handleDetails() {

    }
    myDate() {

    }

    updateSearchOnState (e, searchType) {
        //dev fix once all data in database is caps uncomment this
        // e = e.toUpperCase();
        this.setState({
            [searchType]:e
        })
    console.log(this.state,'state')
    }
    render() {

const backendResults = ()=>{
    let data = this.state.results;
    
    
    //filters

    if (this.state.searchName){
         data = (data.filter((e,i)=>{
            return data[i].businessname.includes(this.state.searchName)
         }))
    }
    if (this.state.searchCity){
         data = (data.filter((e,i)=>{
            return data[i].city.includes(this.state.searchCity)
         }))
    }
    if (this.state.searchState){
         data = (data.filter((e,i)=>{
            return data[i].state.includes(this.state.searchState)
         }))
    }

    //render
    if (data.length===0) return "No Results";
    else if (data.length>0){
        return data.map((e, i, array)=>{
            return <div key={i}>{e.businessname}</div>
        })
    }
    else console.log('unknown input')

}
        return (
            <div className="business admin Form">
                <span className='controls formMain'>FILTERS
                    <input value={this.state.searchName} id='searchName' className='input controls name' onChange={(e)=>{this.updateSearchOnState(e.target.value, e.target.id)}} type="text"/>Business Name

                    {/* <input /*min={new Date}value={this.state.searchDate} onChange={(e)=>{this.updateSearchOnState(e.target.value, e.target.id)}} id='searchDate' className='input controls date' type="date"/>Date*/}

                    <input value={this.state.searchCity} id='searchCity' onChange={(e)=>{this.updateSearchOnState(e.target.value, e.target.id)}} className='input controls city' type="text"/>City

                    <input value={this.state.searchState} id='searchState' onChange={(e)=>{this.updateSearchOnState(e.target.value, e.target.id)}} className='input controls state' type="text"/>State

                </span>
                <span className='right formMain'>
                <div className='results'>{backendResults()}</div>
                </span>
            </div>
        );
    }
}
