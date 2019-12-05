import React, { Component } from 'react';
import { MainLayout } from './../MainLayout'
import 'antd/dist/antd.css';
import { Form, Input, Typography, Button } from 'antd';
import apiCategories from '../../Services/service-categories';
import { text } from '../../Config/config';

const translatedText = text.users;
const { Title } = Typography;

class UserForm extends Component{

  state = {
    visible: false,
    data: {},
    form: {
      name: '',
      email: '',
      password: ''
    }
  }

  componentDidMount(){    
  }

  handleSubmit = e => {
    const { form } = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        apiCategories.post('/create', form);
        this.props.history.replace('/categorias');
    }});
  };

  onChange = e => {    
    const value = e.target.value, key = e.target.id
    
    this.setState((prev, props) => ({ 
      form: {
        ...prev.form,
        [key]: value
      }
    }));
  }

  render(){
    const formItemLayout = {
      labelCol: { 
        span: 5
      },
      wrapperCol: {
        span: 13,
      }
    };
    
    const { getFieldDecorator } = this.props.form;

    return(
      <MainLayout content={
        <div>
          <Title level={3} style={{paddingTop: 10, paddingBottom: 50}}>
            <span>{translatedText.title_new}</span>
          </Title>

          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          
            <Form.Item label={translatedText.label_name}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: translatedText.error_message_name }],
              })(<Input autoFocus onChange={this.onChange} placeholder={translatedText.placeholder_name} /> )}
            </Form.Item>

            <Form.Item label={translatedText.label_email}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: translatedText.error_message_email }],
              })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_email} /> )}
            </Form.Item>

            <Form.Item label={translatedText.label_password}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: translatedText.error_message_password }],
              })(<Input type="password" onChange={this.onChange} placeholder={translatedText.placeholder_password} /> )}
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">
                {translatedText.button_save}
              </Button>
            </Form.Item>

          </Form>
          
        </div>
      } />
    )
  }
}

const WrappedUserForm = Form.create()(UserForm);
export default WrappedUserForm;