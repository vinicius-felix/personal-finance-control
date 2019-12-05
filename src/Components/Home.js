import React, { Component } from 'react';
import { MainLayout } from './MainLayout';
import 'antd/dist/antd.css';
import { text } from '../Config/config';

class Home extends Component{
  state = {
    response: '',
    user: 'Usuário',    
  }  

  render(){
    return(
      <MainLayout content={
      <div style={{ textAlign: 'center' }}>{`${text.home.welcome} ${this.state.user || ''}`}</div>
      } />
    )
  }
}

export default Home;