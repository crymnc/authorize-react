import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return JSON.parse(tokenString);
    };
    const [token, setToken] = useState(getToken());

    const saveToken = token => {
        if(token != null) {
            sessionStorage.setItem('token', JSON.stringify(token));
            setToken(token);
        }
    };

    return {
        setToken: saveToken,
        token
    }
}