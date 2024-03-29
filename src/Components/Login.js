import React, { Component } from 'react';
import { Layout, Typography, Input, Button, Form, Icon, Divider } from 'antd';
import 'antd/dist/antd.css';
import { text } from '../Config/config';
import axios from 'axios';

const apiAuth = axios.create({ baseURL: 'http://localhost:3001/auth' });
const translatedText = text.login;
const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const fillWindow = {
  height: '100%',
  position: 'absolute',
  left: '0',
  width: '100%',
  overflow: 'hidden'
};

const center = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingTop: '10%',
  width: '50%'
};

class Login extends Component{

  handleSubmit = e => {
    
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values
        apiAuth.post('/authenticate', { email: email, password: password })
          .then(res => {
            if(res.status === 200)
              this.props.history.replace('/')
          })
          .catch(err => console.warn(err))        
      }
    });
  };

  render(){    
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout style={fillWindow}>
        
        <Header style={{ backgroundColor: '#349beb' }}> 
          <Title style={{ color: 'white', paddingTop: 20 }} level={2}>Personal Finance Controller</Title> 
        </Header>
        
        <Content style={center}>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: translatedText.error_message_username }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={translatedText.placeholder_username}
                  autoFocus
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: translatedText.error_message_password }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder={translatedText.placeholder_password}
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {translatedText.button_login}
              </Button>

              <Divider type="vertical" />

              <Button type="primary" htmlType="submit" className="login-form-button" ghost>
                {translatedText.button_sign_up}
              </Button>
              
            </Form.Item>

          </Form>

        </Content>

        <Footer style={{fontSize: 10, textAlign: 'center', backgroundColor: '#d1dee8'}} />

      </Layout>
    );
  }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
