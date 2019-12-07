import React, { Component } from 'react';
import { MainLayout } from './../MainLayout'
import { LoadingContent } from './../LoadingContent';
import 'antd/dist/antd.css';
import { Form, DatePicker, Table, Divider, Button, Icon, Popconfirm, Row, Col, message, Typography, Modal, Select, Input } from 'antd';
import { Link } from 'react-router-dom';
import apiSpends from '../../Services/service-spends';
import apiCategories from '../../Services/service-categories';
import { text } from '../../Config/config';

const translatedText = text.spends;
const textLoading = text.menu.loading;
const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Option } = Select;

class HistorySpend extends Component{
  state = {
    visible: false,
    data: {
      spends: []
    },
    form: {},
    loading: false
  }

  onConfirm = async (id) => {
    message.success(translatedText.label_delete_success);
    await this.handleDelete(id);
    document.location.reload(true);
  }

  onChangeDate = (date, dateString) => {
    this.setState((prev, props) => ({
      form: {
        ...prev.form,
        date: dateString
      }
    }))
  }

  onChangeSelect = e => {
    this.setState((prev, props) => ({
      form: {
        ...prev.form,
        category: e
      }
    }))
  }

  onChange = e => {    
    const value = e.target.value, key = e.target.id;
    
    this.setState((prev, props) => ({ 
      form: {
        ...prev.form,
        [key]: value
      }
    }));
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  onCancelModal = () => {
    this.setState({ 
      visible: false 
    });
  }

  onOkModal = () => {
    const { form } = this.state;
    apiSpends.put(`/update/${form._id}`, form);
    document.location.reload(true);
  }
  
  onEdit = (id) => {
    apiSpends.get(`/show/${id}`)
      .then(res => {
        this.setState({ 
          form: res.data.spend 
        });
      })
      .catch(err => console.warn(err));
  }

  handleEditSpend = (id) => {
    this.onEdit(id);
    this.setState({ 
      visible: true 
    });
  }

  handleDelete = (id) => {
    apiSpends.delete(`/delete/${id}`);
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  }
  
  columns = [
    {
      key: 'date',
      dataIndex: 'date',
      title: translatedText.label_date,
    },
  
    {
      key: 'name',
      dataIndex: 'name',
      title: translatedText.label_category,
    },
  
    {
      key: 'description',
      dataIndex: 'description',
      title: translatedText.label_description,
    },
  
    {
      key: 'value',
      dataIndex: 'value',
      title: translatedText.label_value,
      render: textColumn => translatedText.label_currency_prefix + " " + textColumn.toFixed(2)
    },
  
    {
      key: 'actions',
      title: translatedText.label_actions,
      align: 'center',
      render: (textColumn, record) => (
        <span>
          <Button style={{ width: 30, textAlign: 'center' }} type='primary' size={'small'} ghost onClick={ () => this.handleEditSpend(textColumn._id) }> 
            <Icon type="edit" /> 
          </Button>
          <Divider type='vertical' />
          <Popconfirm title={translatedText.label_delete} onConfirm={() => this.onConfirm(textColumn._id)} okText={translatedText.button_yes} cancelText={translatedText.button_no}>
            <Button style={{ width: 30 }} type='danger' size={'small'} ghost>
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        </span>
      ),
    }
  ];

  
  componentDidMount(){
    
    apiSpends.get('/', (req, res) => {
      res.send(req.data)
    })
      .then(res => this.setState((prev, props) => ({
        data: {
          ...prev.data,
          spends: res.data.spends
        }
      })))
      .catch(err => console.warn(err));

    apiCategories.get('/', (req, res) => {
      res.send(req.data)
    })
      .then(res => this.setState((prev, props) => ({
          data: {
            ...prev.data,
            categories: res.data.categories
          }
      })))
      .catch(err => console.warn(err));

      this.setState({loading: true});

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { 
        span: 5
      },
      wrapperCol: {
        span: 13,
      }
    };
    
    return(
      <MainLayout content={
        <div>
          <Title level={3} style={{paddingTop: 10, paddingBottom: 50}}>
            <Row>
              <Col span={8}>{translatedText.title_list}</Col>
              <Col span={11} style={{ textAlign: 'center' }}> 
                <RangePicker onChange={this.onChangeDate} format="DD/MM/YYYY" />
              </Col>
              <Col span={5} style={{ textAlign: 'right' }}>
                <Button type='primary' style={{ marginLeft: 10 }}> 
                  <Link to='/historico-gastos/novo'>{translatedText.title_add}</Link> 
                </Button>
              </Col>
            </Row>
          </Title>

          { !this.state.loading && <LoadingContent loadingText={textLoading} /> }
          { this.state.loading && <Table rowKey="_id" columns={this.columns} dataSource={this.state.data.spends} onChange={this.handleChange} />}

          <Modal title={translatedText.title_edit} visible={this.state.visible} onOk={this.onOkModal} onCancel={this.onCancelModal} okText={translatedText.button_ok} cancelText={translatedText.button_cancel}>

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label={translatedText.label_name}>
                {getFieldDecorator('name', {
                  initialValue: this.state.form && this.state.form.name, rules: [{ required: true, message: translatedText.error_message_name }],
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
                  initialValue: this.state.form && this.state.form.description, rules: [{ required: true, message: translatedText.error_message_description }],
                })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_description} />)}
              </Form.Item>
            
              <Form.Item label={translatedText.label_value}>
                {getFieldDecorator('value', {
                  initialValue: this.state.form && this.state.form.value, rules: [{ required: true, message: translatedText.error_message_value }],
                })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_value} />)}
              </Form.Item>

              <Form.Item label={translatedText.label_date}>
                {getFieldDecorator('date', {
                  rules: [{ required: true, message: translatedText.error_message_date }],
                })(<DatePicker placeholder={translatedText.placeholder_date} onChange={this.onChangeDate} format="DD/MM/YYYY" />)}
              </Form.Item>
              
            </Form>

          </Modal>
          
        </div>
      } />
    )
    
  }
}

const WrappedHistorySpend = Form.create()(HistorySpend);
export default WrappedHistorySpend;