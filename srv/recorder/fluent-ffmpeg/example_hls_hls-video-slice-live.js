const ffmpeg = require('fluent-ffmpeg');

/* HLS 点播切片直播 
HLS模块实现于libavformat/hlsenc.c libavformat/hls.c 以及 libavformat/hlsproto.c

ffmpeg -re 
    -i source.mp4
    -codec:v libx264 
    -codec:a libfaac 
    -map 0 
    -f hls  
    -hls_list_size 6        //HLS播放的列表
    -hls_wrap 10            //表示为最大的TS循环数
    -hls_time 10 
    playlist.m3u8 
 */

const command = ffmpeg('./../input/demo.mp4')
    .addInputOption('-re')
    .videoCodec('libx264')//视频编码
    .audioCodec('aac')
    .addOptions([
        '-map 0',
        '-f hls',
        '-hls_list_size 6',
        '-hls_wrap 5',
        '-hls_time 10',
        './output/playlist.m3u8'
    ])
    .output('./output/hls_video.mp4')
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
    .run();

console.log('HLS 点播切片');