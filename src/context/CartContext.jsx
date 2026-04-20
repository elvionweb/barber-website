import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
    items: []
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingIndex = state.items.findIndex(item => item._id === action.payload._id);
            if (existingIndex >= 0) {
                const newItems = [...state.items];
                newItems[existingIndex].quantity += 1;
                return { ...state, items: newItems };
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
            
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item._id !== action.payload) };
            
        case 'INCREMENT':
            return {
                ...state,
                items: state.items.map(item => 
                    item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
            
        case 'DECREMENT':
            return {
                ...state,
                items: state.items.map(item => 
                    item._id === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                )
            };
            
        case 'CLEAR_CART':
            return initialState;
            
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ cart: state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
