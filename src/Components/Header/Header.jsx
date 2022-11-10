import React from 'react';
import './Header.css';
import { Link } from 'react-scroll';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <div className="header_container">
            <div className="header_content">
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>Shop the <span>planets</span> you love, from your home in <span>Earth</span></motion.h1>
                <Link to="Body" spy={true} smooth={true} duration={500} className="arrow_down">
                    <IoIosArrowDown className="arrow" />
                </Link>
            </div>
        </div>
    )
}

export default Header