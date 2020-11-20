import React, { useState, useEffect, useRef, FC } from 'react';
import Lood from '../Lood/Lood';
import ValitudLugu from '../ValitudLugu/ValitudLugu';

import './Menu.scss';

const playlist = require('../../songPlaylist.json');

const Menu: FC = () => {
    
    const [activeIndex, setActiveIndex] = useState<number>(0);;
    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(musicRef.current && musicRef.current.src !== playlist[activeIndex].heliFail)
            musicRef.current.src = playlist[activeIndex].heliFail
    }, [activeIndex]);

    const handleClick = (e:any) => {
        const newActiveIndex = e.target.getAttribute('data-index')
        setActiveIndex( newActiveIndex )
    };

    return(
        <div className="menu">
            {/* valitud loo preview */}
            <div className="container1">
                {playlist.length &&  <ValitudLugu lugu={playlist[activeIndex]}/>}
                <p>
                    {playlist.length && 
                    <h1 className="title">{(`Now playing: ${playlist[activeIndex].laulja} - ${playlist[activeIndex].looNimi}`)}</h1>}
                </p>
                <audio className="audio" ref={musicRef} autoPlay controls />
            </div>
            {/* lugude list */}
            <div className="container2">
                <h1>Pick a song!
                    <p className="click">(Only the freshest bangers!)</p>
                </h1>
                <Lood playlist={playlist} handleClick={handleClick}/>
            </div>
        </div>
    )
}

export default Menu;
