import React from 'react';
import {Component} from 'react';
import {Route} from 'react-router-dom';
import {apiService} from "../../api/ApiService";
import jwt from "jsonwebtoken";
import useToken from "../../hooks/auth/useToken";

const PrivateRoute = ({ ...rest}) => {
    const {token, setToken} = useToken();

    if (token) {
        const decodedToken = jwt.decode(token.access_token);
        let expired = Date.now() >= decodedToken.exp * 1000;
        if (expired) {
            apiService.refreshToken(token.refresh_token).then(response => setToken(response));
            return <div className="App">Loading...</div>;
        }
    }
    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} />}
        />
    )
}

export default PrivateRoute;