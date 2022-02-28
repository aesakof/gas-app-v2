import React from 'react';
import {Switch, Route} from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import AllCars from "./components/AllCars"
import AllFillups from "./components/AllFillups"
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import CreateCar from "./components/CreateCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import CreateFillup from "./components/CreateFillup"
import EditFillup from "./components/EditFillup"
import DeleteFillup from "./components/DeleteFillup"
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';

import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
    return (
        <div style={{backgroundColor: '#D3D3D3'}}>
            <CssBaseline />
            <Header />
            <h1>Gas App</h1>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />

                <Route exact path="/cars" component={AllCars} />
                <Route exact path="/cars/register" component={CreateCar} />
                <Route exact path="/cars/edit/:id" component={EditCar} />
                <Route exact path="/cars/delete/:id" component={DeleteCar} />

                <Route exact path="/fillups" component={AllFillups} />
                <Route exact path="/fillups/new" component={CreateFillup} />
                <Route exact path="/fillups/edit/:id" component={EditFillup} />
                <Route exact path="/fillups/delete/:id" component={DeleteFillup} />

                <Route path="/:user" component={Profile} />
                
                <Route component={PageNotFound} />
            </Switch>
            <Footer />
        </div>

    )
}
export default App;
