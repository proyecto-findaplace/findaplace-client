import React, { Component } from 'react';

import axios from 'axios';

import './EventNew.scss';

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


                </form>

            </section>
        )
    }

}

export default EventNew;
