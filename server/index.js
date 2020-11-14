const express = require('express');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const ffmpeg = require('ffmpeg');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'edited')));

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

// FFMPEG configuration

app.post('/split/:file/:action', async (req, res) => {
     const file = req.files
     

     if (req.params.action === 'split') {       
         ffmpeg.ffprobe(file, (err, metaData) => {
             const {duration} = metaData.format;
             const startingTime = duration;
             const clipDuration = parseInt(duration / 2);

             ffmpeg()
                 .input(file)
                 .inputOption([ `-ss ${startingTime}` ])
                 .outputOptions([ `-t ${clipDuration}`])
                 .output(`./edited/${file}Edit.mp3`)
                 .on('end', () => console.log('Split successful!'))
                 .on('error', (err) => console.log(err))         
                 .run();
        })
     }
 })


app.listen(5000);