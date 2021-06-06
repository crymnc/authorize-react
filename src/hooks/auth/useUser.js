import {useState} from 'react';

export default function useUser() {
    const getUser = () => {
        const tokenString = sessionStorage.getItem('user');
        return JSON.parse(tokenString);
    };
    const [user, setUser] = useState(getUser());

    const saveUser = user => {
        if(user != null) {
            sessionStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }
    };

    return {
        setUser: saveUser,
        user
    }
}