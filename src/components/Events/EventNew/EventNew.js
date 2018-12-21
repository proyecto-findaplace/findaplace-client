import React, { Component } from 'react';

import axios from 'axios';

import './EventNew.scss';

const google=window.google;


class EventNew extends Component {

    state = {

        
        name: '',
        description: '',

        allEventCategories: [],
        availableEventCategories: [],
        selectedEventCategories: [],

        placeSearchText: '',
        placeSuggestions: [],
        place: null,

        map: null
        
    }

    async componentDidMount() {


        try {
            const response = await axios.get('http://localhost:4000/event_categories');
            this.setState({
               allEventCategories: response.data,
               availableEventCategories: response.data.map( category => category.id )
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

        let selectedEventCategories = this.state.selectedEventCategories;

        if( selectedEventCategories.includes( category_id ) ) {

            selectedEventCategories = selectedEventCategories.filter(
                eventCategory => eventCategory !== category_id
            )            

        } else {

            selectedEventCategories.push( category_id )

        }

        this.setState({ selectedEventCategories })

    }

    
    handlePlaceSuggestionSelection = async (place) => {

        let placeSearchText = "";
        
        let selectedEventCategories = [];
        let availableEventCategories = place.event_categories;

        await this.setState({
            place,
            placeSearchText,
            availableEventCategories,
            selectedEventCategories
        })
        

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
        let availableEventCategories = this.state.allEventCategories.map( category => category.id );
        let selectedEventCategories = [];
        this.setState({place, availableEventCategories, selectedEventCategories});
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
            category_id => {
                
                let category = this.state.allEventCategories.find( category => category.id == category_id);
                let category_name = category.name;

                classNames = "event-category";
        
                if( this.state.selectedEventCategories.includes( category_id ) ) {
                    classNames += " selected";
                }
            
                return (
                    <li
                    className={classNames}
                    onClick={() => this.handleCategorySelection(category_id)}
                    key={'event_category-'+category_id}>
                        {category_name}
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
