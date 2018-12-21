import React, { Component } from 'react';

import Geosuggest from 'react-geosuggest';

import './PlaceNew.scss';

const google=window.google;

class PlaceNew extends Component {


    state = {    
        place: {},
        placesService: null,
        map: null
    }

    componentDidMount() {

        let map = new google.maps.Map( this._map, {
            center: {lat: 19.4326018, lng: -99.1332049},
            zoom: 15
        });

        let placesService = new google.maps.places.PlacesService( map )
        
        this.setState({ placesService, map })

    }




    fetchPlaceDetails = async ( placeId ) => {

        // let placeDetails = await axios.get(`http://maps.googleapis.com/maps/api/place/details/output?placeid=${placeId}&key=AIzaSyANqEh1UHisN_xuijvkhSgXMEILM5I-6IQ`)

        // console.log( placeDetails );
        
        this.state.placesService.getDetails({
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

            let marker = new google.maps.Marker({
                map: this.state.map,
                position: result.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                console.log( "clicked marker", marker )
            });

            this.state.map.setCenter( marker.getPosition() )

            


            this.setState({ place })

        });

    }


    showPlacePhotos = () => {
        if( !! this.state.place.photos )
        return this.state.place.photos.map( photoUrl => <li><img src={photoUrl}/></li> )
    }




    render() {
        return (
            <section className="PlaceNew">
                
                <h1>
                    Nuevo Lugar
                </h1>
                

                <form>


                    <section ref={el=>this._map=el} className="map"></section>

                        <Geosuggest
                        className="Geosuggest"
                        ref={el=>this._geoSuggest=el}
                        placeholder="Escribe el nombre de un Lugar"
                        location={new google.maps.LatLng(19.4326018,-99.1332049)}
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

export default PlaceNew;
