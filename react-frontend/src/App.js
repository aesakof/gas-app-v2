import React, { useEffect, useState } from 'react';
import {Switch, Route} from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Cars from "./components/Cars"
import Fillups from "./components/Fillups"
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"



function App() {
    return (
        <div>
            <Header />
            <h1>LOOK AT ALL THIS STUFF</h1>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/cars">
                    <h2>WOW, CARS!</h2>
                    <Cars />
                </Route>
                <Route exact path="/fillups">
                    <h2>FILL ER UP</h2>
                    <Fillups />
                </Route>
            </Switch>
            <Footer />
        </div>

    )
}
export default App;
