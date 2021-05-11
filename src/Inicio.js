import React, { Component } from 'react'

export default class Inicio extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Hola {this.props.nombre}</h1>               
            </div>
        )
    }
};