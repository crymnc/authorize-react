import React from 'react';
import {useState} from 'react';
import {apiService} from '../api/ApiService';

const Login = ({setToken}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            apiService.login({username, password}).then(response => {
                setToken(response)
                if(response != null ) {
                    window.location.href = '/';
                }
            });
        }
        catch (e) {
            setError(e.message)
        }
    }

    return (
        <form className="login-wrapper" onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            {error && <p>error</p>}
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default Login;
