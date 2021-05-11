import React, { Component } from 'react'
import logo from './img/logo-min.png'
import './Ingreso.css'

export default class Contacto extends Component {

    constructor(props){
        super(props);
        this.state={
            logged: false
        }
    }
    
    render(){
        return(
            <div className='row justify-content-center'>
                <div className='col-12 col-md-6 col-lg-3 text-center mb-2'>
                    <img className='w-100' src={logo} alt='logo paseando ando'/>
                </div>
                <div className='row d-flex w-100 p-0 justify-content-center'>
                    <div className='col-12 col-md-6 col-lg-4'>
                        <form className='form-group'>
                            <h2 className='text-center mb-3'>Ingresar</h2>
                            <div className='input-group mb-2'>
                                <span className='input-group-text bg-white'>
                                    <i className='fa fa-envelope fa-fw' />
                                </span>
                                <input type='email' className='form-control' placeholder='Correo electrónico' id='email'/>
                            </div>
                            <div className='input-group mb-2'>
                                <span className='input-group-text bg-white'>
                                    <i className='fa fa-key fa-fw' />
                                </span>
                                <input type='password' className='form-control' placeholder='Contraseña' id='pass'/>
                            </div>
                            <a className='btn primary w-100' href='/ingreso'>
                                Ingresar &nbsp;<span><i className='fa fa-sign-in fa-fw'></i></span>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};
