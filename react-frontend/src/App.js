import React, { useEffect, useState } from 'react';
import {Switch, Route} from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Cars from "./components/Cars"
import Fillups from "./components/Fillups"
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import CreateCar from "./components/CreateCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import CreateFillup from "./components/CreateFillup"
import EditFillup from "./components/EditFillup"
import DeleteFillup from "./components/DeleteFillup"



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
                <Route exact path="/cars/register" component={CreateCar} />
                <Route exact path="/cars/edit/:id" component={EditCar} />
                <Route exact path="/cars/delete/:id" component={DeleteCar} />

                <Route exact path="/fillups" component={Fillups} />
                <Route exact path="/fillups/new" component={CreateFillup} />
                <Route exact path="/fillups/edit/:id" component={EditFillup} />
                <Route exact path="/fillups/delete/:id" component={DeleteFillup} />
            </Switch>
            <Footer />
        </div>

    )
}
export default App;
