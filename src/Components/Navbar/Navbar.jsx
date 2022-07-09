import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import CartContext from '../../CartContext';
import { useContext } from 'react';

const Navbar = () => {

    const { Items } = useContext(CartContext);


    return (
        <div className="navbar_container">
            <div className="navbar_content">
                <Link to="/">
                    <div className="logo">
                        <h1>Astrobuyer</h1>
                    </div>
                </Link>
                <div className="cart">
                    <Link to="/checkout">
                        <BsFillCartFill className="navbar_cart" />
                    </Link>
                    <h1>{Items.length}</h1>
                </div>
            </div>
        </div>
    )
}

export default Navbar