import {useState} from 'react';
import jwt from "jsonwebtoken";
import {getRefreshedUser} from "../../api/auth/auth";
import useUser from "./useUser";

export default function useRefreshUser() {
    const {user, setUser} = useUser();
    const getRefreshUser = () => {
        if (user) {
            const decodedToken = jwt.decode(user.token);
            if (Date.now() >= decodedToken.exp * 1000) {
                return async () => {
                   const refreshedUser = await getRefreshedUser(user.token);
                   setUser(refreshedUser);
                   return refreshedUser;
                }
            }
        }
        return user
    };
    const [refreshUser, setRefreshUser] = useState(getRefreshUser());

    const saveRefreshUser = user => {
        console.log(user)
        if(user != null) {
            setUser(user);
            setRefreshUser(user);
        }
    };

    return {
        setRefreshUser: saveRefreshUser,
        refreshUser
    }
}