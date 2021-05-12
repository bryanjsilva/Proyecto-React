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
            pass.length < 4 ? false : true
        )
    }

    validarIngreso = () => {
        this.setState({
            logged: true,
        })
        this.props.statusIngreso(true)
        console.log(this.state.logged)
        console.log(this.props.statusIngreso)
    }

    manejarOnClick = (evento) => {
        evento.preventDefault();
        if(evento.target.id==='ingreso'){
            let emailValue = document.getElementById('email').value;
            let passValue = document.getElementById('pass').value;
            let emailValido = this.validarEmail(emailValue);
            let passValido = this.validarPass(passValue);

            if(!emailValido){
                this.setState({emailError: 'El correo ingresado no es válido'})
            }else{
                this.setState({emailError: ''})
            }

            if(!passValido){
                this.setState({passError: 'La contraseña ingresada no es válida'})
            }else{
                this.setState({passError: ''})
            }

            if(emailValido && passValido){
                this.validarIngreso();
            }
        }
        if(evento.target.id==='salir'){
            this.setState({logged: false})
            this.props.statusIngreso(false)
            this.logout()
        }
        if(evento.target.id==='google'){
            if(this.state.logged===false){
                this.login()
            }
        }
    }
    
    manejarOnChange = (evento) => {
        if(evento.target.id==='email'){
            let emailValido = this.validarEmail(evento.target.value)
            this.setState({
                emailError: '',
                emailValido: emailValido ? 'is-valid' : 'is-invalid'
            })
        }else if(evento.target.id==='pass'){
            let passValida = this.validarPass(evento.target.value)
            this.setState({
                passError: '',
                passValida: passValida ? 'is-valid' : 'is-invalid'
            })
        }
    }

    login = () => {
        const clientParam = {client_id: '874945298095-t4llq3ak7hs1rk5ivs08bd1iiifoilcc.apps.googleusercontent.com'}
        this.gapi.auth2.init(clientParam)
        const auth = this.gapi.auth2.getAuthInstance();
        const loggedInGoogle = auth.isSignedIn.get();
        if(!loggedInGoogle){
            auth.signIn().then(
                (success) => {
                    this.setState({logged:true})
                    this.props.statusIngreso(true)
                    console.log(this.state.logged)
                    console.log(this.props.statusIngreso)
                },
                (error) => {
                    this.setState({logged:false})
                    this.props.statusIngreso(false)
                }
            )
        }else{
            this.setState({logged:true})
            this.props.statusIngreso(false)
        }
    }

    logout = () => {
        const auth2 = this.gapi.auth2.getAuthInstance();
        auth2.signOut().then(
            (success) => {
                this.setState({logged:false})
                this.props.statusIngreso(false)
            },
            (error) => {
                console.log('Error al salir con google')
            }
        )
        auth2.disconnect();
    }

    componentDidMount = () => {
        const googleSignAPILoad = setInterval(() => {
            if(window.gapi){
                this.gapi = window.gapi
                clearInterval(googleSignAPILoad)
                this.gapi.load('auth2',function(){})
            };
        },100)
    }

    render(){
        if(this.state.logged){
            return(
                <div>
                    <a 
                        href='/#'
                        id='salir' 
                        className='btn btn-outline-dark'
                        onClick={this.manejarOnClick}>Salir <i className='fa fa-sign-out fa-fw'></i></a>
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
                                    <input type='email' className={'form-control '+this.state.emailValido} placeholder='Correo electrónico' 
                                    id='email'
                                    onChange={this.manejarOnChange}/>
                                </div>
                                <small
                                    className='text-danger'>
                                        {this.state.emailError}
                                </small>
                                <div className='input-group my-2'>
                                    <span className='input-group-text bg-white'>
                                        <i className='fa fa-key fa-fw' />
                                    </span>
                                    <input type='password' className={'form-control '+this.state.passValida} placeholder='Contraseña' id='pass'
                                    onChange={this.manejarOnChange}/>
                                </div>
                                <small
                                    className='text-danger'>
                                        {this.state.passError}
                                </small>
                                <a 
                                    className='btn primary w-100 mt-2'
                                    href='/ingreso'
                                    id='ingreso'
                                    onClick={this.manejarOnClick}>
                                        Ingresar &nbsp;<span><i className='fa fa-sign-in fa-fw'></i></span>
                                </a>
                                <a 
                                    className='btn btn-dark color-light w-100 mt-2'
                                    href = '/#'
                                    id='google'
                                    onClick={this.manejarOnClick}>
                                        Ingresar con Google <span><i className='fa fa-google fa-fw'></i></span>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
};
