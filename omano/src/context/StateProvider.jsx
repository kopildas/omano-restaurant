import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

 const sorting = () => {
    return dispatchEvent({type: "GET_SORT_VALUE",})
}

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
