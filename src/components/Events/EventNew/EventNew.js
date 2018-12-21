import React, { Component } from 'react';

import axios from 'axios';

import './EventNew.scss';

const google=window.google;


class EventNew extends Component {

    state = {
        availableEventCategories: [],

        name: '',
        description: '',
        eventCategories: [],

        placeSearchText: '',
        placeSuggestions: [],
        place: null,

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
  


    }


    handleNameChange = ( event ) => {
        let name = event.target.value;
        this.setState({ name })
    }

    handleDescriptionChange = ( event ) => {
        let description = event.target.value;
        this.setState({ description })
    }

    handlePlaceSearchTextChange = ( event ) => {
        let placeSearchText = event.target.value;
        this.setState({ placeSearchText });

        this.updatePlaceSuggestionsList();
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

    
    handlePlaceSuggestionSelection = async (place) => {

        let placeSearchText = "";
        
        await this.setState({place, placeSearchText})
        

        let map = new google.maps.Map( this._map, {
            center: {lat: 19.4326018, lng: -99.1332049},
            zoom: 15
        });
        
        let geolocation = {
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lng),
        }
        
        let marker = new google.maps.Marker({
            map: map,
            position: geolocation
        });
        
        
        google.maps.event.addListener(marker, 'click', function() {
            console.log( "clicked marker", marker )
        });
        
        map.setCenter( marker.getPosition() )
        
        
        // this.setState({ map });

    }

    clearPlaceSelection = () => {
        let place = null;
        this.setState({place});
    }




    async updatePlaceSuggestionsList() {

        if( !! this.state.placeSearchText ) {
            try {

                const response = await axios.get(`http://localhost:4000/places?name_like=${this.state.placeSearchText}`);
                const placeSuggestions = response.data;
                this.setState({placeSuggestions});
            } 
            catch (error) {

                console.log(error);
                
            }
                
                


        }

    }




    displayPlaceSuggestionList = () => {

        
        if( !! this.state.placeSuggestions ) {

            return this.state.placeSuggestions.map( placeSuggestion => (
                <li
                    key={placeSuggestion.name.toLowerCase().replace(" ", "-") }
                    onClick={ () => this.handlePlaceSuggestionSelection( placeSuggestion ) }
                >
                    {placeSuggestion.name}
                </li>
            ))

        }


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
                        value={this.state.description}
                        onChange={this.handleDescriptionChange} />

                    </label>


                    {
                    
                    ! this.state.place
                    
                    ?
                    
                    <label>
                        <span>
                            Lugar
                        </span>

                        <input
                        name="placeSearchText"
                        type="text"
                        value={this.state.placeSearchText}
                        onChange={this.handlePlaceSearchTextChange} />
                        
                        {
                            !! this.state.placeSearchText &&
                            <ul className="PlaceSuggestions">
                                { this.displayPlaceSuggestionList() }
                            </ul>
                        }

                    </label>
                    
                    :
                    
                    <section className="PlaceSelection">
                        <header>

                            <h4 className="title">
                                {this.state.place.name}
                            </h4>

                            <button onClick={()=>this.clearPlaceSelection()}>
                                x
                            </button>
                        </header>

                        <section className="address">
                            {this.state.place.address}
                        </section>

                        <section className="image">
                            <img src={this.state.place.image}/>
                        </section>

                        <section ref={el=>this._map=el} className="map"></section>

                    </section>
                    
                    }


                    <h4>
                        Categorías
                    </h4>         

                    <ul>
                        
                        { this.displayEventCategoryList() }

                    </ul>           



                </form>

            </section>
        )
    }

}

export default EventNew;
