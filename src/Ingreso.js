import React, { Component } from 'react'
import logo from './img/logo-min.png'
import './Ingreso.css'

export default class Contacto extends Component {

    constructor(props){
        super(props);
        this.state={
            logged: this.props.logged,
            emailValido:'',
            passValida:'',
            emailError:'',
            passError:'',
        }
    }

    validarEmail = (email) => {
        return(
            /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        )
    }

    validarPass = (pass) => {
        return(
            pass.length < 5 ? false : true
        )
    }

    validarIngreso = () => {
        this.setState({
            logged: true,
        })
        this.props.statusIngreso(true)
    }

    manejarOnClick = (evento) => {
        if(evento.target.id==='ingreso'){
            let emailValue = document.getElementById('email').value;
            let passValue = document.getElementById('pass').value;
            let emailValido = this.validarEmail(emailValue);
            let passValido = this.validarPass(passValue);

            if(emailValido && passValido){
                this.setState({
                    emailError:'',
                    passError:''
                })
                this.validarIngreso()
            }else if(!emailValido){
                this.setState({
                    emailError:'Correo inválido'
                })
            }else if(!passValido){
                this.setState({
                    passError:'Contraseña inválida'
                })
            }
        }
        if(evento.target.id==='salir'){
            this.setState({logged: false})
        }
        evento.preventDefault();
    }
    
    render(){
        if(this.state.logged){
            return(
                <div>
                    <a 
                        href='/#'
                        id='salir' 
                        className='btn btn-outline-dark'
                        onClick={this.manejarOnClick}>Salir</a>
                </div>
            )
        }else{
            return(
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-6 col-lg-3 text-center mb-2'>
                        <img className='w-100' src={logo} alt='logo paseando ando'/>
                    </div>
                    <div className='row d-flex w-100 p-0 justify-content-center'>
                        <div className='col-12 col-md-6 col-lg-3'>
                            <form className='form-group'>
                                <h2 className='text-center mb-3'>Ingresar</h2>
                                <div className='input-group my-2'>
                                    <span className='input-group-text bg-white'>
                                        <i className='fa fa-envelope fa-fw' />
                                    </span>
                                    <input type='email' className='form-control' placeholder='Correo electrónico' id='email'/>
                                </div>
                                <small
                                    className='text-danger'>
                                        {this.state.emailError}
                                </small>
                                <div className='input-group my-2'>
                                    <span className='input-group-text bg-white'>
                                        <i className='fa fa-key fa-fw' />
                                    </span>
                                    <input type='password' className='form-control' placeholder='Contraseña' id='pass'/>
                                </div>
                                <small
                                    className='text-danger'>
                                        {this.state.passError}
                                </small>
                                <a 
                                    className='btn primary w-100 my-2'
                                    href='/ingreso'
                                    id='ingreso'
                                    onClick={this.manejarOnClick}>
                                        Ingresar &nbsp;<span><i className='fa fa-sign-in fa-fw'></i></span>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
};
