import React, { Component } from 'react';
import { MainLayout } from './../MainLayout'
import 'antd/dist/antd.css';
import { Form, DatePicker, Table, Divider, Button, Icon, Popconfirm, Row, Col, message, Typography, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';
import apiGains from '../../Services/service-gains';
import { text } from '../../Config/config';

const translatedText = text.gains;
const { RangePicker } = DatePicker;
const { Title } = Typography;

class HistoryGain extends Component{
  state = {
    visible: false,
    data: {
      gains: []
    },
    form: {}
  }  

  onConfirm = async (id) => {
    message.success(translatedText.label_delete_sucess);
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
    });
  }

  onCancelModal = () => {
    this.setState({ 
      visible: false
    });
  }

  onOkModal = () => {
    const { form } = this.state;
    apiGains.put(`/update/${form._id}`, form)
    document.location.reload(true);
  }

  onEdit = (id) => {
    apiGains.get(`/show/${id}`)
      .then(res => {
        this.setState({
          form: res.data.gain
        });
      })
      .catch(err => console.warn(err));
  }

  handleEditGain = (id) => {
    this.onEdit(id);
    this.setState({
      visible: true
    });
  }

  handleDelete = (id) => {
    apiGains.delete(`/delete/${id}`);
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
      title: translatedText.label_date
    },
  
    {
      key: 'description',
      dataIndex: 'description',
      title: translatedText.label_description
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
          <Button style={{ width: 30, textAlign: 'center' }} type='primary' size={'small'} onClick={ () => this.handleEditGain(textColumn._id) } ghost>
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

    apiGains.get('/', (req, res) => {
      res.send(req.data)
    })
      .then(res => this.setState((prev, props) => ({
        data: {
          ...prev.data,
          gains: res.data.gains
        }
      })))
      .catch(err => console.warn(err));
    
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 13
      }
    };

    return(
      <MainLayout content={
        <div>
          <Title level={3} style={{paddingTop: 10, paddingBottom: 50}}>
            <div> 
              <Row>
                <Col span={8}>{translatedText.title_list}</Col>
                <Col span={11} style={{ textAlign: 'center' }}> 
                  <RangePicker onChange={this.onChangeDate} format="DD/MM/YYYY" />
                </Col>
                <Col span={5} style={{ textAlign: 'right' }}>
                  <Button type='primary' style={{ marginLeft: 10 }}> 
                    <Link to='/historico-ganhos/novo'>{translatedText.title_add}</Link> 
                  </Button>
                </Col>
              </Row>
            </div>
          </Title>
         
          <Table rowKey="_id" columns={this.columns} dataSource={this.state.data.gains} onChange={this.handleChange} />

          <Modal title={translatedText.title_edit} visible={this.state.visible} onOk={this.onOkModal} onCancel={this.onCancelModal} okText={translatedText.button_ok} cancelText={translatedText.button_cancel}>

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label={translatedText.label_description}>
                {getFieldDecorator('description', {
                  initialValue: this.state.form && this.state.form.value, rules: [{ required: true, message: translatedText.error_message_value }],
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

const WrappedHistoryGain = Form.create()(HistoryGain);
export default WrappedHistoryGain;