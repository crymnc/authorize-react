import React from 'react';
import './login.css'
import {useState} from 'react';
import PropTypes from 'prop-types';
import {signIn} from "../../api/auth/auth";

const Login = ({setUser}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await signIn({
                username,
                password
            });
            setUser(user);
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

Login.propTypes = {
    setRefreshUser: PropTypes.func.isRequired
}

export default Login;
