import Axios from 'axios';
import jwt from "jsonwebtoken";

class ApiService {

    constructor() {
        this.axios = Axios.create();
        this.axios.interceptors.response.use(null, this.authInterceptor);

        this.get = this.axios.get.bind(this.axios);
        this.post = this.axios.post.bind(this.axios);
    }

    authInterceptor = async (error) => {
        error.config.retries = error.config.retries || {
            count: 0,
        };
        if (this.isUnAuthorizedError(error) && this.shouldRetry(error.config)) {
            return this.refreshToken().then(value => {
                error.config.headers['Authorization'] = 'Bearer ' + value.access_token;
                error.config.retries.count += 1;
                return this.axios(error.config)
            });
        }
        return Promise.reject(error);
    }

    isUnAuthorizedError(error) {
        return error.config && error.response && error.response.status === 401;
    }

    shouldRetry(config) {
        return config.retries.count < 3;
    }

    async call(url, method, body, cache) {
        const cachedData = await this.isDataCached("FirstCacheStorage", url)
        if (cachedData) {
            return cachedData;
        }
        const requestOptions = this.createRequestOptions(url, method, body)
        await this.handleExpiredToken(requestOptions)
        return this.axios(requestOptions)
            .then(response => {
                if (response.status === 200) {
                    if (cache)
                        this.cacheData("FirstCacheStorage", url, response.data)
                    return response.data
                }
            }).catch(reason => console.log(reason))
    }

    cacheData(cacheName, url, response) {
        const data = new Response(JSON.stringify(response));
        if ('caches' in window) {
            caches.open(cacheName).then((cache) => {
                cache.put(url, data);
            });
        }
    }

    async isDataCached(cacheName, url) {
        if ('caches' in window) {
            return caches.open(cacheName).then(async (cache) => {
                return await cache.match(url).then(data => data ? data.json():null);
            });
        }
        return null;
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
                return response.data
            }
        }).then(response => {
            this.setAccessToken(response);
            return response;
        })
    }

    setAccessToken(accessToken) {
        sessionStorage.setItem('token', JSON.stringify(accessToken));
        this.axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken.access_token;
    }

    isTokenExpired() {
        const token = JSON.parse(sessionStorage.getItem('token'));
        const decodedToken = jwt.decode(token.access_token);
        return Date.now() >= decodedToken.exp * 1000;
    }

    createRequestOptions(url, method, body) {
        const token = JSON.parse(sessionStorage.getItem('token'));
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

    async handleExpiredToken(requestOptions) {
        if (this.isTokenExpired()) {
            await this.refreshToken().then(token => {
                requestOptions.headers.Authorization = 'Bearer ' + token.access_token
            })
        }
    }


}

export const apiService = new ApiService(); 
