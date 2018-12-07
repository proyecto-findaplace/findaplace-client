import React, { Component } from 'react';

import axios from 'axios';

import Geosuggest from 'react-geosuggest';

import './EventNew.scss';

const google=window.google

class EventNew extends Component {

    state = {
        place: {}
    }

    componentDidMount() {

        let map = new google.maps.Map( this._map, {
            center: {lat: -33.866, lng: 151.196},
            zoom: 15
        });
  
    }
    fetchPlaceDetails = async ( placeId ) => {

        // let placeDetails = await axios.get(`http://maps.googleapis.com/maps/api/place/details/output?placeid=${placeId}&key=AIzaSyANqEh1UHisN_xuijvkhSgXMEILM5I-6IQ`)

        // console.log( placeDetails );
        let service = new google.maps.places.PlacesService( this._map )
        
        service.getDetails({
            placeId: placeId
        }, (result,status) => {
            
            let place = this.state.place;

            place.photos = []
            

            if( !! result.photos ) {

                result.photos.map( photo => {
                    if( !!place.photos ) {
                        if( place.photos.length < 4 ) {
                            place.photos.push(photo.getUrl())
                        }
                    }
                })        

            }


            this.setState({ place })

        });

    }


    showPlacePhotos = () => {
        if( !! this.state.place.photos )
        return this.state.place.photos.map( photoUrl => <li><img src={photoUrl}/></li> )
    }


    render() {
        return (
            <section className="EventNew">
                
                <h1>
                    Nuevo Evento
                </h1>

                <form>
    
                    <section ref={el=>this._map=el} id="map"></section>

                    <Geosuggest
                        className="Geosuggest"
                        ref={el=>this._geoSuggest=el}
                        placeholder="Escribe el nombre de un Lugar"
                        location={new google.maps.LatLng(19.4978,-99.1269)}
                        radius="30000"
                        onSuggestSelect={ (suggestion) => {
                            console.log( suggestion )
                            
                            let place = this.state.place;

                            place.id = suggestion.placeId;
                            
                            this.setState({ place });
                            
                            this.fetchPlaceDetails( this.state.place.id )

                        }}
                    />


                    <ul className="place_photos">
                        { this.showPlacePhotos() }
                    </ul>

                </form>

            </section>
        )
    }

}

export default EventNew;
