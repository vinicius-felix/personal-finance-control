import React, { Component } from 'react';
import { MainLayout } from './../MainLayout'
import 'antd/dist/antd.css';
import { Form, Input, Typography, Button, DatePicker } from 'antd';
import apiGains from '../../Services/service-gains';
import { text } from '../../Config/config';

const translatedText = text.gains;
const { Title } = Typography;

class GainForm extends Component{

  state = {
    edit: false,
    data: {},
    form: {
      description: '',
      value: '',
      date: ''
    }
  }

  componentDidMount(){

  }

  handleSubmit = e => {
    const { form } = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        apiGains.post('/create', form);
        this.props.history.replace('/historico-ganhos');
    }});
  };

  onChangeDate = (date, dateString) => {
    this.setState((prev, props) => ({
      form: {
        ...prev.form,
        date: dateString
      }
    }));
  }

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
          
            <Form.Item label={translatedText.label_description}>
              {getFieldDecorator('description', {
                rules: [{ required: true, message: translatedText.error_message_description }],
              })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_description} /> )}
            </Form.Item>
          
            <Form.Item label={translatedText.label_value}>
              {getFieldDecorator('value', {
                rules: [{ required: true, message: translatedText.error_message_value }],
              })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_value} />)}
            </Form.Item>

            <Form.Item label={translatedText.label_date}>
              {getFieldDecorator('date', {
                rules: [{ required: true, message: translatedText.error_message_date }],
              })(<DatePicker placeholder={translatedText.placeholder_date} onChange={this.onChangeDate} format="DD/MM/YYYY" />)}
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

const WrappedGainForm = Form.create()(GainForm);
export default WrappedGainForm;