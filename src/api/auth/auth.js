export function signIn(credentials) {
    const body = 'grant_type=password&username='+credentials.username+'&password='+credentials.password;
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic dGVzdENsaWVudElkOnNlY3JldA=='
        },
        body: body
    };
    return fetch('http://localhost:8090/oauth/token', request
    ).then(response => {
        if (response.ok) {
            return response.json()
        }else if(response.status === 401){
            throw Error('Unauthorized - Username or password is wrong')
        }
        throw Error('Unknown')
    })
}

export async function getRefreshedToken(token) {
    const body = 'grant_type=refresh_token&refresh_token='+token;
    return await fetch('http://localhost:8090/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic dGVzdENsaWVudElkOnNlY3JldA=='
        },
        body: body
    }).then(response => {
        if (response.ok) {
            return response.json()
        }else if(response.status === 401){
            throw Error('Refresh Unauthorized - Username or password is wrong')
        }
        throw Error('Unknown')
    })
}