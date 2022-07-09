import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { BsCartPlusFill } from 'react-icons/bs';
import CartContext from '../../CartContext';
import { useContext } from 'react';

const Body = () => {
    const [Stars, setStars] = useState([])

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
                        <div className="content" key={index}>
                            <div className="star_image">
                                <img src={star.data.Image} alt={star.data.name} />
                            </div>
                            <div className="star_footer">
                                <div className="star_name">
                                    <h1>{star.data.Name}</h1>
                                    <BsCartPlusFill className='icon' onClick={() => addToCart(star.data.Name, star.data.Type)} />
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
                                    <h1 >{star.data.Temperature}°C</h1>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Body