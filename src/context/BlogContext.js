import { createContext } from "react";
import { useReducer } from 'react';

const blogsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return { blogs: action.payload }
        case 'CREATE_BLOGS':
            return {
                blogs: [action.payload, ...state.blogs]
            }
    }
}


export const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
    const initialState = { blogs: null }
    const [state, dispatch] = useReducer(blogsReducer, initialState)


    return (
        <BlogsContext.Provider value={{ ...state, dispatch }} >
            {children}
        </BlogsContext.Provider>
    )
}

