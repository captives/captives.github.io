const { mount } = require('./connectionsapi');

const WebRtcConnectionManager = require('./WebRtcConnectionManager');

const { PassThrough } = require('stream')
const fs = require('fs')

const { RTCAudioSink, RTCVideoSink } = require('wrtc').nonstandard;

// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);
const { StreamInput } = require('fluent-ffmpeg-multistream')

const VIDEO_OUTPUT_SIZE = '320x240'
const VIDEO_OUTPUT_FILE = './recording.mp4'

let UID = 0;

function beforeOffer(peerConnection) {
    const audioTransceiver = peerConnection.addTransceiver('audio');
    const videoTransceiver = peerConnection.addTransceiver('video');

    const audioSink = new RTCAudioSink(audioTransceiver.receiver.track);
    const videoSink = new RTCVideoSink(videoTransceiver.receiver.track);

    const streams = [];

    videoSink.addEventListener('frame', ({ frame: { width, height, data } }) => {
        const size = width + 'x' + height;
        console.log('> frame', streams.length, size);
        if (!streams[0] || (streams[0] && streams[0].size !== size)) {
            UID++;

            const stream = {
                recordPath: './recording-' + size + '-' + UID + '.mp4',
                size,
                video: new PassThrough(),
                audio: new PassThrough()
            };

            const onAudioData = ({ samples: { buffer } }) => {
                if (!stream.end) {
                    stream.audio.push(Buffer.from(buffer));
                }
            };

            audioSink.addEventListener('data', onAudioData);

            stream.audio.on('end', () => {
                audioSink.removeEventListener('data', onAudioData);
            });

            streams.unshift(stream);

            streams.forEach(item => {
                if (item !== stream && !item.end) {
                    item.end = true;
                    if (item.audio) {
                        item.audio.end();
                    }
                    item.video.end();
                }
            })

            stream.proc = ffmpeg()
                .addInput((new StreamInput(stream.video)).url)
                .addInputOptions([
                    '-f', 'rawvideo',
                    '-pix_fmt', 'yuv420p', //颜色空间
                    '-s', stream.size,
                    '-r', '30',
                ])
                .addInput((new StreamInput(stream.audio)).url)
                .addInputOptions([
                    '-f s16le',
                    '-ar 48k',
                    '-ac 1',
                ])
                .on('start', commandLine => {
                    console.log('Start recording >> ', stream.size, stream.recordPath)
                    console.log('视频开始处理: ' + commandLine);
                })
                //进度
                // .on('progress', progress => {
                //     console.log('Processing: ' + progress.percent + '% done');
                // })
                // 转码错误
                .on('error', err => {
                    console.log('处理视频发生错误: ' + err.message);
                })
                .on('end', () => {
                    stream.recordEnd = true;
                    console.log('Stop recording >> ', stream.recordPath)
                })
                .addOptions([
                    '-map 0',
                    '-f ssegment',
                    '-segment_format mpegts',
                    '-segment_list playlist.m3u8',
                    '-segment_time 10'
                ])
                .output('hls_out%03d.ts')
                .size(stream.size)
                .output(stream.recordPath);

            stream.proc.run();
        }

        streams[0].video.push(Buffer.from(data));
    });

    const { close } = peerConnection;
    peerConnection.close = function() {
        audioSink.stop();
        videoSink.stop();


        streams.forEach(({ audio, video, end, proc, recordPath }) => {
            if (!end) {
                if (audio) {
                    audio.end();
                }
                video.end();
            }
        });
        return;
        let totalEnd = 0;
        const timer = setInterval(() => {
            streams.forEach(stream => {
                if (stream.recordEnd) {
                    totalEnd++;
                    if (totalEnd === streams.length) {
                        clearTimeout(timer);

                        const mergeProc = ffmpeg()
                            .on('start', () => {
                                console.log('Start merging into ' + VIDEO_OUTPUT_FILE);
                            })
                            .on('end', () => {
                                streams.forEach(({ recordPath }) => {
                                    fs.unlinkSync(recordPath);
                                })
                                console.log('Merge end. You can play ' + VIDEO_OUTPUT_FILE);
                            });

                        streams.forEach(({ recordPath }) => {
                            mergeProc.addInput(recordPath)
                        });

                        mergeProc
                            .output(VIDEO_OUTPUT_FILE)
                            .run();
                    }
                }
            });
        }, 1000)

        return close.apply(this, arguments);
    }
}


function run(app) {
    const connectionManager = WebRtcConnectionManager.create({ beforeOffer });
    mount(app, connectionManager, `/wrtc`);
}

module.exports = { run };