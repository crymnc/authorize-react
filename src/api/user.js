import {call} from "./util/ApiCall";

export async function getAllUsers() {
    return await call('http://localhost:8090/api/user','GET');
}

export async function saveUser(user) {
    return await call('http://localhost:8090/api/user','POST',user);
}

