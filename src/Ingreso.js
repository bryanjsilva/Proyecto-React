import React, { Component } from 'react'

export default class Contacto extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Hello {this.props.nombre}</h1>               
            </div>
        )
    }
};
