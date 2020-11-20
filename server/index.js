const express = require('express');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const probe = require('ffmpeg-probe');
const audioConcat = require('audioconcat');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

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
        const originalFiles = files.filter(fileName => !songs.includes(fileName))
        songs = [...songs, ...(originalFiles||[])]
        callback(songs);
    });
}

app.get('/songs', (req, res) => {
    readDirectory(function(songFiles) {
        res.send({files: songFiles})
    });
});

const edits = './edited';
editSongs = [];
function readEditDirectory(callback) {
    fs.readdir(edits, (err, files) => {
    const originalFiles = files.filter(fileName => !editSongs.includes(fileName))
    editSongs = [...editSongs, ...(originalFiles||[])]
    callback(editSongs);
    });
}

app.get('/editedSongs', (req, res) => {
    readEditDirectory(function(editSongFiles) {
        res.send({files: editSongFiles})
    });
});

app.get('/:filename/:action', async (req, res) => {
    if (req.params.action === 'split') {   
        const fileName = req.params.filename
        const fileLocation = `${__dirname}/uploads/${fileName}`
        const info = await probe(fileLocation)
        const duration = info.duration;
        const realDuration = duration * 0.001
        const clipDuration = parseInt(realDuration / 2);

        ffmpeg(fileLocation)
        .inputOption([ `-ss 0`])
        .outputOptions([ `-t ${clipDuration}`])
        .output(`./edited/${fileName}split.mp3`)
        .on('end', () => console.log('Split successful!'))
        .on('error', (err) => console.log(err))         
        .run()
        
    };
});

app.post('/concat', async (req, res) => {     
    const fileArray = req.body
    const fileNames = (req.body[0] + '+' + req.body[1])
    const songsPath = fileArray.map((file) => { 
        let pathsArray = [];
        pathsArray.push(`${__dirname}/uploads/${file}`);
        return pathsArray;
    })
    const mergedArray = [].concat.apply([], songsPath);
    audioConcat(mergedArray)
    .concat(`./edited/concat${fileNames}.mp3`)
    .on('start', function(command) {
        console.log('ffmpeg process started:', command)
        res.send({
            message: 'file is uploaded'
        })
    })
    .on('error', function(err, stdout, stderr) {
        console.error('Error:', err)
        console.error('ffmpeg stderr:', stderr)
    });
});

app.post('/delete', async (req, res) => {
    let fileName = req.body.files;
    const fileLocation = `${__dirname}/edited/${fileName}`;
    if(!fileName) {       
        res.send({
            message: 'file doesnt exist!'
        });
    } else {  
        fs.unlink(fileLocation, err => {
            if (err && err.code == 'ENOUENT') {
                console.log('File doesnt exist')        
            } else {
                console.log('Deleted!')
            }
        });
    }
})


app.listen(5000);