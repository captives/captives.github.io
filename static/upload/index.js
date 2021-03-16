const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const os = require('os');
const fs = require('fs');
const app = express();

// default options
app.use(fileUpload());
console.log(path.join(__dirname, '/'));
app.use(express.static(path.join(__dirname, "/")));

function writeFile(file, callback) {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uploadPath = __dirname + '/server/' + file.name;
    console.log('uploadPath', uploadPath);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, callback);
};

const Busboy = require('busboy');
app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    console.log("req.headers:", req.headers);
    console.log("req.params:", req.params);
    console.log("req.query:", req.query);
    console.log("req.query:", req.query);
    console.log('req.files', req.files);
    console.log('req.body', req.body);
    console.log('req.body', req.body, typeof req.body);

    //https://github.com/mscdex/busboy#api
    // var busboy = new Busboy({ headers: req.headers });
    // busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //     var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
    //     console.log('文件已经保存在', saveTo);
    //     file.pipe(fs.createWriteStream(saveTo));
    // });

    // busboy.on('finish', function() {
    //     res.writeHead(200, { 'Connection': 'close' });
    //     res.end("文件上传成功");
    // });
    // return req.pipe(busboy);

    const file = req.files.file;
    console.log('\n\n size', file.size);
    console.log('\n encoding', file.encoding);
    console.log('\n tempFilePath', file.tempFilePath);
    console.log('\n truncated', file.truncated);
    console.log('\n mimetype', file.mimetype);
    console.log('\n md5', file.md5);
    //文件流 file.data
    writeFile(file, err => {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

app.listen(8000);