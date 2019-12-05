import React, { Component } from 'react';
import 'antd/dist/antd.css';
import erro from '../Images/404-page-not-found.jpg';

const center = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%'
}

class PageNotFound extends Component{
  render(){
    return(      
      <img src={erro} max-height={'100%'} alt='404' style={center} />
    )
  }
}

export default PageNotFound;