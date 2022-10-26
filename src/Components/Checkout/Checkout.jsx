import React from 'react';
import './Checkout.css';
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { FaTemperatureHigh } from 'react-icons/fa';
import { BiPlanet } from 'react-icons/bi';
import { IoMdPricetag } from 'react-icons/io';
import { ImCross } from 'react-icons/im';

const Checkout = () => {

    const { Items } = useContext(CartContext);
    const { removeFromCart } = useContext(CartContext);

    const sum = Items.reduce((accumulator, object) => {
        return accumulator + object.Price;
    }, 0);

    return (
        <div className="cart_container">
            <div className="cart_content">
                <h1>Current items on your cart</h1>
                <div className="wrapper">
                    {Items.map((item, index) => {
                        return (
                            <div className="cart_item" key={index}>
                                <div className="cart_header">
                                    <section>
                                        <ImCross className="delete_items" onClick={() => removeFromCart(item.Name)} />
                                    </section>
                                    <div className="item_image">
                                        <img src={item.Image} alt="Planet" />
                                    </div>
                                    <div className="item_description">
                                        <h1>{item.Name}</h1>
                                        <h1><BiPlanet /> {item.Type}</h1>
                                        <h1><FaTemperatureHigh /> {item.Temperature}°C</h1>
                                        <h1><IoMdPricetag /> {item.Price} <FaMoneyBill /> </h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="cart_total">
                    <h1>Total</h1>
                    <h1>{sum} <FaMoneyBill /></h1>
                </div>
            </div>
        </div>
    )
}

export default Checkout