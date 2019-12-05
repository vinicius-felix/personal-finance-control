import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Components/Login';
import Home from './Components/Home';
import HistorySpend from './Components/Spends/HistorySpend';
import Options from './Components/Options/Options';
import SpendForm from './Components/Spends/SpendForm';
import HistoryGain from './Components/Gains/HistoryGain';
import GainForm from './Components/Gains/GainForm';
import Graphics from './Components/Graphics/Graphics';
import Categories from './Components/Categories/Categories';
import CategoryForm from './Components/Categories/CategoryForm';
import Users from './Components/Users/Users';
import UsersForm from './Components/Users/UsersForm';
import NotFoundPage from './Components/NotFoundPage';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/login' component={Login} />

      <PrivateRoute exact path='/' component={Home} />
      <PrivateRoute exact path='/historico-gastos' component={HistorySpend} />
      <PrivateRoute exact path='/historico-gastos/novo' component={SpendForm} />
      <PrivateRoute exact path='/historico-ganhos' component={HistoryGain} />
      <PrivateRoute exact path='/historico-ganhos/novo' component={GainForm} />
      <PrivateRoute exact path='/graficos' component={Graphics} />
      <PrivateRoute exact path='/categorias' component={Categories} />
      <PrivateRoute exact path='/categorias/novo' component={CategoryForm} />
      <PrivateRoute exact path='/usuarios' component={Users} />
      <PrivateRoute exact path='/usuarios/novo' component={UsersForm} />
      <PrivateRoute exact path='/opcoes' component={Options} />

      <Route path='*' component={NotFoundPage} />
    </Switch>
  </BrowserRouter>, 
  document.getElementById('root')
);