const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const command = ffmpeg('./output/playlist.m3u8')
    .videoCodec('copy')
    .audioCodec('copy')
    .output('./output/hls_out.mp4')
    .output('./output/hls_out.mov')
    .on('start', commandLine => {
        console.log('视频开始处理: ' + commandLine);
    })
    // 输入编解码器数据
    .on('codecData', data => {
        console.log('Input is ' + data.audio + ' audio ' + 'with ' + data.video + ' video');
    })
    //进度
    .on('progress', progress => {
        console.log('Processing: ' + progress.percent + '% done');
    })
    // 转码错误
    .on('error', err => {
        console.log('处理视频发生错误: ' + err.message);
    })
    //处理完成
    .on('end', () => {
        console.log('处理视频成功');
    })
    .run()

console.log('HLS 切片合并');

// TODO 本地合并
// - ffmpeg -i index.m3u8 -c copy aaa.mp4
// TODO 线上合并
// - ffmpeg -i https://xxx.com/index.m3u8 -c copy aaa.mp4
