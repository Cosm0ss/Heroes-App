import React from 'react'

export const LoginScreen = ({ history }) => {

    const handleLogin = () => {

        //history.push('/'); //navego hacia otra pantalla
        history.replace('/'); //reemplazar la hisotria como si no hubiese entrado antes
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr/>

            <button
                className="btn btn-primary" 
                onClick={ handleLogin }   
            >
                Login
            </button>
        </div>
    )
}
