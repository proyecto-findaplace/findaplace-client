import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MainHeader.scss';

class MainHeader extends Component {
    render() {
        return (
            <header id="main-header" className="MainHeader">
                
                <Link className="logo_container" to="/inicio">
                    <div className="logo">
                        <img src="http://fakeimg.pl/300x100/000/fff?text=Find_a_Place&font=lobster"></img>
                    </div>
                </Link>

                <nav>
                    <ul>
                        <li>
                            <Link to="/lugares">
                                Lugares
                            </Link>
                        </li>
                        <li>
                            <Link to="/eventos">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="/mi-cuenta">
                                Mi Cuenta
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }

}

export default MainHeader;
