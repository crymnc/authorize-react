import {ApiError} from './ApiError';

export class ApiErrors {
    static REFRESH_TOKEN_FAILED = new ApiError(1001,"Refreshing token is failed");
}


