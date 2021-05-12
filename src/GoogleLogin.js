import React, { Component } from 'react'

export default class GoogleLogin extends Component {
    constructor(props){
        super(props);
        this.state={logged:this.props.logged}
    }

    manejarOnClick = (evento) => {
        evento.preventDefault();
        if(this.state.logged===false){
            this.login()
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
        return(
            <div className='row d-flex justify-content-center'>
                <div className='col'>
                    <a 
                        className='btn btn-dark color-light w-100'
                        href = '/#'
                        onClick={this.manejarOnClick}>
                        Ingresar con Google <span><i className='fa fa-google fa-fw'></i></span>
                    </a>
                </div>
            </div>
        )
    }
};
