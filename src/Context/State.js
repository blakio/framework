import React, { createContext, useReducer, useContext } from "react";
import Reducer from "./Reducer"
import initialState from "./InitialState";

const DashobardContext = createContext({});
const {
    Provider
} = DashobardContext;

function StateProvider({ value = [], ...props }) {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return <Provider value={[state, dispatch]} {...props} />;
}

const StateContext = () => {
    return useContext(DashobardContext)
}

export { StateProvider, StateContext };
