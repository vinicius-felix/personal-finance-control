import React, { Component } from 'react';
import { MainLayout } from './../MainLayout'
import 'antd/dist/antd.css';
import { Form, Input, Typography, Button, DatePicker, Select } from 'antd';
import apiSpends from '../../Services/service-spends';
import apiCategories from '../../Services/service-categories';
import { text } from '../../Config/config';

const translatedText = text.spends;
const { Option } = Select;
const { Title } = Typography;

class SpendForm extends Component{

  state = {
    edit: false,
    data: {},
    form: {
      name: '',
      description: '',
      value: '',
      date: ''
    }
  }

  componentDidMount(){
    apiCategories.get('/', (req, res) => {
      res.send(res => res.data)
    })
      .then(res => (
        this.setState((prev, props) => ({
          data: {
            ...prev.data,
            categories: res.data.categories
          }
        }))
      ))
      .catch(err => {
        console.warn(err);
      });
      
  }

  handleSubmit = e => {
    const { form } = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        apiSpends.post('/create', form);
        this.props.history.replace('/historico-gastos');
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

  onChangeSelect = e => {
    this.setState((prev, props) => ({
      form: {
        ...prev.form,
        name: e
      }
    }))
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
            <Form.Item label={translatedText.label_name}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: translatedText.error_message_name }],
              })(
                <Select onChange={e => this.onChangeSelect(e)} placeholder={translatedText.placeholder_name}>
                  { 
                    this.state.data.categories && this.state.data.categories.map(name => 
                      <Option key={name._id} value={name.name}>{name.name}</Option>
                  )}
                </Select>
              )}
            </Form.Item>
          
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

const WrappedSpendForm = Form.create()(SpendForm);
export default WrappedSpendForm;