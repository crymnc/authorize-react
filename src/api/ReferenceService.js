import {apiService} from "./ApiService";

class ReferenceService {

    async getReferences(referenceName){
        return await apiService.call('http://localhost:8090/api/constants/'+referenceName, 'GET', null, true);
    }

    async getAllRoles() {
        return await apiService.call('http://localhost:8090/api/constants/role', 'GET', null, true);
    }

    async getSubConstants(mainConstantName, mainConstantId, subConstantName) {
        return await apiService.call('http://localhost:8090/api/constants/' + mainConstantName + '/' + mainConstantId + '/' + subConstantName, 'GET',null, true);
    }

    async saveReference(referenceName, reference){
        return await apiService.call('http://localhost:8090/api/constants/'+referenceName ,'POST', reference, false);
    }
    
}

export const referenceService = new ReferenceService();