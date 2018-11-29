import React from 'react';
import './ContentCard.css';
import { Link } from 'react-router-dom';

const ContentCard = (props) => {

    const { artworkUrl100,
            artistName,
            trackName,
            kind, 
            collectionName, 
            trackPrice,
            wrapperType,
            collectionPrice,
            country
             } = props.data;

    const title = wrapperType === 'track' ? trackName : collectionName;
    const price = wrapperType === 'track' ? trackPrice : collectionPrice;

    return (
        <Link to={`/details/${props.index}`} style={{ textDecoration: 'none', color: 'initial' }}>
            <div className={'ContentCard'}>
                {artworkUrl100 && <img src={artworkUrl100} alt={title} />}
                <h5>{artistName}</h5>
                <p className={'title'}>{title}</p>
                <p>Type: {kind}</p>
                <p>Price: ${price}</p>
                <p>Country: {country}</p>
            </div>
        </Link>

    )
};

export default ContentCard;