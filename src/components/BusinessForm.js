import React, { Component } from 'react';
import '../styles/_BusinessForm.scss';
import axios from 'axios';


export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: "",
            searchCity: "",
            searchState: "",
            searchDate: ""
        }


        // this.handleDetails = this.handleDetails.bind(this);

        this.updateSearchOnState = this.updateSearchOnState.bind(this);

    }

    componentWillMount() {
        console.log(this.props, 'props on business')
        let data = this.props.auth;
        this.setState({
          data
        });

        // get business and jobs from user email/id
        axios.post('/api/getJobsSingleBusiness', {id:this.props.auth.bid}).then((res) => {
          console.log(res.data, 'all jobs this business')
          this.setState({
            results: res.data
          })
        }).catch((err) => err)
    
      }
    updateSearchOnState(e, searchType) {
        e = e.toLowerCase();
        this.setState({
            [searchType]: e
        })
        // console.log(this.state, 'state')
    }
    render() {
        const backendResults = () => {
            let data = [];
            if (this.state && this.state.results) {
                data = this.state.results;
            }
            //filters

            if (this.state.searchName) {
                data = (data.filter((e, i) => {
                    return data[i].businessname.includes(this.state.searchName)
                }))
            }
            if (this.state.searchCity) {
                data = (data.filter((e, i) => {
                    return data[i].city.includes(this.state.searchCity)
                }))
            }
            if (this.state.searchState) {
                data = (data.filter((e, i) => {
                    return data[i].state.includes(this.state.searchState)
                }))
            }

            //render

            if (data.length && data.length > 0) {
                return data.map((e, i, array) => {
                    return <div key={i}>{e.businessname}</div>
                })
            } else return "No Results";
        }
        return (
            <div className="business admin Form">
                <span className='controls formMain'>FILTERS
                    <input value={this.state.searchName} id='searchName' className='input controls name' onChange={(e) => { this.updateSearchOnState(e.target.value, e.target.id) }} type="text" />Business Name

                    {/* <input /*min={new Date}value={this.state.searchDate} onChange={(e)=>{this.updateSearchOnState(e.target.value, e.target.id)}} id='searchDate' className='input controls date' type="date"/>Date*/}

                    <input value={this.state.searchCity} id='searchCity' onChange={(e) => { this.updateSearchOnState(e.target.value, e.target.id) }} className='input controls city' type="text" />City

                    <input value={this.state.searchState} id='searchState' onChange={(e) => { this.updateSearchOnState(e.target.value, e.target.id) }} className='input controls state' type="text" />State

                </span>
                <span className='right formMain'>
                    <div className='results'>{backendResults()}</div>
                </span>
            </div>
        );
    }
}
