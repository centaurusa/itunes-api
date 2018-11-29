import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import './FullDetailsCard.css';
import { Player } from 'video-react';
import ReactAudioPlayer from 'react-audio-player';

class FullDetailsCard extends Component {

    redirect = this.props.results.length === 0 ? <Redirect to={'/'} /> : null;
    
    render() {
        const index = this.props.match.params.id;
        const targetData = this.props.results[index] || {};
        const title = targetData.wrapperType === 'track' ? targetData.trackName : targetData.collectionName;
        const price = targetData.wrapperType === 'track' ? targetData.trackPrice : targetData.collectionPrice;

        console.log(targetData);

        let player = null;

        if (targetData.wrapperType === 'track' && targetData.kind === 'song') {
            player = <ReactAudioPlayer src={targetData.previewUrl} autoplay controls />
        } else {
            player = (<Player>
                        <source src={targetData.previewUrl} />
                    </Player>);
        }

        return (
            <Fragment>
                {this.redirect}
                <div className="FullDetailsCard">
                    <img src={targetData.artworkUrl100} alt={targetData.title} />
                    <h4><a href={targetData.collectionViewUrl} rel="noopener noreferrer" target="_blank">{title}</a></h4>
                    <div>{targetData.collectionName}</div>
                    <div><a href={targetData.artistViewUrl} rel="noopener noreferrer" target="_blank">{targetData.artistName}</a></div>
                    <div className={'description'}>{targetData.longDescription}</div>
                    <ul>
                        <li>Price: <strong>${price}</strong></li>
                        <li>Genre: <strong>{targetData.primaryGenreName}</strong></li>
                        <li>country: <strong>{targetData.country}</strong></li>  
                    </ul>
                    { player }
                </div>
            </Fragment>
        )
    }
 
};

export default FullDetailsCard;