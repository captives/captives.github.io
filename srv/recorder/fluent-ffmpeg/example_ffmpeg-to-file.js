const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');


var outStream = fs.createWriteStream(path.join(__dirname, './output/first_video.mp4'));
const command = ffmpeg('./../input/demo.mp4')
    .addInputOption('-re')
    .inputFPS(29.7)//可改变帧速率
    .videoCodec('libx264')//视频编码
    .audioBitrate('128k')//比特率
    .audioChannels(2)//声道no de
    .audioCodec('copy')//音频编码
    .size('720x?')//固定宽度
    .aspect('4:3') //约束比例
    .autopad('#35A5FF')//填充背景色
    .format('flv')
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
    //TODO 存储1:是方式3的语法糖; 将输出输出到可以写流
    .pipe(outStream, { end: true })

    //TODO 存储2: 将输出保存到文件
    // .save(path.join(__dirname, 'first.mp4'));

    //TODO 存储3: 
    // .output('first.mov')
    // .run()