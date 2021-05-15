import React, { Component } from 'react'
import './Contacto.css'

export default class Contacto extends Component {

    render(){
        return(
            <div className='row text justify-content-center text-justify' style={{marginTop: 20 + 'vh'}}>
                <div className='col-12 col-lg-6'>
                    <h1>Sobre nosotros</h1><br/>
                    <h2>Esta app...</h2><br/>
                    <p>Hemos creado una aplicación en donde encontrarás diferentes lugares y las rutas que deberás seguir para llegar. Además cuenta con un sistema de rating y comentarios que te permitirán conocer las opiniones de otros usuarios.</p><br/>
                    <h2>¡Síguenos!</h2><br/>
                    <section className='d-flex justify-content-around'>
                        <a href='https://www.facebook.com' target='_blank' rel="noreferrer">
                            <i className='fa fa-facebook fa-fw redes'></i>
                        </a>
                        <a href='https://www.linkedin.com' target='_blank' rel="noreferrer">
                            <i className='fa fa-linkedin fa-fw redes'></i>
                        </a>
                        <a href='https://www.instagram.com' target='_blank' rel="noreferrer">
                            <i className='fa fa-instagram fa-fw redes'></i>
                        </a>
                        <a href='https://www.twitter.com' target='_blank' rel="noreferrer">
                            <i className='fa fa-twitter fa-fw redes'></i>
                        </a>
                        <a href='https://www.github.com/bryanjsilva' target='_blank' rel="noreferrer">
                            <i className='fa fa-github fa-fw redes'></i>
                        </a>
                    </section>
                </div>
            </div>
        )
    }
};