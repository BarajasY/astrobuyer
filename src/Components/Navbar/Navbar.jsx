import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import CartContext from '../../CartContext';
import { useContext } from 'react';

const Navbar = () => {
    const [Dropdown, setDropdown] = useState(false)

    const handleDropdown = () => {
        if (Dropdown === false) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    }
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
                    {Dropdown
                        ?
                        <>
                            <BsFillCartFill className="navbar_cart" onClick={handleDropdown} />
                            <h1>{Items.length}</h1>
                            <div className="cart_dropdown">
                                {Items.map((item, index) => {
                                    return (
                                        <div key={index} className="cart_item">
                                            <h1>{item.Name}</h1>
                                            <h1>{item.Type}</h1>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                        :
                        <>
                            <BsFillCartFill className="navbar_cart" onClick={handleDropdown} />
                            <h1>{Items.length}</h1>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar