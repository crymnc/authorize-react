import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Preferences from './pages/preferences/Preferences';
import Login from './pages/login/Login';
import React from 'react';
import Layout from "./components/layout/Layout";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import useRefreshUser from "./hooks/auth/useRefreshUser";


function App() {
    const {refreshUser, setRefreshUser} = useRefreshUser();
    if (!refreshUser) {
        return <Login setUser={setRefreshUser}/>
    }

    return (
        <div>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/users" component={User}/>
                        <Route path="/preferences">
                            <Preferences/>
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
