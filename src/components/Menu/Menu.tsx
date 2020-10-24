import React, { useState, useEffect, useRef, FC } from 'react';
import Lood from '../Lood/Lood';
import ValitudLugu from '../ValitudLugu/ValitudLugu';
import './Menu.scss';

const playlist = require('../../songPlaylist.json')


const Menu: FC = () => {
    
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (e:any) => {
        const newActiveIndex = e.target.getAttribute('data-index')
        setActiveIndex( newActiveIndex )
    }

    const renderValitudLugu = () => {
        if(playlist.length) {
            return (
                <ValitudLugu lugu={playlist[activeIndex]}/>
            )
        }
        return null
    };

    const renderValitudTekst = () => {
        if(playlist.length) {
            return (
                    <p>{(`Now playing: ${playlist[activeIndex].laulja} - ${playlist[activeIndex].looNimi}`)}</p>
            )
        }
        return null
    };
    
    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(musicRef.current)
            musicRef.current.src = playlist[activeIndex].heliFail
    }, [activeIndex])


    return(
        <div className="menu">
            {/* valitud loo preview */}
            <div className="container1">
                {renderValitudLugu()}
                <p style={{paddingTop: '350px'}}>{renderValitudTekst()}</p>
                <audio ref={musicRef} autoPlay controls/>
            </div>
            {/* lugude list */}
            <div className="container2">
                <h1>Pick a song!</h1>
                <Lood playlist={playlist} handleClick={handleClick}/>
            </div>
        </div>
    )
}

export default Menu;
