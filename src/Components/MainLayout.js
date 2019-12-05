import React, { Component } from 'react';
import { Layout, Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';
// import logo from '../Images/logo4.png';
import 'antd/dist/antd.css';
import { text } from '../Config/config';

const translatedText = text.menu;
const { Header, Footer, Content, Sider } = Layout;
const layout = JSON.parse(localStorage.getItem('layoutColors'));

const fillWindow = {
    height: '100%',
    position: 'absolute',
    left: '0',
    width: '100%',
    overflow: 'hidden'
}

const colorWhite = {
  color: 'white'
}

const paddingAll = {
  padding: 10
}

const menus = [  
  {
    name: translatedText.home,
    icon: 'home',
    to: '/'
  }, 
  
  {
    name: translatedText.spends,
    icon: 'minus-circle',
    to: '/historico-gastos'
  },

  {
    name: translatedText.gains,
    icon: 'plus-circle',
    to: '/historico-ganhos'
  },
  
  {
    name: translatedText.charts,
    icon: 'pie-chart',
    to: '/graficos'
  },
  
  {
    name: translatedText.categories,
    icon: 'database',
    to: '/categorias'
  },

  {
    name: translatedText.settings,
    icon: 'setting',
    to: '/opcoes'
  },

  {
    name: translatedText.users,
    icon: 'user',
    to: '/usuarios'
  },
  
]

export class MainLayout extends Component{

  state = {
    text: JSON.parse(localStorage.getItem('text'))
  }

  render(){    
    
    return(
      <MainLayoutSite content={this.props.content} />
    )
  }
}

const MainLayoutSite = (props) => (
  
  <Layout style={fillWindow}>

    <Header style={{backgroundColor: layout.header }}>
      <Col span={3}></Col>
      <Col span={18}>
        <h3 style={{...colorWhite, textAlign: 'center'}}>Personal Finance Control</h3>
      </Col>
      <Col span={3}>
        <Link style={{color: 'white'}} to='/login' onClick={ () => localStorage.clear() }>
          {translatedText.logout}
          <Icon style={{color:'white', fontSize: 15, marginLeft: 5}} type='logout' />
        </Link>
        
      </Col>
    </Header>

    <Layout style={{ backgroundColor: 'white' }}>

      <Sider style={{ backgroundColor: layout.menu, paddingTop: "14%" }}>

        {/* <img src={logo} alt='logo' style={{ width: 140, marginLeft: 30, marginBottom: 10 }} /> */}

        { menus.map(menu => (
          <Row key={menu.name} style={paddingAll}>
            <Col span={5} />
            <Col span={4}><Icon style={{color:'white', fontSize: 18}} type={menu.icon} /></Col>
            <Col span={10}><Link style={{color: 'white'}} to={menu.to}>{menu.name}</Link></Col>
            <Col span={5} />
          </Row>
          ))
        }

      </Sider>

      <Content style={{ backgroundColor: layout.background }}>

        <Col span={2} />

        <Col span={20} style={{ paddingTop: 50 }}>
          {props.content}
        </Col>

        <Col span={2} />

      </Content>
    </Layout>

    <Footer style={{fontSize: 10, textAlign: 'center', backgroundColor: layout.footer}}>{translatedText.version} 1.0.0</Footer>
    
  </Layout>    
);