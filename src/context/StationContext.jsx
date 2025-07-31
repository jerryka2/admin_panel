import { createContext } from "react";

export const StationContext = createContext()

const StationContextProvider = (props) => {

    const value = {

    }

    return (
        <StationContext.Provider value={value}>
            {props.children}
        </StationContext.Provider>
    )


}

export default StationContextProvider