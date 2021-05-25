const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

/**
 * node中读是将内容读取到内存中，而内存就是Buffer对象
 * 流都是基于原生的fs操作文件的方法来实现的，通过fs创建流。
 * 所有的 Stream 对象都是 EventEmitter 的实例。
 * 常用的事件有：
 *      open    -打开文件
 *      data    -当有数据可读时触发。
 *      error   -在读收和写入过程中发生错误时触发。
 *      close   -关闭文件
 *      end     -没有更多的数据可读时触发
 * 常用的方法有:
 *      stream.pause()  -暂停读取,会暂停data事件的触发，将流动模式转变非流动模式
 *      stream.resume() -恢复data事件,继续读取，变为流动模式
 */

// var stream = fs.createReadStream('./../input/demo.mp4');
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

/**
 * 读取文件流报错:
 * - Cannot determine format of input stream 0:0 after EOF
 * - Error marking filters as finished
 * - Conversion failed!
 * 解决方案: 使用FFMpeg将moov原子移动到视频文件的开头
 * ffmpeg -i ./../input/demo.mp4 -vcodec copy -acodec copy -movflags faststart output_video_file.mp4
 */
const command = ffmpeg(stream)
    .addInputOption('-re')
    .videoCodec('libx264')//视频编码
    .audioCodec('copy')//音频编码
    .inputFormat("mp4")
    .outputFormat('mp4')
    .outputOptions('-movflags frag_keyframe+empty_moov')
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
    .output('./output/first.mp4')
    .run()