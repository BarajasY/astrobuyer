import React from 'react';
import './Checkout.css';
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { FaMoneyBill } from 'react-icons/fa'

const Checkout = () => {

    const { Items } = useContext(CartContext);
    const { removeFromCart } = useContext(CartContext);

    console.log(Items);

    return (
        <div className="cart_container">
            <div className="cart_content">
                {Items.map((item) => {
                    return (
                        <div className="cart_item">
                            <div className="cart_header">
                                <div className="item_image">
                                    <img src={item.Image} alt="Planet" />
                                </div>
                                <div className="item_description">
                                    <h1>Name: {item.Name}</h1>
                                    <h1>Type: {item.Type}</h1>
                                    <h1>Temperature: {item.Temperature}°C</h1>
                                    <h1>Price: {item.Price} <FaMoneyBill /> </h1>
                                </div>
                            </div>
                            <div className="cart_footer">
                                <div className="remove">
                                    <button className="remove_button" onClick={() => removeFromCart(item.Name)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Checkout