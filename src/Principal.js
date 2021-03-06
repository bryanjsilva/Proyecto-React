import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import Place from './Place';
import Rating from './Rating';
import Horario from './Horario';
import Cercanos from './Cercanos';

// Para esta app se añaden componentes para mostrar fotos, el rating y comentarios, horario de atención y los lugares cercanos a la ubicación buscada o la accedida desde el navegador.

// Esta parte del código permite obtener la ubicación del usuario
let latitude = '';
let longitude = '';
navigator.geolocation.getCurrentPosition(function(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log("Latitude is :", latitude);
  console.log("Longitude is :", longitude);
});

export default class Principal extends Component {

    constructor(props){
        super(props);
        this.state={photo:''};
      }
    
      map=''
    
      componentDidMount(){
        const googlePlaceAPILoad = setInterval(() => {
          if (window.google){
            this.google=window.google;
            clearInterval(googlePlaceAPILoad);
            console.log('Load Place API');
            
            const mapCenter = new this.google.maps.LatLng(latitude, longitude);
            this.map = new this.google.maps.Map(document.getElementById('gmapContainer'), {
              center: mapCenter,
              zoom: 15
            });
            var marcador = new this.google.maps.Marker({position:mapCenter, map:this.map})
            this.showMap(mapCenter);
          };
        },100);
      }
    
      showMap(mapCenter) {
        //Se muestra el mapa con las coordenadas obtenidas de la búsqueda o ubicación inicial
        var map = new window.google.maps.Map(
            document.getElementById('map'), {zoom: 15, center: mapCenter});
        var marker = new window.google.maps.Marker({position: mapCenter, map: map});
        const request_near = {
          location: mapCenter,
          radius: 1000,
        }
        //Se obtienen los primeros 9 lugares cercanos de la ubicación para mostrarle al usuario
        // además el resto de lugares cercanos se guarda en otro array.
        let lugaresCercanos = [];
        let mostrarMas = [];
        let service = new this.google.maps.places.PlacesService(map);
        service.nearbySearch(request_near, function(results,status){
          if(status=== 'OK'){
            results.map((lugares,index) => {
              if (index < 10 && index > 0){
                lugaresCercanos.push(lugares);
              }if(index >10 && index < results.length-1){
                mostrarMas.push(lugares);
              }
            })
          }
        })
        let cercanos = <Cercanos lugares={lugaresCercanos} mas={mostrarMas}/>;
        this.setState({
          cercanos: cercanos,
          mapCenter: mapCenter}
          );
        
          // Se inicializan los servicios de Directions para mostrar la ruta en el mapa
        const directionsRenderer = new this.google.maps.DirectionsRenderer();
        const directionsService = new this.google.maps.DirectionsService();
        directionsRenderer.setMap(map);
        this.setState({
          directionsRenderer: directionsRenderer,
          directionsService: directionsService
        })
      }

      initDirection = () => {
        this.calculateAndDisplayRoute(this.state.directionsService, this.state.directionsRenderer);
      }
      // Estas funciones permiten mostrar la ruta seleccionada por el usuario y el modo obtenido del select
      calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
        const selectedMode = document.getElementById('mode').value;
        directionsService.route(
          {
            origin: {lat: latitude, lng: longitude},
            destination: this.state.mapCenter,
            travelMode: this.google.maps.TravelMode[selectedMode]
          },
          ( response, status ) => {
            if(status ==='OK'){
              directionsRenderer.setDirections(response);
            }else{
              window.alert('El pedido de la dirección ha fallado debido a '+status);
            }
          }
        )
      }
    
      // Se maneja el click del botón buscar asociado a la barra de búsqueda
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
    // Una vez obtenidos los datos del lugar buscado se envían los datos necesarios al resto de componentes
      foundPlaceDatail = (place, status) => {
        if (status === 'OK'){
          var placePhotos=['']
          if (place.photos){
            place.photos.map((placePhoto, index) => {
              placePhotos[index]=placePhoto.getUrl({'minWidth': 160, 'minHeight': 120})
              if (index === 2) return;
            })
          }
          const placeTemp = {id:place.place_id, name:place.name,
            address:place.formatted_address,photos:placePhotos}
          const placesTemp = <Place placeData={placeTemp}/>;
          const placeHorarios = <Horario horarios={place.opening_hours}/>
          var rating = <Rating placeRating={place.rating} placeReviews={place.reviews}/>

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

      // Esta función permite realizar la búsqueda cuando se presione la tecla enter en el buscador
      manejarOnKeyPress = (evento) => {
        if(evento.target.id==='origen' && evento.key==='Enter'){
          this.manejoOnClick();
        }else{
          return
        }
        evento.preventDefault();
      }

      // Una vez elegido el modo de transporte se maneja el evento de click con esta función para mostrar la ruta
      // desde la ubicación del usuario hacia el lugar elegido
      direcciones = (evento) => {
        evento.preventDefault();
       this.initDirection();
      }

    render(){
        return(
            <main className='row justify-content-center my-4'>
                <div className='col-12 col-md-8 border rounded p-3'>
                    <form>
                        <label className='form-label'><h3>Encuentra el mejor lugar para ti</h3></label><br/>
                        <div className='input-group'>
                            <input 
                                className='form-control'
                                placeholder='Busca un lugar'
                                id='origen'
                                onKeyPress={this.manejarOnKeyPress}
                                />
                            <div 
                                className='btn btn-dark input-group-text d-flex flex-row'
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
                    {this.state.cercanos}
                    <strong className='col-12 col-md-2'><h4 className='mt-3'>Ubicación </h4></strong>
                    <section className='d-flex flex-column flex-lg-row'>
                      <a className='btn primary' href='/#' onClick={this.direcciones}>Ir al lugar &nbsp;<i className='fa fa-map-marker fa-fw'></i></a>
                      <div className='col-12 col-lg-3 mx-lg-2 my-2 my-lg-0'>
                        <select className="form-select w-100" aria-label="select" id='mode'>
                          <option defaultValue value="DRIVING">Vehículo</option>
                          <option value="WALKING">Caminar</option>
                          <option value="TRANSIT">Bus</option>
                        </select>
                      </div>
                    </section>
                    <div className='my-3 card' id='map'>
                    </div>
                </div>
            </main>
        )
    }
};