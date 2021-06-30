import React from 'react';
import {Component} from 'react';
import {Route} from 'react-router-dom';
import {getRefreshedToken} from "../../api/auth/auth";
import jwt from "jsonwebtoken";
import useToken from "../../hooks/auth/useToken";

const PrivateRoute = ({component: Component, ...rest}) => {
    const {token, setToken} = useToken();

    if (token) {
        const decodedToken = jwt.decode(token.access_token);
        let expired = Date.now() >= decodedToken.exp * 1000;
        if (expired) {
            const setRefreshedToken = async () => {
                setToken(await getRefreshedToken(token.refresh_token));
            }
            setRefreshedToken();
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