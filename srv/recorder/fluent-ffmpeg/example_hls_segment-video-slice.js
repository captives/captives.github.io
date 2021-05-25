const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

/* HLS 点播切片, 
用的ffmpeg的segment(libavformat/segment.c)模块来
进行对source.mp4文件进行切片，不带上-re参数，这样可以以最快的速度进行切片
操作（当然该操作会消耗很大的CPU）

 ffmpeg 
    -i source.mp4 
    -codec:v libx264 
    -codec:a mp3 
    -map 0                          //从哪个输入流进入哪个输出
    -f ssegment                     //指定模块
    -segment_format mpegts          //指定输出格式为mpegts
    -segment_list playlist.m3u8     //配置输出的列表文件名
    -segment_time 10                //切片的时长
    hls_out%03d.ts
 */

const command = ffmpeg('./../input/demo.mp4')
    .videoCodec('libx264')//视频编码
    .audioCodec('libmp3lame')
    .addOptions([
        '-map 0',
        '-f ssegment',
        '-segment_format mpegts',
        '-segment_list ./output/playlist.m3u8',
        '-segment_time 10'
    ])
    .output('./output/hls_out%03d.ts')
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
    .save(path.join(__dirname, './output/first.mov'));

console.log('HLS 点播切片');