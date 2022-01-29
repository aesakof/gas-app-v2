import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"

import App from "./App"
import { ContextProvider } from "./Context"

ReactDOM.render(
    <ContextProvider>
        <Router>
            <ScrollToTop />
            <App />
        </Router>
    </ContextProvider>,
    document.getElementById("root")
)