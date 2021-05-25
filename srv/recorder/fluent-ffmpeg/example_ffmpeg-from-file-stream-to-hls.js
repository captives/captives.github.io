const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

//当前示例,适用于屏幕录制
var stream = fs.createReadStream('output_video_file.mp4');
stream.on('open', fd => {
    console.log('文件已经打开, 文件描述符', fd);
});

stream.on('data', chunk => {
    console.log('读取 ' + chunk.length + ' bytes');
});

stream.on('error', err => {
    console.log('读取异常', err.message);
});

stream.on('close', () => {
    console.log('文件已经关闭');
});

stream.on('end', () => {
    console.log('读取完毕');
});

const command = ffmpeg(stream)
    .inputOption('-re')
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .inputFormat("mp4")
    .addOptions([
        '-map 0',
        '-f ssegment',
        '-segment_format mpegts',
        '-segment_list ./output/hls_playlist.m3u8',
        '-segment_time 10'
    ])
    .output('./output/hls_out%03d.ts')
    .output('./output/hls_first.mp4')
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