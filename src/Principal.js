import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import Place from './Place'
import Rating from './Rating'
import Horario from './Horario'

export default class Principal extends Component {
    render(){
        return(
            <main className='row justify-content-center my-4'>
                <div className='col-12 col-md-6'>
                    <form className='input-group'>
                        <input 
                            className='form-control'
                            placeholder='Busca un lugar'/>
                        <button 
                            className='btn btn-outline-dark input-group-text d-flex flex-row'>
                            <span className='d-none d-md-block'>Buscar &nbsp;</span>
                            <i className="fa fa-search"></i>
                        </button>
                    </form>
                </div>
            </main>
        )
    }
};