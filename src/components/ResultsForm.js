import React, { Component } from 'react';

class ResultsForm extends Component {
    render() {
        return (

            <div className="results">Results
            <div className="titleHolder">
                    <div className="title">ID</div>
                    <div className="title">Job Name</div>
                    <div className="title">Job Date</div>
                    <div className="title">Job City</div>
                    <div className="title">Job State</div>
                </div>
                <div className='list_container'>
                    {this.state.results.length ?
                        this.state.results.map((element, i) => {

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

        );
    }
}

export default ResultsForm;