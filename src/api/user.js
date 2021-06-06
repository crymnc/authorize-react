import {call} from "./util/ApiCall";

export async function getAllUsers(token) {
    return await call('http://localhost:8090/api/user','GET', token);
}