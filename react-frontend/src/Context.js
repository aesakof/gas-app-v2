import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [username, setUsername] = useState([])
    
    return (
        <Context.Provider value={{
            username,
            setUsername
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}