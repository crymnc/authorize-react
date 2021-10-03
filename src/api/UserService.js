import {apiService} from "./ApiService";

class UserService {

    async getAllUsers() {
        return await apiService.call('http://localhost:8090/api/user', 'GET',null,false);
    }

    async saveUser(user) {
        return await apiService.call('http://localhost:8090/api/user', 'POST', user);
    }

    async deleteUser(userId){
        return await apiService.call('http://localhost:8090/api/user?id='+userId, 'DELETE', null, false);
    }
}

export const userService = new UserService();

