import React, { Component } from 'react'
import logo from './img/logo-min.png'
import './Ingreso.css'
import Principal from './Principal'

export default class Contacto extends Component {

    constructor(props){
        super(props);
        this.state={
            logged: this.props.logged,
            google: false,
            facebook: false,
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
            if(this.state.google){
                this.logout()
            }
        }
        if(evento.target.id==='google'){
            if(this.state.logged===false){
                this.login()
            }
        }
        if(evento.target.id==='facebook'){
            if(!this.FB) this.FB = window.FB;
            if(this.FB){
                if(this.state.facebook){
                    this.FB.logout(this.fbLoginStatus)
                }else{
                    this.FB.login(this.fbLoginStatus)
                }
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
                    this.setState({
                        logged:true,
                        google:true
                    })
                    this.props.statusIngreso(true)
                },
                (error) => {
                    this.setState({
                        logged:false,
                        google:false
                    })
                    this.props.statusIngreso(false)
                }
            )
        }else{
            this.setState({
                logged:true,
                google:true})
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
        this.iniciarFB()
    }

    iniciarFB = () => {
        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : '304936961046186',
              cookie     : true,
              xfbml      : true,
              version    : 'v10.0'
            });   
            window.FB.AppEvents.logPageView();   
            var fbListo = new Event('FBListo');
            document.dispatchEvent(fbListo);
           
        };
        
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v10.0&appId=304936961046186&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        document.addEventListener('FBListo', this.fbLoginStatus);
      }
  
      fbLoginStatus = () => {
        this.FB = window.FB;
        var logged='';
        this.FB.getLoginStatus((response) => {
          const loginStatus = response.status;
          switch (loginStatus) {
              case 'connected':
                logged=true;
                break;
              default:
                logged=false;
                break;
          }
        });
        this.setState({
            logged:logged,
            facebook:logged
        })
        this.props.statusIngreso(logged);
      }

    render(){
        if(this.state.logged){
            return(
                <div className='fluid-container' style={{marginTop: 12 + 'vh'}}>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-end my-3'>
                            <a 
                                href='/#'
                                id='salir' 
                                className='btn btn-outline-dark align-self-end'
                                onClick={this.manejarOnClick}>Salir <i className='fa fa-sign-out fa-fw'></i>
                            </a>
                        </div>
                    </div>
                    <Principal logged={this.state.logged}/>
                </div>
            )
        }else{
            return(
                <div className='row justify-content-center' style={{marginTop: 15 + 'vh'}}>
                    <div className='col-9 col-md-5 col-lg-2 text-center mb-2'>
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
                                        <i className='fa fa-lock fa-fw' />
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
                                <hr/>
                                <a 
                                    className='btn btn-dark color-light w-100 mb-2'
                                    href = '/#'
                                    id='google'
                                    onClick={this.manejarOnClick}>
                                        Ingresar con Google &nbsp;<span><i className='fa fa-google fa-fw'></i></span>
                                </a>
                                <a 
                                    className='btn btn-primary color-light w-100 mb-2'
                                    href = '/#'
                                    id='facebook'
                                    onClick={this.manejarOnClick}>
                                        Ingresar con Facebook &nbsp;<span><i className='fa fa-facebook fa-fw'></i></span>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
};
