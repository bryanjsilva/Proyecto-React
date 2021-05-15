import React, { Component } from 'react'
import '../node_modules/font-awesome/css/font-awesome.css'
import StarRatings from 'react-star-ratings'

export default class Rating extends Component {
  constructor(props){
    super(props);
    this.state={mostrarComentarios:this.props.mostrarComentarios};
  }

  manejoOnClick = (e) => {
    if (e.target.id==='btnComentarios')
      this.setState((prevState) => {
        return {mostrarComentarios: !prevState.mostrarComentarios}
      })
  }

  render() {
    var reviews
    if (this.props.placeReviews && this.props.placeReviews.length > 0){
      console.log('1');
      reviews = this.props.placeReviews.map((review,index) => {
      return <div key={index} className='row mt-2 mb-1' >
                <div className='col-2'><strong>{review.author_name}</strong></div>
                <div className='col-10'>{review.text}</div>
              </div>;
      })
    }else{
      console.log('2');
      reviews = <div key={1} className='row' >
                <strong>No hay comentarios</strong>
              </div>;
    }

    const btnName = this.state.mostrarComentarios ? 'Ocultar Comentarios' : 'Mostrar Comentarios';
    const mostrar = this.state.mostrarComentarios ? 'd-block' : 'd-none'
    return (
      <div className='container'>
        <div className='row d-flex justify-content-center flex-lg-row mt-3 mb-5 text-center'>
          <strong className='col-12 col-md-2'><h4>Rating: </h4></strong>
          <h5>{this.props.placeRating}</h5>
          <span className='text-center col-12 col-lg-4'>
            <StarRatings 
              rating={this.props.placeRating}   
              starRatedColor='goldenrod' 
              numberOfStars={5} 
              name='rating' 
              starDimension='1.8rem'
              starSpacing='0.1rem'
              />
          </span>
        </div>
        <div className='mb-3 '><a  className='btn btn-primary' href='/#' id='btnComentarios' onClick={this.manejoOnClick}>{btnName}</a></div>
        <div className={'container '+mostrar}>
          {reviews}
        </div>
      </div>
    )
  }
}