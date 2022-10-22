import React from 'react';
import './Login.css';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setIsAuth } = useContext(CartContext);

    const navigate = useNavigate();

    const signUpWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem('Auth', true);
                localStorage.setItem('User', auth.currentUser.displayName);
                setIsAuth(true);
                navigate("/")
            })
    }

    return (
        <div className="login_container">
            <div className="login_content">
                <div className="login_head">
                    <h1>Log in using Google</h1>
                </div>
                <div>
                    <button className="google_login" onClick={signUpWithGoogle}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Login