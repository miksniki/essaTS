import React, { useState, useEffect, useRef, FC } from 'react';
import { useForm } from 'react-hook-form';
import Lood from '../Lood/Lood';
import ValitudLugu from '../ValitudLugu/ValitudLugu';

import './Menu.scss';

const playlist = require('../../songPlaylist.json');


const Menu: FC = () => {
    
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { register, handleSubmit } = useForm<any>();
    const [uploadedFile, setUploadedFile] = useState<any>(null);

    const handleClick = (e:any) => {
        const newActiveIndex = e.target.getAttribute('data-index')
        setActiveIndex( newActiveIndex )
    };

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
    }, [activeIndex]);

    const onSubmit = async (data:any) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);

        const res = await fetch('http://localhost:5000/upload', {
            method: "POST",
            body: formData
        }).then(res => res.json())
        alert(JSON.stringify(res));
        
        setUploadedFile(data.file[0])
    }


    return(
        <div className="menu">
            {/* valitud loo preview */}
            <div className="container1">
                {renderValitudLugu()}
                <p style={{paddingTop: '350px'}}>{renderValitudTekst()}</p>
                <audio ref={musicRef} autoPlay controls />
            </div>
            {/* lugude list */}
            <div className="container2">
                <h1>Pick a song!</h1>
                <Lood playlist={playlist} handleClick={handleClick}/>
            </div>
            {/* lugude uploadi form */}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input ref={register} type="file" name="file" />
                    <button>Submit</button>
                </form>
                {console.log(uploadedFile)}
            </div>
            {/* uploaditud lugude sektsioon */}
            <div>
                {uploadedFile ? (
                <div>
                    <div>
                        <h1>{uploadedFile.name}</h1>
                        <audio src={uploadedFile} autoPlay controls />                          
                    </div>
                </div>
                ) : null}
            </div>
        </div>
    )
}

export default Menu;
