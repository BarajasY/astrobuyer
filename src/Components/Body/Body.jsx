import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BsCartPlusFill } from 'react-icons/bs';
import { FaMoneyBill, FaTemperatureHigh, FaSkullCrossbones } from 'react-icons/fa'
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { BiPlanet } from 'react-icons/bi';
import { IoMdPricetag } from 'react-icons/io';

const Body = () => {
    const [Stars, setStars] = useState([])
    const { IsAuth } = useContext(CartContext);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        getStars();
    }, [])

    const getStars = () => {
        const starsCollectionRef = collection(db, 'stars'); //Database as db and name of the collection, in this case 'stars'
        getDocs(starsCollectionRef).then(response => {
            const data = response.docs.map(doc => ({ data: doc.data(), id: doc.id }))
            setStars(data)
        })
            .catch(error => console.log(error));
    }

    return (
        <div className="body_container">
            <div className="body_content" name="Body">
                {Stars.map((star, index) => {
                    return (
                        <motion.div className="content" key={index} initial={{ opacity: 0, x: -50, y: -50 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: index * .1 }}>
                            <div className="star_image">
                                <img src={star.data.Image} alt={star.data.name} />
                            </div>
                            <div className="star_footer">
                                <div className="star_name">
                                    <h1>{star.data.Name}</h1>
                                    {IsAuth ?
                                        <div className="cart_icon">
                                            <BsCartPlusFill className='icon' onClick={() => addToCart(star.data.Name, star.data.Type, star.data.Image, star.data.Temperature, star.data.Price)} />
                                        </div>
                                        : null}
                                </div>
                                <div className="section">
                                    <h1 style={{ color: star.data.Type === "Star" ? '#f2d94c' : '#865e13' }}><BiPlanet /> {star.data.Type}</h1>
                                </div>
                                <div className="section">
                                    <h1 style={{ color: star.data.Habitability === "Habitable" ? '#179329' : '#e13004' }}><FaSkullCrossbones /> {star.data.Habitability}</h1>
                                </div>
                                <div className="section">
                                    <h1><FaTemperatureHigh /> {star.data.Temperature}°C</h1>
                                </div>
                                <div className="section">
                                    <h1><IoMdPricetag /> {star.data.Price} <FaMoneyBill /></h1>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div >
    )
}

export default Body