import React, { Component } from 'react'
import logo from './img/logo-min.png'

export default class Inicio extends Component {

    render(){
        return(
            <div className='row mt-4 justify-content-center'>
                <div className='col-12 col-md-5'>
                    <img className='w-100' src={logo} alt='Logo paseando ando'></img>               
                </div>
                <div className='col-12 col-md-5 d-flex flex-column align-items-center justify-content-around wave'>
                    <h1 className='fw-bold'>Elige tu destino</h1><br/>
                    <h2 className='fw-bold'>Busca un lugar,</h2><br/>
                    <h2 className='fw-bold'>elige la ruta</h2><br/>
                    <h3 className='fw-bold'>y disfruta...</h3>
                </div>
            </div>
        )
    }
};