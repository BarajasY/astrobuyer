import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [Items, setItems] = useState([]);
    const [IsAuth, setIsAuth] = useState(localStorage.getItem('Auth'));

    const addToCart = (Name, Type, Image, Temperature, Price) => {
        setItems((prevState) => [...prevState, { Name, Type, Image, Temperature, Price }])
    }

    const removeFromCart = (Name) => {
        const newList = Items.filter((item) => item.Name !== Name)
        setItems(newList)
    }

    return (
        <CartContext.Provider value={{ addToCart, Items, removeFromCart, IsAuth, setIsAuth }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;