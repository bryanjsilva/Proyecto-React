import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import favicon from './img/paseando-ando-favicon-min.png'
import './App.css'
import Inicio from './Inicio'
import Contacto from './Contacto'
import Ingreso from './Ingreso'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      logged: false,
      nombreIngreso: 'Ingresar'
    }
  }

  render(){
    return(
      <Router>
        <div className='container-fluid'>
          <div className='row'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <div className='col-4 col-md-1 text-center'>
                  <a className="navbar-brand" href='/'>
                    <img className='w-50' src={favicon} alt='logo paseando ando'></img>
                  </a>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="collapse navbar-collapse text-center navbar-nav d-lg-flex" id="navbarNavAltMarkup">
                    <li className='nav-item me-lg-auto'>
                      <NavLink to='/' className='nav-link'>Inicio</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink to='/contacto' className='nav-link'>Contacto</NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink to='/ingreso' className='nav-link'>{this.state.nombreIngreso}</NavLink>
                    </li>
                  </ul>
              </div>
            </nav>
          </div>
          <div className='container-fluid'>
            <Switch>
              <Route path='/' exact>
                <Inicio />
              </Route>
              <Route path='/contacto'>
                <Contacto />
              </Route>
              <Route path='/ingreso'>
                <Ingreso />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

};


