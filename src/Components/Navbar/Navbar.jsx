import React, { useState } from 'react';
import './Navbar.css';
import { BsFillCartFill } from 'react-icons/bs';
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
    const [Navbar, setNavbar] = useState(false);
    const { Items } = useContext(CartContext);
    const { IsAuth } = useContext(CartContext);
    const { setIsAuth } = useContext(CartContext);

    const navigate = useNavigate();

    const SignUserOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                setIsAuth(false);
                navigate("/")
            })
    }



    const changeBackground = () => {
        if (window.scrollY >= 100) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <div className={Navbar ? "navbar_container active" : "navbar_container"}>
            <div className="navbar_content">
                <Link to="/">
                    <div className="logo">
                        <h1>Astrobuyer</h1>
                    </div>
                </Link>
                <div className="end">
                    {IsAuth
                        ?
                        <>
                            <div className="login_navbar logout">
                                <CgProfile className="profile" id='logout' onClick={() => SignUserOut()} />
                            </div>
                            <div className="cart" onClick={() => navigate('/checkout')}>
                                <BsFillCartFill className="navbar_cart" />
                                <h1>{Items.length}</h1>
                            </div>
                        </>
                        :
                        <div className="login_navbar login">
                            <CgProfile className="profile" id='login' onClick={() => navigate('/login')} />
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar