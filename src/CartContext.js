import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [Items, setItems] = useState([]);

    const addToCart = (Name, Type) => {
        setItems((prevState) => [...prevState, { Name, Type }])
    }

    return (
        <CartContext.Provider value={{ addToCart, Items }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;