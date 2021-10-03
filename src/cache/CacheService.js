class CacheService {
    cacheData(cacheName, request, response, expiredAt) {
        if(!cacheName || !response || !request)
            return;
        const cacheRequest = request.url + "-" + request.method;
        let cacheResponse = {
            data: JSON.stringify(response)
        }
        expiredAt ? cacheResponse.expiredAt = new Date().getTime() + expiredAt / 1 : cacheResponse.expiredAt = new Date().getTime() + 36000;
        if ('caches' in window) {
            caches.open(cacheName).then((cache) => {
                cache.put(cacheRequest, new Response(JSON.stringify(cacheResponse)));
            });
        }
    }

    async isDataCached(cacheName, request) {
        const cacheRequest = request.url + "-" + request.method;
        if ('caches' in window) {
            return caches.open(cacheName).then(async (cache) => {
                if (cache != null) {
                    return await cache.match(cacheRequest).then(cachedResponse => {
                        if (cachedResponse && !cachedResponse.data && cachedResponse.expiredAt !== null && cachedResponse.expiredAt > new Date().getTime())
                            return cachedResponse.data
                        return false;
                    });
                }
                return false;
            });
        }
        return null;
    }

    deleteCache(cacheName, request) {
        const cacheRequest = request.url + "-GET";
        caches.open(cacheName).then(async (cache) => {
            cache.delete(cacheRequest)
        })
    }
}

export const cacheService = new CacheService();