import React, { useState, useEffect, useRef, FC } from 'react';
import { useForm } from 'react-hook-form';
import Lood from '../Lood/Lood';
import ValitudLugu from '../ValitudLugu/ValitudLugu';

import './Menu.scss';

const playlist = require('../../songPlaylist.json');


const Menu: FC = () => {
    
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { register, handleSubmit } = useForm<any>();
    const [uploadedFile, setUploadedFile] = useState<any>();
    const [editSong, setEditSong] = useState<any>();

    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(musicRef.current)
            musicRef.current.src = playlist[activeIndex].heliFail
    }, [activeIndex]);

    const handleClick = (e:any) => {
        const newActiveIndex = e.target.getAttribute('data-index')
        setActiveIndex( newActiveIndex )
    };

    const onSubmit = async (data:any) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);

        const res = await fetch('http://localhost:5000/upload', {
            method: "POST",
            body: formData
        }).then(res => res.json())
        alert(JSON.stringify(res))
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
       
    const getFiles = async () => {
        await fetch('http://localhost:5000/songs')
            .then(res => res.json())
            .then(files => setUploadedFile(files))
    };

     const splitAudio = async (filename:any) => {
         filename = editSong;
         const data = new FormData();
         data.append('filename', filename.file[0]);

         const res = fetch('http://localhost:5000/split/'+filename+'/split', {
             method: "POST",
             body: data
         }).then(res => res.json())
         alert(JSON.stringify(res));
    }; 


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
                    <input ref={register} type="file" name="file" accept="audio/mpeg" />
                    <button>Submit</button>
                </form>
            </div>

            {/* uploaditud lugude sektsioon */}
 
            {console.log(uploadedFile)}
            <div>
                <button onClick={getFiles}>Show uploaded songs</button>
                {uploadedFile ? (
                <div>
                    {uploadedFile.files.map((array:any) => array.map((file:any) => 
                        <div>
                            <h1>{file}</h1>
                            <audio src={'/' + file} controls />
                            <button onClick={splitAudio}>Split audio</button> 
                        </div>
                    ))}
                </div>
                ) : null}
            </div>
        </div>
    )
}

export default Menu;
