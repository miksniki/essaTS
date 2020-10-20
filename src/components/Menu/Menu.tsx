import React, { useState, useEffect, useRef } from 'react';
import Lood from '../Lood/Lood';
import ValitudLugu from '../ValitudLugu/ValitudLugu';
import './Menu.scss';


const Menu: React.FC = () => {
    
    const playlist = [
        {
            looPilt: 'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/dhherovzgjn2rm1msgbv/50-cent-biggest-beefs-getty-jordan-darville',
            laulja: '50 Cent',
            looNimi: 'Candy Shop',
            heliFail: '.../public/music/Cent.mp3'
        },
        {
            looPilt: 'https://www.biography.com/.image/t_share/MTQ3NjM5MTEzMTc5MjEwODI2/eminem_photo_by_dave_j_hogan_getty_images_entertainment_getty_187596325.jpg',
            laulja: 'Eminem',
            looNimi: 'Slim Shady',
            heliFail: '.../public/music/Eminem.mp3'
        },
        {
            looPilt: 'https://www.biography.com/.image/t_share/MTQ3NjM5ODIyNjU0MTIxMDM0/snoop_dogg_photo_by_estevan_oriol_archive_photos_getty_455616412.jpg',
            laulja: 'Snoop Dogg',
            looNimi: 'Brownies',
            heliFail: '.../public/music/SnoopDogg.mp3'
        },
        {
            looPilt: 'https://direct.rhapsody.com/imageserver/images/Art.6235041/356x237.jpg',
            laulja: 'Lloyd',
            looNimi: 'Get it Shawty',
            heliFail: '.../public/music/Lloyd.mp3'
        },
        {
            looPilt: 'https://www.biography.com/.image/t_share/MTQ3NjM5MzQyOTU5OTYxNDc2/lil_wayne_photo_by_ray_tamarra_getty_images_entertainment_getty_56680625.jpg',
            laulja: 'Lil Wayne',
            looNimi: 'Lollipop',
            heliFail: '.../public/music/LilWayne.mp3'
        }
    ];
    
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

    
    
   // useRef, useEffect ....................................................//
   
   
    
    
    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        console.log(musicRef.current)
        // musicRef.current.play()
    }, [activeIndex])


    return(
        <div className="menu">
            {/* valitud loo preview */}
            <div className="container1">
                {renderValitudLugu()}
                <p style={{paddingTop: '350px'}}>{renderValitudTekst()}</p>
                <audio ref={musicRef} src={playlist[activeIndex].heliFail} />
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
