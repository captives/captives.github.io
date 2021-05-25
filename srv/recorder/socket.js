const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

class RecorderSocket {
    constructor(_server) {
        const server = new WebSocket.Server({ server: _server });
        let streams = {};
        server.on('connection', function (ws) {
            ws.on('message', function (message) {
                const json = JSON.parse(message);
                const stream = streams[ws.uid];
                switch (json.event) {
                    case "register":
                        console.log('received: %s', message);
                        ws.uid = Date.now();
                        ws.fileName = [json.name, "_", ws.uid, ".webm"].join('');
                        break;
                    case "START_REC_BLOB":
                        const _path = path.join(__dirname, ws.fileName);
                        streams[ws.uid] = fs.createWriteStream(_path, 'binary');
                        break;
                    case "REC_BLOB":
                        if (stream) {
                            console.debug('Writing ' + json.blob.length + ' bytes to ' + stream.path)
                            stream.write(json.blob, 'binary');
                        }
                        break;
                    case "STOP_REC_BLOB":
                        if (stream) {
                            setTimeout(() => {
                                console.debug('录制已经停止', stream.path);
                                stream.end();
                            }, 1000);
                        }
                        break;
                };
            });

            ws.on('error', function (err) {
                console.log('ERROR #', err);
            });

            ws.on('close', function (err) {
                console.log('CLOSE #', err);
            });
        });
    }
}

module.exports = RecorderSocket;
