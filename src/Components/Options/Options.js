import React, { Component } from 'react';
import { MainLayout } from './../MainLayout';
import { Radio, Card, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import * as enUs from '../../Config/enUS.json';
import * as ptBr from '../../Config/ptBR.json';
import { SliderPicker } from 'react-color';
import { text } from '../../Config/config';

const translatedText = text.settings;
const layoutSettings = JSON.parse(localStorage.getItem('layoutColors'));
const languageSettings = JSON.parse(localStorage.getItem('text'));
const paddingTop = {
  paddingTop: 70
};
const colorsDefault = {
  header: '#349beb',
  menu: '#596370',
  background: '#ffffff',
  footer: '#d1dee8'
};

class Options extends Component{

  state = {
    header: layoutSettings.header,
    footer: layoutSettings.footer,
    background: layoutSettings.background,
    menu: layoutSettings.menu,
    language: languageSettings.language
  };
    
  setUserLanguage = (e) => {
    e.target.value.includes('en-us')
      ? localStorage.setItem('text', JSON.stringify(enUs.default))
      : localStorage.setItem('text', JSON.stringify(ptBr.default))
    ;
    
    document.location.reload(true);
  }

  handleChangeHeader = (color) => {
    this.setState((prev, props) => ({ ...prev, header: color.hex }));
  };

  handleChangeMenu = (color) => {
    this.setState((prev, props) => ({ ...prev, menu: color.hex }));
  };

  handleChangeBackground = (color) => {
    this.setState((prev, props) => ({ ...prev, background: color.hex }));
  };

  handleChangeFooter = (color) => {
    this.setState((prev, props) => ({ ...prev, footer: color.hex }));
  };

  changeLayout = () => {    
    localStorage.setItem('layoutColors', JSON.stringify(this.state));
    window.location.reload(true);
  }

  restoreLayout = async () => {
    await this.setState({
      header: colorsDefault.header,
      menu: colorsDefault.menu,
      background: colorsDefault.background,
      footer: colorsDefault.footer
    });
    await localStorage.setItem('layoutColors', JSON.stringify(this.state));
    window.location.reload(true);
  }

  render(){

    return(
      <MainLayout content={
        <div>
          <Card title={translatedText.language} style={{textAlign: 'center'}}>
            <Radio.Group onChange={this.setUserLanguage} defaultValue={this.state.language}>
              <Radio.Button value='pt-br'>Português(Brasil)</Radio.Button>
              <Radio.Button value='en-us'>English(US)</Radio.Button>
            </Radio.Group>
          </Card>

          <Card style={{marginTop: 30}} title={translatedText.title} extra={<Button onClick={() => { this.restoreLayout() }}>{translatedText.label_restore}</Button>}>
            <Row>
              <Col span={6}><b>{translatedText.label_component}</b></Col>
              <Col span={18}><b>{translatedText.label_color}</b></Col>
            </Row>

            <Row style={paddingTop}>
              <Col span={6}>{translatedText.header}</Col>
              <Col span={18}>
                <SliderPicker color={ this.state.header } onChange={ this.handleChangeHeader } />
              </Col>
            </Row>

            <Row style={paddingTop}>
              <Col span={6}>{translatedText.menu}</Col>
              <Col span={18}>
                <SliderPicker color={ this.state.menu } onChange={ this.handleChangeMenu } />
              </Col>
            </Row>

            <Row style={paddingTop}>
              <Col span={6}>{translatedText.background}</Col>
              <Col span={18}>
                <SliderPicker color={ this.state.background } onChange={ this.handleChangeBackground } />
              </Col>
            </Row>

            <Row style={paddingTop}>
              <Col span={6}>{translatedText.footer}</Col>
              <Col span={18}>
                <SliderPicker color={ this.state.footer } onChange={ this.handleChangeFooter } />
              </Col>
            </Row>

            <Row style={{...paddingTop, textAlign: 'right'}}>
              <Button type='primary' onClick={this.changeLayout}>{translatedText.label_confirm}</Button>
            </Row>
            
          </Card>
          {console.log(this.state)}
          
        </div>
      } />
    )
  }
}

export default Options;