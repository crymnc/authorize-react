import Axios from 'axios';
import jwt from "jsonwebtoken";
import {cacheService} from '../cache/CacheService';
import {ApiErrors} from './ApiErrors';


class ApiService {

    constructor() {
        this.axios = Axios.create();

        this.get = this.axios.get.bind(this.axios);
        this.post = this.axios.post.bind(this.axios);
    }

    authInterceptor = async (error) => {
        error.config.retries = error.config.retries || {
            count: 0,
        };
        console.log("incepter starting")
        console.log(error.config.url + "in inceptor")
        if (error.config.url !== 'http://localhost:8090/oauth/token' && this.isUnAuthorizedError(error) && this.shouldRetry(error.config)) {
            console.log(error.config.url)
            console.log("authInceptor")
            console.log("Error count " + error.config.retries.count)
            while (error.config.retries.count < 3) {
                this.refreshToken().then(value => {
                    console.log("Authorized")
                    console.log(value)
                    error.config.headers['Authorization'] = 'Bearer ' + value.access_token;
                    error.config.retries.count += 1;
                    return this.axios(error.config)
                }).catch(reason => {
                    console.log("error occured")
                    console.log(reason)
                    if (reason.status === 401) {
                        sessionStorage.removeItem('token')
                        error.config.retries.count = 3
                    }
                    error.config.retries.count += 1;
                })
            }
        }
        return Promise.reject(error);
    }


    isUnAuthorizedError(error) {
        return error.config && error.response && error.response.status === 401;
    }

    shouldRetry(config) {
        return config.retries.count < 3;
    }

    async call(url, method, body, cache, retryCount = 0) {
        const request = await this.createRequest(url, method, body);
        const cachedData = await cacheService.isDataCached("FirstCacheStorage", request)
        if (cachedData) {
            return cachedData;
        }
        await this.handleExpiredToken(request)
        return this.axios(request)
            .then(response => {
                if (method === 'POST')
                    cacheService.deleteCache("FirstCacheStorage", request)
                if (method === 'GET' && cache)
                    cacheService.cacheData("FirstCacheStorage", request, response.data, null)
                return response.data
            }).catch(reason =>{
                if(reason.status === 401 && retryCount <= 2){
                    this.refreshToken().then(() => {
                        return this.call(url,method,body,retryCount++)
                    }).catch(exception => exception)
                }
            });

    }

    async login(credentials) {
        const body = 'grant_type=password&username=' + credentials.username + '&password=' + credentials.password;
        const request = {
            url: 'http://localhost:8090/oauth/token',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic dGVzdENsaWVudElkOnNlY3JldA=='
            },
            data: body
        };
        return this.axios(request).then(response => {
            if (response.status === 200) {
                return response.data
            }
        }).then(response => {
            this.setAccessToken(response)
            return response;
        })
    }

    async refreshToken() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (token == null || this.isRefreshTokenExpired()) {
            window.location.href = '/login';
            return;
        }
        const body = 'grant_type=refresh_token&refresh_token=' + token.refresh_token;
        const request = {
            url: 'http://localhost:8090/oauth/token',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic dGVzdENsaWVudElkOnNlY3JldA=='
            },
            data: body
        };
        return this.axios(request).then(response => {
            if (response.status === 200) {
                this.setAccessToken(response.data);
            }
            sessionStorage.removeItem('token');
        }).catch(reason => {
            sessionStorage.removeItem('token');
            if(reason.status === 401)
                throw ApiErrors.REFRESH_TOKEN_FAILED;
        })
    }

    setAccessToken(accessToken) {
        sessionStorage.setItem('token', JSON.stringify(accessToken));
        this.axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken.access_token;
    }

    isTokenExpired() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (token != null) {
            const decodedToken = jwt.decode(token.access_token);
            return Date.now() >= decodedToken.exp * 1000;
        }
        return true;
    }

    isRefreshTokenExpired() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (token != null) {
            const decodedToken = jwt.decode(token.refresh_token);
            return Date.now() >= decodedToken.exp * 1000;
        }
        return true;
    }

    createRequest(url, method, body) {
        const token = JSON.parse(sessionStorage.getItem('token'));
        if (token == null) {
            window.location.href = '/login';
            return;
        }
        return {
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            },
            data: JSON.stringify(body)
        }
    }

    async handleExpiredToken(request) {
        if (this.isTokenExpired()) {
            return await this.refreshToken().then(token => {
                request.headers.Authorization = 'Bearer ' + token.access_token
            }).catch(reason => {
                if(reason.status === 401)
                    throw ApiErrors.REFRESH_TOKEN_FAILED;
                throw reason;
            })
        }
    }


}

export const apiService = new ApiService(); 
