export async function call(url, method, token) {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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

