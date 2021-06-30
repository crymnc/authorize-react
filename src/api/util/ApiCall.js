export async function call(url, method, body) {
    const tokenString = sessionStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const requestOptions  = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access_token
        },
        body:JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(response => {
        if (response.ok) {
            return response.json()
        } else if (response.status === 401) {
            throw Error('Unauthorized - Username or password is wrong')
        }
        throw Error('Unknown')
    });
}

