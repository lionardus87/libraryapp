import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return [...state, action.book];
		case "REMOVE_FROM_CART":
			return state.filter((book) => book.ISBN !== action.isbn);
		case "CLEAR_CART":
			return [];
		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	const [cartItems, dispatch] = useReducer(cartReducer, []);

	return (
		<CartContext.Provider value={{ cartItems, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
