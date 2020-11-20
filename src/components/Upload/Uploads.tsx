import React, { useState, useRef, FC } from 'react';
import { useForm } from 'react-hook-form';

import Note from './img/noot1.jpg';
import Arrow from './img/arrow.png';


import './Uploads.scss';

const axios = require('axios');


const Uploads: FC = () => {

    const { register, handleSubmit } = useForm<any>();

    const [uploadedFiles, setUploadedFile] = useState<any>();
    const [valitudLood, setValitudLood] = useState<any>([]);
    const [editedSongs, setEditedSongs] = useState<any>();

    const scrollRef = useRef<HTMLHeadingElement>(null);
    
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

    const getEditedFiles = async () => {
        await fetch('http://localhost:5000/editedSongs')
            .then(res => res.json())
            .then(files => setEditedSongs(files.files))
    };

    const splitAudio = async (fileName: string) => {
        await fetch(`http://localhost:5000/${fileName}/split`) 
            .then(res => res.json())
            .then(function(data){alert(JSON.stringify(data))
            console.warn(data)
        })
        await getEditedFiles();

    }

    const checkboxChange = (e:any) => {
        let checkedSongs = [...valitudLood, e.target.value];
        if(valitudLood.includes(e.target.value )) {
            checkedSongs = checkedSongs.filter(file => file !== e.target.value);
        }
        setValitudLood(checkedSongs)
    }

    const concatAudio = async (valitudLood:string[]) => {
        if (valitudLood.length === 2){
            await axios({
            method: "POST",
            url: 'http://localhost:5000/concat',
            data: valitudLood
            })
            await getEditedFiles();
        } else {
            alert("You need to select 2 songs!")
        }      
    }  

    const deleteAudio = async (fileName:string) => {
        await axios({
            method: "POST",
            url: 'http://localhost:5000/delete',
            data: {
                files : `${fileName}`
            }
        })
        await getEditedFiles();        
    }

    const download = (fileName:any) => {
        const blob = new Blob(['audio'], {type: 'audio/mpeg'})
        downloadFile(blob, `${fileName}`);
    }

    const downloadFile = (blob:any, fileName:any) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href= url;
        a.download = fileName;
        a.click();
    }

    return(
        <div className="uploads">
            <button 
                className="btn"
                style={{marginBottom: '20px'}}
                onClick={() => {
                    if (scrollRef && scrollRef.current) {
                        scrollRef.current.scrollIntoView({behavior: "smooth"});
                    }
                }}>
                    <img style={{width: '20px', height: '20px'}} className="arrow" alt="arrow" src={Arrow}></img>
            </button>
            
            <h1 ref={scrollRef} className="title1">Upload and edit songs!</h1>
            <img style={{width: '50px', height: '50px', paddingTop: '20px'}} src={Note} alt="noot1"/>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input ref={register} type="file" name="file" accept="audio/mpeg" />
                    <button style={{background: 'rgb(133, 39, 128)', color: 'white', fontSize: '30px'}}>Submit</button>
                </form>
            </div>
            <div>
                <button style={{marginBottom: '40px'}} onClick={getFiles}>Show uploaded songs</button>
                {uploadedFiles ? (
                <div className="uploaded">
                    {uploadedFiles.map((fileName: string) =>
                        <div className="uploadedSongs">
                            <h1 style={{paddingBottom: '40px'}}>
                                {fileName}
                                <input className="check" type="checkbox" id={fileName} value={fileName} onChange={checkboxChange}></input>
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
                            <h1 style={{paddingBottom: '40px'}}> 
                            {fileName}
                            </h1>
                            <audio src={'/' + fileName} controls />
                            <button onClick={() => download(fileName)}>Download</button>
                            <button onClick={() => deleteAudio(fileName)}>Delete</button>
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

export default Uploads;