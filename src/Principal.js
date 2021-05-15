import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import Place from './Place';
import Rating from './Rating';
import Horario from './Horario';

export default class Principal extends Component {

    constructor(props){
        super(props);
        this.state={photo:''};
      }
    
      map='';
    
      componentDidMount(){
        const googlePlaceAPILoad = setInterval(() => {
          if (window.google){
            this.google=window.google;
            clearInterval(googlePlaceAPILoad);
            console.log('Load Place API');
            const mapCenter = new this.google.maps.LatLng(4.624335,-74.064644);
            this.map = new this.google.maps.Map(document.getElementById('map'), {
              center: mapCenter,
              zoom: 15
            });
            var marcador = new this.google.maps.Marker({position:mapCenter, map:this.map})
            this.showMap(mapCenter);
          };
        },100);
      }
    
      showMap(mapCenter) {
        // The location of Uluru
        var uluru = {lat: -25.344, lng: 131.036};
        // The map, centered at Uluru
        var map = new window.google.maps.Map(
            document.getElementById('map'), {zoom: 15, center: mapCenter});
        // The marker, positioned at Uluru
        var marker = new window.google.maps.Marker({position: mapCenter, map: map});
      }
    
      manejoOnClick = (e) => {
        const request = {
          query: document.getElementById('origen').value ,
          fields: ['photos', 'formatted_address', 'name','place_id'],
        };
        this.service = new this.google.maps.places.PlacesService(this.map);
        this.service.findPlaceFromQuery(request, this.findPlaceResult);
      }
    
      findPlaceResult = (results, status) => {
        var placesTemp=[]
        var placeId = ''
        if (status ===  'OK') {
          results.map((place) => {
            var placePhotos=['']
            const placeTemp = {id:place.place_id, name:place.name,
              address:place.formatted_address,photos:placePhotos}
              placeId = place.place_id;
            placesTemp.push(<Place placeData={placeTemp}/>);
          })
        }
        if (placesTemp.length>0)
          this.findPlaceDetail(placeId);
        else{
          const placeTemp = {id:'N/A', name:<div className='mt-5'><strong className='text-center'>
              No hay resultados</strong></div>,
            address:'',photos:['']}
          placesTemp.push(<Place placeData={placeTemp}/>);
          this.setState({places:placesTemp})
        }
      }
    
      findPlaceDetail = (placeIdFound) => {
        var request = {
          placeId: placeIdFound,
          fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address',
           'icon', 'id', 'name', 'business_status', 'photo', 'place_id', 'plus_code', 'scope', 
           'type', 'url', 'utc_offset_minutes', 'vicinity','geometry','rating','reviews','opening_hours']
        };
        this.service.getDetails(request, this.foundPlaceDatail);
      }
    
      foundPlaceDatail = (place, status) => {
        if (status === 'OK'){
          var placePhotos=['']
          if (place.photos){
            place.photos.map((placePhoto, index) => {
              placePhotos[index]=placePhoto.getUrl({'maxWidth': 160, 'maxHeight': 120})
              if (index === 2) return;
            })
          }
          const placeTemp = {id:place.place_id, name:place.name,
            address:place.formatted_address,photos:placePhotos}
          const placesTemp = <Place placeData={placeTemp}/>;
          const placeHorarios = <Horario horarios={place.opening_hours}/>
          var rating=''
          if (place.rating){
            rating = <Rating placeRating={place.rating} placeReviews={place.reviews}/>
          }
          else{
            rating = <div key={1} className='row mt-2 mb-1 pl-3' >
                      <strong>No hay comentarios</strong>
                     </div>;
          }
          console.log('address_component: '+ place.address_component, 
          'adr_address: '+place.adr_address, 'alt_id', 'formatted_address', 'geometry: '+place.geometry,
          'icon: '+place.icon, 'business_status', 'photo',' rating: '+place.rating,
          'type: '+place.type, 'url: '+place.url, 'utc_offset_minutes', 'vicinity')
          this.setState({places:placesTemp, 
                         placeRating:rating,
                         placeHorarios:placeHorarios})
          this.showMap(place.geometry.location);
        }
      }

    render(){
        return(
            <main className='row justify-content-center my-4'>
                <div className='col-12 col-md-8 border p-3'>
                    <form>
                        <label className='form-label'><h3>Encuentra el mejor lugar para ti</h3></label><br/>
                        <div className='input-group'>
                            <input 
                                className='form-control'
                                placeholder='Busca un lugar'
                                id='origen'
                                />
                            <div 
                                className='btn btn-outline-dark input-group-text d-flex flex-row'
                                onClick={this.manejoOnClick}
                                id='boton'>
                                <span className='d-none d-md-block'>Buscar &nbsp;</span>
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                    </form>
                    {this.state.places}
                    {this.state.placeHorarios}
                    {this.state.placeRating}
                    <div id='map'></div>
                </div>
            </main>
        )
    }
};