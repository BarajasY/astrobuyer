import React from 'react';
import './Header.css';
import { Link } from 'react-scroll';
import { IoIosArrowDown } from 'react-icons/io';

const Header = () => {
    return (
        <div className="header_container">
            <div className="header_content">
                <h1>Shop the <span>planets</span> you love, from your home in <span>Earth</span></h1>
                <Link to="Body" spy={true} smooth={true} duration={500} className="arrow_down">
                    <IoIosArrowDown className="arrow" />
                </Link>
            </div>
        </div>
    )
}

export default Header