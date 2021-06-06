export function signIn(credentials) {
    return fetch('http://localhost:8090/api/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'username': credentials.username,
            'password': credentials.password
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        }else if(response.status === 401){
            throw Error('Unauthorized - Username or password is wrong')
        }
        throw Error('Unknown')
    })
}

export async function getRefreshedUser(token) {
    return await fetch('http://localhost:8090/api/refreshtoken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'isRefreshToken': true
        }
    }).then(response => {
        if (response.ok) {
            return response.json()
        }else if(response.status === 401){
            throw Error('Refresh Unauthorized - Username or password is wrong')
        }
        throw Error('Unknown')
    })
}