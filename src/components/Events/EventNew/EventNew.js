import React, { Component } from 'react';

import axios from 'axios';

import Geosuggest from 'react-geosuggest';

import './EventNew.scss';

const google=window.google

class EventNew extends Component {

    state = {
        availableEventCategories: [],

        name: '',
        description: '',
        eventCategories: [],


        place: {},
        placesService: null,
        map: null
    }


    async componentDidMount() {


        try {
            const response = await axios.get('http://localhost:4000/event_categories');
            this.setState({
               availableEventCategories: response.data 
            });
        } catch (error) {
            console.error(error);
        }
        
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



    
    handleNameChange = ( event ) => {
        let name = event.target.value;
        this.setState({ name })
    }

    handleDescriptionChange = ( event ) => {
        let description = event.target.value;
        this.setState({ description })
    }


    handleCategorySelection = (category_id) => {

        let eventCategories = this.state.eventCategories;

        if( eventCategories.includes( category_id ) ) {

            eventCategories = eventCategories.filter(
                eventCategory => eventCategory !== category_id
            )            

        } else {

            eventCategories.push( category_id )

        }

        this.setState({ eventCategories })

    }



    displayEventCategoryList = () => {
        
        let classNames;

        return this.state.availableEventCategories.map(
            category => {
                {
                    
                    classNames = "event-category";
            
                    if( this.state.eventCategories.includes( category.id ) ) {
                        classNames += " selected";
                    }
            
                }
                return (
                    <li
                    className={classNames}
                    onClick={() => this.handleCategorySelection(category.id)}
                    key={'event_category-'+category.id}>
                        {category.name}
                    </li>
                )
            }

        )

    }



    render() {

        
        return (
            <section className="EventNew">
                
                <h1>
                    Nuevo Evento
                </h1>

                <form>
    
                    <label>
                        <span>
                            Nombre
                        </span>

                        <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange} />

                    </label>

                    <label>
                        <span>
                            Descripción
                        </span>

                        <textarea
                        name="description"
                        type="text"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange} />

                    </label>

                    <h4>
                        Categorías
                    </h4>         

                    <ul>
                        
                        { this.displayEventCategoryList() }

                    </ul>           


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

export default EventNew;
