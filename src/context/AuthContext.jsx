import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false, user: action.payload, error: null };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null, error: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (email, password) => {
        try {
            dispatch({ type: 'LOGIN_REQUEST' });
            
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/auth/login', { email, password }, config);
            
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const register = async (name, email, phone, password) => {
        try {
            dispatch({ type: 'REGISTER_REQUEST' });

            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/auth/register', { name, email, phone, password }, config);

            dispatch({ type: 'REGISTER_SUCCESS', payload: data });
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
