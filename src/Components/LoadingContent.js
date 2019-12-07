import React, { Component } from 'react';
import { Layout, Row, Col, Icon, Spin } from 'antd';
import 'antd/dist/antd.css';

const icon = <Icon type="loading" style={{fontSize: 24}} spin />

export class LoadingContent extends Component {
  state = {}

  render(){
    return <SpinLoading loadingText={this.props.loadingText} />
  }
}

const SpinLoading = (props) => (
  <div style={{textAlign: 'center'}}>
    <Spin indicator={icon} delay={100} size='large' />
    <h3> {props.loadingText} </h3>
  </div>
)