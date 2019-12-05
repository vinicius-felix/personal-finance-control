import React, { Component } from 'react';
import { MainLayout } from './../MainLayout';
import { Modal, Form, Input, Table, Divider, Button, Icon, Popconfirm, message, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import apiAuth from '../../Services/service-auth'
import { text } from '../../Config/config';

const translatedText = text.users;
const { Title } = Typography;

class Users extends Component{
  state = {
    visible: false,
    data: {
      users: []
    },
    form: {}
  }  

  onConfirm = async (id) => {
    message.success(translatedText.label_delete_sucess);
    await this.handleDelete(id);
    document.location.reload(true);
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  }

  handleDelete = (id) => {
    apiAuth.delete(`/delete/${id}`);
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

  onEdit = (id) => {
    apiAuth.get(`/show/${id}`)
      .then(res => {
        this.setState({
          form: res.data.users
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

  onCancelModal = () => {
    this.setState({ 
      visible: false
    });
  }

  onOkModal = () => {
    const { form } = this.state;
    apiAuth.put(`/update/${form._id}`, form)
    document.location.reload(true);
  }
  
  columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: translatedText.label_name
    },  
  
    {
      key: 'email',
      dataIndex: 'email',
      title: translatedText.email
    },
  
    {
      key: 'actions',
      title: translatedText.label_actoins,
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

  componentDidMount() {
    apiAuth.get('/', (req, res) => {
      res.send(req.data)        
    })
    .then(res => this.setState((prev, props) => ({
      data: {
        ...prev.data,
        users: res.data.user
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
                <Col span={12}>{translatedText.label_list}</Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Button type='primary' style={{ marginLeft: 10 }}> 
                    <Link to='/usuarios/novo'>{translatedText.label_new}</Link> 
                  </Button>
                </Col>
              </Row>
          </div>
        </Title>

        <Table rowKey="_id" columns={this.columns} dataSource={this.state.data.users} onChange={this.handleChange} />

        <Modal title={translatedText.title_edit} visible={this.state.visible} onOk={this.onOkModal} onCancel={this.onCancelModal} okText={translatedText.button_ok} cancelText={translatedText.button_cancel}>
          
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label={translatedText.label_name}>
              {getFieldDecorator('name', {
                initialValue: this.state.form && this.state.form.name, rules: [{ required: true, message: translatedText.error_message_name }],
              })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_name} />)}
            </Form.Item>

            <Form.Item label={translatedText.label_email}>
              {getFieldDecorator('email', {
                initialValue: this.state.form && this.state.form.email, rules: [{ required: true, message: translatedText.error_message_email }],
              })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_email} />)}
            </Form.Item>

            {/* <Form.Item label={translatedText.label_password}>
              {getFieldDecorator('password', {
                initialValue: this.state.form && this.state.form.password, rules: [{ required: true, message: translatedText.error_message_password }],
              })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_password} />)}
            </Form.Item> */}

          </Form>

        </Modal>

        </div>
      } />
    )
  }
}

const WrappedUsers = Form.create()(Users);
export default WrappedUsers;