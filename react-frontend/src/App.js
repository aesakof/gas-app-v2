import React, { useEffect, useState } from 'react';
import {Switch, Route} from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Cars from "./components/Cars"
import Fillups from "./components/Fillups"
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import NewCar from "./components/NewCar"
import NewFillup from "./components/NewFillup"
import CreateCar from "./components/createcar"
import EditCar from "./components/editcar"
import DeleteCar from "./components/deletecar"
import CarsList from "./components/carlist"



function App() {
    return (
        <div>
            <Header />
            <h1>LOOK AT ALL THIS STUFF</h1>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />

                <Route exact path="/cars" component={Cars} />

                <Route exact path="/carslist" component={CarsList} />
                <Route exact path="/cars/register" component={CreateCar} />
                <Route exact path="/cars/edit/:id" component={EditCar} />
                <Route exact path="/cars/delete/:id" component={DeleteCar} />

                <Route exact path="/new/car" component={NewCar} />
                <Route exact path="/new/fillup" component={NewFillup} />
                <Route exact path="/fillups" component={Fillups} />
            </Switch>
            <Footer />
        </div>

    )
}
export default App;
