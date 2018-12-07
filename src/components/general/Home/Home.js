import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {


    render(){
        return (
            <article>

                <h1>Bienvenido/a</h1>

                <nav>
                    <ul>
                                             
                        <li>
                            <Link to="/usuario/evento/nuevo">
                                Crear Evento
                            </Link>
                        </li>
                        <li>
                            <Link to="/usuario/eventos">
                                Mis Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="/usuario/reservaciones">
                                Mis Reservaciones
                            </Link>
                        </li>
                        <li>
                            <Link to="/lugares">
                                Ver lugares
                            </Link>
                        </li>

                    </ul>
                </nav>

            </article>
        )
    }

}

export default Home;