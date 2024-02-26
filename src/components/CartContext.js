import React, { createContext, useReducer } from "react";

export const CartContext = createContext({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {}
});

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload.id);
        default:
            return state;
    }
}

export default function CartContextProvider({ children }) {
    const [cartItems, dispatch] = useReducer(cartReducer, []);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
