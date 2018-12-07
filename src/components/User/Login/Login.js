import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Login.scss';

class Login extends Component {

    state = {
        redirectURL: null
    }

    login = ( event ) => {
        
        console.log( "should perform Auth");
        
        this.setState({ redirectURL: '/inicio' });

        event.preventDefault();

    }

    render(){
        return (
            <>
                {
                !! this.state.redirectURL && <Redirect to={this.state.redirectURL}/>                 
                }
                
                <form className="Login" onSubmit={(e)=>this.login(e)}>

                    <h1>
                        Ingresa
                    </h1>

                    <label>
                        <span>Nombre de usuario</span>
                        <input type="text"/>
                    </label>
                    
                    <label>
                        <span>Contraseña</span>
                        <input type="password"/>
                    </label>
                    
                    <input type="submit" value="Enviar"/>

                </form>
            </>
        )
    }

}

export default Login;