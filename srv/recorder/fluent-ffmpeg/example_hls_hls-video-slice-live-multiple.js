const ffmpeg = require('fluent-ffmpeg');
const process = require('child_process');
/* HLS 多码率切片直播
HLS模块实现于libavformat/hlsenc.c libavformat/hls.c 以及 libavformat/hlsproto.c

ffmpeg -re 
    -i source.mp4
    -codec:v:0 copy 
    -codec:a:0 copy
    -codec:v:1 libx264 -s 640x320
    -codec:a:1 aac 
    -b:a:1 32k
    -map 0:v    //取第一路流的视频
    -map 0:a    //取第一路流的音频
    -map 0:v    //取第一路流的视频
    -map 0:a    //取第一路流的音频
    -f hls  
    -var_stream_map 'v:0,a:0 v:1,a:1'       //用于指定variant list中包含的节目信息, 空格分割
    -hls_list_size 6        //HLS播放的列表
    -hls_wrap 10            //表示为最大的TS循环数
    -hls_time 10 
    -hls_playlist_type vod
    -master_pl_name master.m3u8
    out%v/playlist.m3u8
 */

//TODO 代码错误
const command = ffmpeg('./../input/demo.mp4')
    .addInputOption('-re')
    .addOptions([
        '-codec:v:0 copy',
        '-codec:a:0 copy',
        '-codec:v:1 libx264 -s 640x320',
        '-codec:a:1 aac',
        '-b:a:1 32k',
    ])
    .addOptions([
        '-map 0:v',
        '-map 0:a',
        '-map 0:v',
        '-map 0:a',
        '-f hls',
        // '-var_stream_map "v:0,a:0 v:1,a:1"',
        '-hls_list_size 6',
        '-hls_wrap 5',
        '-hls_time 10',
        // '-hls_palylist_type vod',
        '-master_pl_name master.m3u8'
    ])
    .output('./output/out%v/playlist.m3u8')
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
// .run();

const cmd = ['ffmpeg -re',
'-i ./../input/demo.mp4',
'-codec:v:0 copy',
'-codec:a:0 copy',
'-codec:v:1 libx264 -s 640x320',
'-codec:a:1 aac', 
'-b:a:1 32k',
'-map 0:v',   
'-map 0:a',
'-map 0:v',
'-map 0:a',
'-f hls', 
'-var_stream_map "v:0,a:0 v:1,a:1"',
'-hls_list_size 6',
'-hls_wrap 10',
'-hls_time 10', 
'-hls_playlist_type vod',
'-master_pl_name master.m3u8',
'./output/out%v/playlist.m3u8'].join(' ');
console.log(cmd);
process.exec(cmd, (error, stdout, stderr)=>{
        console.log("error:"+error);
        console.log("stdout:"+stdout);
        console.log("stderr:"+stderr);
    });