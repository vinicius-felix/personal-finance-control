import React, { Component } from 'react';
import { MainLayout } from './../MainLayout';
import 'antd/dist/antd.css';
import { Form,Table, Divider, Button, Icon, Input, Popconfirm, message, Typography, Row, Col, Modal } from 'antd';
import apiCategories from '../../Services/service-categories';
import { Link } from 'react-router-dom';
import { text } from '../../Config/config';

const translatedText = text.categories;
const { Title } = Typography;

class Categories extends Component{
  state = {
    visible: false,
    data: {
      categories: []
    },
    form: {}
  }  

  onConfirm = async (id) => {
    message.success(translatedText.label_delete_success);
    await this.handleDelete(id);
    document.location.reload(true);
  }

  handleDelete = (id) => {
    apiCategories.delete(`/delete/${id}`);
  }

  onEdit = (id) => {    
    apiCategories.get(`/show/${id}`)
      .then(res => {
        this.setState({ 
          form: res.data.categories
        });
      })
      .catch(err => console.warn(err));
  }

  onCancelModal = () => {
    this.setState({ 
      visible: false 
    });
  }

  onOkModal = () => {
    const { form } = this.state;
    apiCategories.put(`/update/${form._id}`, form);
    document.location.reload(true);
  }

  handleEditSpend = (id) => {
    this.onEdit(id);
    this.setState({ 
      visible: true 
    });
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
  
  columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: translatedText.label_name,
      width: '80%'
    },  
  
    {
      key: 'actions',
      title: translatedText.label_actions,
      align: 'center',
      render: (textColumn, record) => (
        <span>
          <Button style={{ width: 30, textAlign: 'center' }} type='primary' size={'small'} onClick={ () => this.handleEditSpend(textColumn._id) } ghost> 
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
            <div>
              <Row>
                <Col span={12}>{translatedText.title_list}</Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  <Button type='primary'>
                    <Link to="/categorias/novo">{translatedText.title_new}</Link>
                  </Button>
                </Col>
              </Row>
            </div>
         </Title>        

          <Table rowKey="_id" columns={this.columns} dataSource={this.state.data.categories} pagination={false} />

          <Modal title={translatedText.title_edit} visible={this.state.visible} onOk={this.onOkModal} onCancel={this.onCancelModal} okText={translatedText.button_ok} cancelText={translatedText.button_cancel}>

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            
              <Form.Item label={translatedText.label_name}>
                {getFieldDecorator('name', {
                  initialValue: this.state.form && this.state.form.name, rules: [{ required: true, message: translatedText.error_message_name }],
                })(<Input onChange={this.onChange} placeholder={translatedText.placeholder_name} />)}
              </Form.Item>
              
            </Form>

          </Modal>

        </div>
      } />
    )
  }
}

const WrappedCategories = Form.create()(Categories);
export default WrappedCategories;