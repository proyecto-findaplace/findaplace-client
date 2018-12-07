import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MainHeader.scss';

class MainHeader extends Component {
    render() {
        return (
            <header id="main-header" className="MainHeader">
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
