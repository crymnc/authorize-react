import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './pages/Login';
import React from 'react';
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import useToken from "./hooks/auth/useToken";
import PrivateRoute from "./components/route/PrivateRoute";
import {apiService} from "./api/ApiService";
import Constant from "./pages/Constant";
import GlobalStyles from "./GlobalStyles";
import {ThemeProvider} from "@material-ui/core";
import theme from "./theme";

function App() {
    const {setToken} = useToken();
    if (apiService.isTokenExpired() && apiService.isRefreshTokenExpired()) {
        return <Login setToken={setToken}/>
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Router>
                <Layout>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home}/>
                        <PrivateRoute exact path="/about" component={About}/>
                        <PrivateRoute exact path="/users" component={User}/>
                        <PrivateRoute exact path="/users/add" component={AddUser}/>
                        <PrivateRoute exact path="/constants" component={Constant}/>
                    </Switch>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;
