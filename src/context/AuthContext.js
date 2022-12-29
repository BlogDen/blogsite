import { createContext, useReducer, useEffect, useState } from "react"

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
    }

}


export const AuthContextProvider = ({ children }) => {
    // const initialState = 

    const [state, dispatch] = useReducer(authReducer, { user: null });

    useEffect(() => {
        const dd = localStorage.getItem("user");
        const userJson = JSON.parse(dd);
        if (userJson) {
            dispatch({ type: 'LOGIN', payload: userJson })
        }
    }, [])

    console.log("Auth state : ", state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }} >
            {children}
        </AuthContext.Provider>
    )
}
