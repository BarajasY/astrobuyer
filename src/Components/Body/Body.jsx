import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BsCartPlusFill } from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa'
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { motion } from 'framer-motion';

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
            <div className="body_content">
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
                                        <BsCartPlusFill className='icon' onClick={() => addToCart(star.data.Name, star.data.Type, star.data.Image, star.data.Temperature, star.data.Price)} />
                                        : null}
                                </div>
                                <div className="section">
                                    <h1>Type:</h1>
                                    <h1 style={{ color: star.data.Type === "Star" ? '#f2d94c' : '#865e13' }}>{star.data.Type}</h1>
                                </div>
                                <div className="section">
                                    <h1>Habitability:</h1>
                                    <h1 style={{ color: star.data.Habitability === "Habitable" ? '#179329' : '#e13004' }}>{star.data.Habitability}</h1>
                                </div>
                                <div className="section">
                                    <h1>Temperature: </h1>
                                    <h1>{star.data.Temperature}°C</h1>
                                </div>
                                <div className="section">
                                    <h1>Price:</h1>
                                    <h1>{star.data.Price} <FaMoneyBill /></h1>
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