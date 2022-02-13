import React, { useState } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [username, setUsername] = useState(null)
    
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