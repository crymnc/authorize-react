import {apiService} from "./ApiService";

class ReferenceService {

    async getAllRoles() {
        return await apiService.call('http://localhost:8090/api/constants/role', 'GET');
    }

    async getSubConstants(mainConstantName, mainConstantId, subConstantName) {
        return await apiService.call('http://localhost:8090/api/constants/' + mainConstantName + '/' + mainConstantId + '/' + subConstantName, 'GET');
    }
}

export const referenceService = new ReferenceService();