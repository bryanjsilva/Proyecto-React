import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'

// Este componente muestra y oculta los lugares cercanos a la ubicación del usuario o a los lugares buscados

// Se maneja este evento de click para pasar los datos del lugar clickeado a la app principal y realizar la actualización del mapa, rating, etc.

// Además se muestra el rating y una foto de cada lugar cercano. 

// Se añade un botón dentro de estos lugares cercanos para mostrar el resto de lugares cercanos, estos son pasados como props desde la pantalla principal.

function manejarOnClick(evento){
    if(evento.target.id==='lugar'){
        evento.preventDefault();
        document.getElementById('origen').value = evento.target.innerHTML;
        document.getElementById('boton').click();
    }
    
}

export default function Cercanos(props){
    
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    let nombre = '';
    let calificacion = '';
    let foto = '';
    let cercanos = [];
    let comentario;
    let mostrarMas=[];
    
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
                starRatedColor='gold' 
                numberOfStars={5} 
                name='rating' 
                starDimension='1.8rem'
                starSpacing='0.1rem'
            />);
        }
        cercanos.push(
            <section key={index} className='row d-flex justify-content-center'>
                <div className='col-lg-6 card m-2 p-2'>
                    <div className='card-title text-center'>
                        <a 
                            className='btn btn-link color-primary fw-bold' 
                            id='lugar' 
                            href='/#'
                            onClick={(evento)=>{
                                manejarOnClick(evento)
                                setOpen(false);
                                setOpen1(false);
                            }}>
                                {nombre}
                        </a>
                    </div>
                    <div className='card-text text-center'>
                        Rating: {calificacion} &nbsp;
                        {comentario}
                        <img className='w-100 rounded mt-3' src={foto} alt='foto de lugares buscados'></img>
                    </div>
                </div>
            </section>
        )
    })

    props.mas.map((mas,index) => {
        nombre = mas.name;
        if(mas.photos){
            mas.photos.map((masFoto, index)=>{
                if(index<1){
                    foto=masFoto.getUrl({
                        'minWidth': 160,
                        'minHeight':120
                    })
                }
            })
        }else{
            foto='';
        }
        if(mas.rating === undefined){
            calificacion = 0;
            comentario = 'No disponible'
        }else{
            calificacion = mas.rating;
            comentario = (<StarRatings 
                rating={calificacion}   
                starRatedColor='gold' 
                numberOfStars={5} 
                name='rating' 
                starDimension='1.8rem'
                starSpacing='0.1rem'
            />);
        }
        mostrarMas.push(
            <section key={index} className='row d-flex justify-content-center'>
                <div className='col-lg-6 card m-2 p-2'>
                    <div className='card-title text-center'>
                        <a 
                            className='btn btn-link color-primary fw-bold' 
                            id='lugar' 
                            href='/#'
                            onClick={(evento)=>{
                                manejarOnClick(evento)
                                setOpen(false);
                                setOpen1(false);
                            }}>
                                {nombre}
                        </a>
                    </div>
                    <div className='card-text text-center'>
                        Rating: {calificacion} &nbsp;
                        {comentario}
                        <img className='w-100 rounded mt-3' src={foto} alt='foto de lugares buscados'></img>
                    </div>
                </div>
            </section>
        )
    })


    const nombreBoton = open ? 'Ocultar lugares cercanos' : 'Ver lugares cercanos';
    const boton = open1 ? 'menos' : 'más';
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
                    <section className='row justify-content-center'>
                        <>
                            <Button
                                className='my-4 w-auto'
                                variant='link'
                                onClick={()=>setOpen1(!open1)}
                                aria-controls='collapse-text'
                                aria-expanded={open1}>
                                {'Mostrar '+boton}
                            </Button>
                            <Collapse in={open1}>
                                <section>{mostrarMas}</section>
                            </Collapse>
                        </>
                    </section>
                </div>
            </Collapse>
        </>
        )
}
