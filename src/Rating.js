import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import StarRatings from 'react-star-ratings'

// Este componente permite mostrar una gráfica con estrellas para indicar el rating del lugar
// Se usó react-star-ratings para mostrar este gráfico
// Además para darle animación a los botones mostrar u ocultar comentarios se usa react-bootstrap

export default function Rating(props) {
  
    const [open, setOpen] = useState(false);

    var reviews;
    if (props.placeReviews && props.placeReviews.length > 0){
      reviews = props.placeReviews.map((review,index) => {
      return (
        <div key={index} className='row d-flex justify-content-center'>
          <div className='col-11 card d-flex my-1 mx-lg-5 p-2' >
            <div className='col-12 card-title'>
              <strong>{review.author_name}</strong>
            </div>
            <div className='col-12 card-text'>
              {review.text}
            </div>
          </div>
        </div>
      )
      })
    }else{
      reviews= <div className='row d-flex justify-content-center'>
                  <div key={1} className='col-10 col-lg-4 p-4 card'>
                    <strong className='text-center'>No hay comentarios</strong>
                  </div>
                </div>;
    }

    const nombreBoton = open ? 'Ocultar Comentarios' : 'Ver Comentarios';

    const mostrarRating = props.placeRating !== undefined ? 'd-block' : 'd-none';
    
    return (
      <div>
        <div className={'row d-flex justify-content-center flex-lg-row mt-3 text-center '+mostrarRating}>
          <strong className='col-12 col-md-2'><h4>Rating: </h4></strong>
          <h5>{props.placeRating}</h5>
          <span className='text-center col-12 col-lg-4'>
            <StarRatings 
              rating={props.placeRating}   
              starRatedColor='gold' 
              numberOfStars={5} 
              name='rating' 
              starDimension='1.8rem'
              starSpacing='0.1rem'
              />
          </span>
        </div>
        <>
          <Button
            className='my-4'
            variant='dark'
            onClick={() => setOpen(!open)}
            aria-controls="collapse-text"
            aria-expanded={open}
          >
            {nombreBoton}
          </Button>
          <Collapse in={open}>
            <div id="collapse-text">
              {reviews}
            </div>
          </Collapse>
        </>
      </div>

        
    )
  
}