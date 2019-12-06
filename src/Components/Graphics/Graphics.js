import React, { Component } from 'react';
import { MainLayout } from './../MainLayout';
import { Row, Col, Typography } from 'antd';
import { PieChart, Pie, Legend, Tooltip, Cell, ComposedChart, Line, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import apiSpends from '../../Services/service-spends';
import { text } from '../../Config/config';
import 'antd/dist/antd.css';

const translatedText = text.charts;
const { Title } = Typography;

const data = [
  { name: 'Lazer', value: 200 }, 
  { name: 'Mercado', value: 300 },
  { name: 'Combustivel', value: 350 }, 
  { name: 'Lar', value: 200 },
  { name: 'Farmacia', value: 270 }, 
  { name: 'Outros', value: 150 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Graphics extends Component{
  state = {
    data: {}
  }

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

  }

  render(){
    return(
      <MainLayout content={
        <div>
          <Title level={3} style={{paddingTop: 10, paddingBottom: 50}}>{translatedText.title_chart}</Title>
          <Row>
            <Col span={12}>
              { this.state && this.state.data && <PieChart width={500} height={300}>
                <Pie data={this.state.data.spends} outerRadius={80} fill="#8884d8" dataKey="value" label>
                  { data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />) }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>}
            </Col>

            {/* <Col span={12}>
              <ComposedChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis dataKey="value" />
                <Bar dataKey="value" fill="#82ca9d" />
                <Line type="monotone" dataKey="value" stroke="#ff7300" />
                <Tooltip />
                <Legend />
              </ComposedChart>
            </Col> */}
          </Row>
          {console.log(this.state)}
        </div>
      } />
    )
  }
}

export default Graphics;