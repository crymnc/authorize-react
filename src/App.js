import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './pages/login/Login';
import React from 'react';
import Layout from "./components/layout/Layout";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import AddUser from "./pages/user/AddUser";
import useToken from "./hooks/auth/useToken";
import PrivateRoute from "./components/route/PrivateRoute";
import {apiService} from "./api/ApiService";
import Constant from "./pages/constant/Constant";

function App() {
    const {setToken} = useToken();
    if (apiService.isTokenExpired() && apiService.isRefreshTokenExpired()) {
        return <Login setToken={setToken}/>
    }

    return (
        <div>
            <Router>
                <Layout>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <PrivateRoute exact path="/about" component={About}/>
                        <PrivateRoute exact path="/users" component={User}/>
                        <PrivateRoute exact path="/users/add" component={AddUser}/>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
