import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'

export default function Cercanos(props){
    
    const [open, setOpen] = useState(false);
    let nombre = '';
    let calificacion = '';
    let foto = '';
    let cercanos = [];
    let comentario;
    
    props.lugares.map((lugar,index) => {
        nombre = lugar.name;
        if(lugar.photos){
            lugar.photos.map((fotoLugar, index)=>{
                if(index<1){
                    foto=fotoLugar.getUrl({
                        'minWidth': 160,
                        'minHeight':120
                    })
                }
            })
        }else{
            foto='';
        }
        if(lugar.rating === undefined){
            calificacion = 0;
            comentario = 'No disponible'
        }else{
            calificacion = lugar.rating;
            comentario = (<StarRatings 
                rating={calificacion}   
                starRatedColor='goldenrod' 
                numberOfStars={5} 
                name='rating' 
                starDimension='1.8rem'
                starSpacing='0.1rem'
            />);
        }
        cercanos.push(
            <section key={index} className='row d-flex justify-content-center'>
                <div className='col-lg-6 card m-2 p-2'>
                    <div className='card-title'>
                        <strong>{nombre}</strong>
                    </div>
                    <div className='card-text'>
                        Rating: {calificacion} &nbsp;
                        {comentario}
                        <img className='w-100 rounded mt-3' src={foto}></img>
                    </div>
                </div>
            </section>
        )
    })

    const nombreBoton = open ? 'Ocultar lugares cercanos' : 'Ver lugares cercanos';
    return(
        <>
            <Button
                className='my-4'
                variant='outline-dark'
                onClick={()=>setOpen(!open)}
                aria-controls='collapse-text'
                aria-expanded={open}
            >
                {nombreBoton}
            </Button>
            <Collapse in={open}>
                <div id='collapse-text' className='mx-2 p-3'>
                    {cercanos}
                </div>
            </Collapse>
        </>
        )
}
