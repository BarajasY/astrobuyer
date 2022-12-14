import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BsCartPlusFill } from 'react-icons/bs';
import { FaMoneyBill, FaTemperatureHigh, FaSkullCrossbones } from 'react-icons/fa'
import CartContext from '../../CartContext';
import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiPlanet } from 'react-icons/bi';
import { IoMdPricetag } from 'react-icons/io';

const Body = () => {
    const [Stars, setStars] = useState([])
    const [Price, setPrice] = useState(0)
    const [AuxArray, setAuxArray] = useState([])
    const [FiltInter, setFiltInter] = useState(false)
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
            setAuxArray(data)
        })
            .catch(error => console.log(error));
    }

    const Filter = (n) => {
        switch (n) {
            case 1:
                setStars(AuxArray.filter(star => star.data.Type === 'Star'))
                setPrice(0)
                break;
            case 2:
                setStars(AuxArray.filter(star => star.data.Type === 'Planet'))
                setPrice(0)
                break;
            case 3:
                setStars(AuxArray.filter(star => star.data.Habitability === 'Habitable'))
                setPrice(0)
                break;
            case 4:
                setStars(AuxArray.filter(star => star.data.Habitability === 'Non habitable'))
                setPrice(0)
                break;
            case 5:
                setStars(AuxArray)
                setPrice(0)
                break;
            default:
                break;
        }
    }

    const handleRange = (e) => {
        setPrice(e.target.value);
        setStars(AuxArray.filter(star => star.data.Price > Price))
    }

    return (
        <div className="body_container">
            {FiltInter ?
            <div className="wrapper"onClick={() => setFiltInter(false)}>
                <AnimatePresence>
                <motion.div className="filters" initial={{x:-2000}} exit={{x:-2000}} animate={{x:0}}>
                    <h1>Filter</h1>
                    <div className="filters_circle">
                        <div className="filters_planet" id='star' onClick={() => Filter(1)}><p>Star</p></div>
                        <div className="filters_planet" id='planet' onClick={() => Filter(2)}><p>Planet</p></div>
                        <div className="filters_planet" id='habitable' onClick={() => Filter(3)}><p>Habitable</p></div>
                        <div className="filters_planet" id='non-habitable' onClick={() => Filter(4)}><p>Non Habitable</p></div>
                        <div className="filters_planet" id='all' onClick={() => Filter(5)}><p>All</p></div>
                    </div>
                    <div className="filters_bar">
                        <section>
                            <p>Price</p>
                            <input type="range" min='10' max='100' step='5' value={Price} onChange={(e) => handleRange(e)} />
                            <p>{Price === 0 ? null : `${Price}`}</p>
                        </section>
                    </div>
                </motion.div>
                </AnimatePresence>
            </div>
            :
            <section>
                <h1 onClick={() => setFiltInter(true)}>Filter</h1>    
            </section>}
            <div className="body_content" name="Body">
                <AnimatePresence>
                    {Stars.map((star, index) => {
                        return (
                            <motion.div className="content" key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
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
                </AnimatePresence>
            </div>
        </div >
    )
}

export default Body