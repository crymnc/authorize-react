import {call} from "./util/ApiCall";

export async function getAllRoles() {
    return await call('http://localhost:8090/api/constants/role','GET');
}

export async function getSubConstants(mainConstantName,mainConstantId,subConstantName) {
    return await call('http://localhost:8090/api/constants/'+mainConstantName+'/'+mainConstantId+'/'+subConstantName,'GET');
}