import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Body = () => {
    const [Stars, setStars] = useState([])


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
                            <h1>{star.data.Name} {star.data.Type}</h1>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Body