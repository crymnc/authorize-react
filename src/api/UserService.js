import {apiService} from "./ApiService";

class UserService {

    async getAllUsers() {
        return await apiService.call('http://localhost:8090/api/user', 'GET');
    }

    async saveUser(user) {
        return await apiService.call('http://localhost:8090/api/user', 'POST', user);
    }
}

export const userService = new UserService();

