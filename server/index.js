const express = require('express');
const path = require('path');
// const ffmpeg = require('fluent-ffmpeg');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// File upload 

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/upload', async (req, res) => {
        if(!req.files) {       
            res.send({
                message: 'No files uploaded'
            });
        } else {
            try {
                const {file} = req.files

                file.mv('uploads/' + file.name) 

                res.send({
                    message: 'file is uploaded'
                })
            } catch (e) {
                res.status(500).send(e)
            }
        }
});

const uploads = './uploads';
songs = [];
function readDirectory(callback) {
    fs.readdir(uploads, (err, files) => {
        songs.push(files);
        callback(songs);
    });
}

app.get('/songs', (req, res) => {
    readDirectory(function(songFiles) {
        res.send({files: songFiles})
    });
});

 /* app.post('/upload/:filename/:action', async (req, res) => {
    const filename = req.params.filename
    if (req.params.action === 'split') {       
        res.send({
            message: 'No files uploaded'
        }); */ 

// FFMPEG configuration


//

app.listen(5000);