import React, { Component } from 'react';

import axios from 'axios';

import './EventNew.scss';

class EventNew extends Component {

    state = {
        availableEventCategories: [],

        name: '',
        description: '',
        eventCategories: [],

        placeSearchText: '',
        placeSuggestions: [],
        place: {}
        
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
                <li key={placeSuggestion.name.toLowerCase().replace(" ", "-") }>
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



                    <label>
                        <span>
                            Lugar
                        </span>

                        <input
                        name="placeSearchTexgt"
                        type="text"
                        value={this.state.placeName}
                        onChange={this.handlePlaceSearchTextChange} />

                        <ul className="PlaceSuggestions">
                            { this.displayPlaceSuggestionList() }
                        </ul>

                    </label>


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
