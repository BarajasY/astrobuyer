import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

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

    return (
        <div className="navbar_container">
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
                            {/*                             <div className="user_name">
                                <h1>{localStorage.getItem('User')}</h1>
                            </div> */}
                            <div className="logout">
                                <button className="logout_button" onClick={SignUserOut}>Logout</button>
                            </div>
                            <div className="cart">
                                <Link to="/checkout">
                                    <BsFillCartFill className="navbar_cart" />
                                </Link>
                                <h1>{Items.length}</h1>
                            </div>
                        </>
                        :
                        <div className="login_navbar">
                            <Link to="/login"><button className="login_button">Login</button></Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar