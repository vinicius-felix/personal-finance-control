import React, { Component } from 'react';
import { MainLayout } from './../MainLayout';
import { Row, Col, Typography } from 'antd';
import { PieChart, Pie, Legend, Tooltip, Cell, ComposedChart, Line, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import apiSpends from '../../Services/service-spends';
import apiCategories from '../../Services/service-categories';
import { text } from '../../Config/config';
import 'antd/dist/antd.css';

const translatedText = text.charts;
const { Title } = Typography;

let dataChart = []
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Graphics extends Component{
  state = {
    data: {},
    loading: false
  }

  setChartData = () => {
    let categories = this.state.data.categories;
    let spends = this.state.data.spends;
    dataChart = []

    categories && categories.map(category => {
      let cats = spends && spends.filter((spend) => {
        return spend.name.toLowerCase() === category.name.toLowerCase();
      });

      let sumCat = cats.reduce((sum, calcs) => {
        return sum + calcs.value;
      }, 0);

      sumCat > 0 && dataChart.push(Object.assign({ name: category.name, value: sumCat}));
    })

    return dataChart;
  }
  
  async componentDidMount(){

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
      
      apiCategories.get('/',  (req, res) => {
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
    
    dataChart = this.setChartData();
    
    return(
      <MainLayout content={
        <div>
          <Title level={3} style={{paddingTop: 10, paddingBottom: 50}}>{translatedText.title_chart}</Title>
          <Row>

            { dataChart.length > 0 && <Col span={24}>
              <PieChart width={500} height={300}>
                <Pie data={dataChart} outerRadius={80} fill="#8884d8" dataKey="value" label>
                  { dataChart && dataChart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />) }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Col>}

            { dataChart.length > 0 && <Col span={24}>
              <ComposedChart
                width={500}
                height={300}
                data={dataChart}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
              }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="value" />
                <Bar dataKey="value" fill="#82ca9d" />
                <Line type="monotone" dataKey="value" stroke="#ff7300" />
                <Tooltip />
                <Legend />
              </ComposedChart>
            </Col>}

          </Row>
        </div>
      } />
    )    
  }
}

export default Graphics;