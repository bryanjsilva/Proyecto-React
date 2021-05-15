import React, { Component } from 'react'

export default class Place extends Component {
  render() {
    var cantPhotos = this.props.placeData.photos.length;
    if (cantPhotos > 6)
      cantPhotos = 6;
    else
      cantPhotos = 3;
    const colSize = 4;
    var htmlPhotos=[];
    this.props.placeData.photos.map((photo, index) => {
      htmlPhotos.push(
        <div key={index} className={'col-12 col-lg-'+colSize+' text-center'} >
          <img src={photo} alt={this.props.placeData.name} className='w-100'/>
        </div>);
        if (index === (cantPhotos-1)) return;
    })
    return (
      <div>
        <div className='row mt-4 mb-1'>
          <h4 className='col-12 text-center' >{this.props.placeData.name}</h4>
        </div>
        <section className='row p-2' >
          <div className='col-12 text-center'>{this.props.placeData.address}</div>
        </section>
        <section className='row p-md-3'>
          {htmlPhotos.slice(0,3)} 
        </section>
        <section className='row p-md-3'>
          {htmlPhotos.slice(3,6)} 
        </section>
      </div>
    )
  }
}
