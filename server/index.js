const express = require('express');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const morgan = require('morgan');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

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
    try {
        if(!req.files) {       
            res.send({
                message: 'No files uploaded'
            });
        } else {
            const {file} = req.files

            file.mv('uploads/' + file.name) 

            res.send({
                message: 'file is uploaded'
            })
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

{/* app.post('/upload/:filename/:action', async (req, res) => {
    const filename = req.params.filename
    if (req.params.action === 'split') 
    if(!req.files) {       
        res.send({
            message: 'No files uploaded'
        }); */ }

// FFMPEG configuration


//

app.listen(5000);