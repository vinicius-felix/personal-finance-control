import React, { Component } from 'react';
import { MainLayout } from './../MainLayout';
import { Row, Col } from 'antd';
import { PieChart, Pie, Legend, Tooltip, Cell, ComposedChart, Line, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import 'antd/dist/antd.css';

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
    response: ''
  }  

  render(){
    return(
      <MainLayout content={
        <Row>
          <Col span={12}>
            <PieChart width={500} height={300}>
              <Pie data={data} outerRadius={80} fill="#8884d8" dataKey="value" label>
                { data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />) }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Col>

          <Col span={12}>
            <ComposedChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <Bar dataKey="value" fill="#82ca9d" />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
              <Tooltip />
              <Legend />
            </ComposedChart>
          </Col>
        </Row>
      } />
    )
  }
}

export default Graphics;