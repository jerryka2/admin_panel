import { createContext } from "react";

export const AppContext = createContext(); // ✅ Named Export

const AppContextProvider = ({ children }) => { // ✅ Destructure props

    const value = {}; // Add your state and functions here

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider; // ✅ Default Export
