import React, { useState } from "react";
export const AppContext = React.createContext()

export default AppProvider = ({ children }) => {
    //  useEffect(() => requestUserPermission(), [])
    const [loading, setLoading] = useState(false)
    return (
        <AppContext.Provider value={{
            loading,
            setLoading,
           
        }} >
            {children}
        </AppContext.Provider>
    )
}
export const EVENTS = {
    ON_GOING_CHALLENGE_MENU_PRESSED: 'on going menu pressed',
    NEW_MESSAGE: 'new message'
}
