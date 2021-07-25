import React from 'react';
import {Component} from 'react';
import {Route} from 'react-router-dom';
import {apiService} from "../../api/ApiService";
import useToken from "../../hooks/auth/useToken";

const PrivateRoute = ({ ...rest}) => {
    const {token, setToken} = useToken();

    if(apiService.isTokenExpired()){
        console.log("Token expired")
        if(apiService.isRefreshTokenExpired()){
            console.log("Refresh token expired")
            window.location.href = '/login';
            return "Redirecting";
        }
        apiService.refreshToken(token.refresh_token).then(response => setToken(response));
        return <div className="App">Loading...</div>;
    }
    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} />}
        />
    )
}

export default PrivateRoute;