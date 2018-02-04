import React, { Component } from 'react';
import '../styles/_Home.scss';
// import axios from 'axios';
class Home extends Component {



constructor(props) {
    super(props);
    this.state={

    }
}


  render() {
      
    return (
      <div className="Home">
        <h1 className="title my">Welcome to</h1>
        <h1 className="title my">your custom</h1>
        <h1 className="title arced">SCHEDULER</h1>
        <div className='img'><img src="https://www.simpleshapes.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/0/4036_img1_3_4.jpg" alt="calendar"/></div>
        <button onClick={()=>{this.props.history.push('/login/')}}>Register</button>
      </div>
    );
  }
}

export default Home;
