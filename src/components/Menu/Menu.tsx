import React, { useState, useEffect, useRef, FC } from 'react';
import { useForm } from 'react-hook-form';
import Lood from '../Lood/Lood';
import ValitudLugu from '../ValitudLugu/ValitudLugu';

import './Menu.scss';

const axios = require('axios');
const playlist = require('../../songPlaylist.json');


const Menu: FC = () => {
    
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { register, handleSubmit } = useForm<any>();
    const [uploadedFiles, setUploadedFile] = useState<any>();

    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(musicRef.current && musicRef.current.src !== playlist[activeIndex].heliFail)
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

    const getFiles = async () => {
        await fetch('http://localhost:5000/songs')
            .then(res => res.json())
            .then(files => setUploadedFile(files.files))
    };

    const splitAudio = async (fileName: string) => {
        fetch(`http://localhost:5000/${fileName}/split`) 
            .then(res => res.json())
            .then(function(data){alert(JSON.stringify(data))
            console.warn(data)
        })
    }

    const [valitudLood, setValitudLood] = useState<any>([]);
    const [editedSongs, setEditedSongs] = useState<any>();

    const getEditedFiles = async () => {
        await fetch('http://localhost:5000/editedSongs')
            .then(res => res.json())
            .then(files => setEditedSongs(files.files))
    };

    const checkboxChange = (e:any) => {
        let checkedSongs = [...valitudLood, e.target.value];
        if(valitudLood.includes(e.target.value )) {
            checkedSongs = checkedSongs.filter(file => file !== e.target.value);
        }
        setValitudLood(checkedSongs)
    }

    const concatAudio = (valitudLood:any) => {
        if (valitudLood.length === 2){
            axios({
            method: "POST",
            url: 'http://localhost:5000/concat',
            data: valitudLood
            })
        } else {
            alert("You need to select 2 songs!")
        }
    }  
    
    return(
        <div className="menu">
            {/* valitud loo preview */}
            <div className="container1">
                {playlist.length &&  <ValitudLugu lugu={playlist[activeIndex]}/>}
                <p style={{paddingTop: '350px'}}>
                    {playlist.length && 
                    <p>{(`Now playing: ${playlist[activeIndex].laulja} - ${playlist[activeIndex].looNimi}`)}</p>}</p>
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
            <div>
                <button onClick={getFiles}>Show uploaded songs</button>
                {uploadedFiles ? (
                <div>
                    {uploadedFiles.map((fileName: string) =>
                        <div className="uploadedSongs">
                            <h1>
                                {fileName}
                                <input type="checkbox" id={fileName} value={fileName} onChange={checkboxChange}></input>
                            </h1>
                            <audio src={'/' + fileName} controls />
                            <button onClick={() => splitAudio(fileName)}>Split audio</button>                           
                        </div>
                    )}
                    <button onClick={() => concatAudio(valitudLood)}>Concat selected songs</button>
                    <button onClick={getEditedFiles}>Show edited songs</button>
                    {editedSongs ? (
                    <div>
                        {editedSongs.map((fileName: string) => 
                        <div className="editedSongs">
                            <h1>
                            {fileName}
                            </h1>
                            <audio src={'/' + fileName} controls />
                        </div>
                        )}
                    </div>
                    ): null}
                    </div>               
                ) : null}
            </div>
        </div>
    )
}

export default Menu;
