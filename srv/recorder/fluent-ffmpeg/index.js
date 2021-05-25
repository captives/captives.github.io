const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const command = ffmpeg('./../input/demo.mp4')
    .noAudio()//禁用音频
    // .input('./../input/jinli.mp3')
    .inputFPS(29.7)//可改变帧速率
    .videoCodec('libx264')//视频编码
    .audioBitrate('128k')//比特率
    .audioChannels(2)//声道
    .audioCodec('copy')//音频编码
    .audioFilters(['volume=1.5', 'silencedetect=n=250dB:d=5'])
    .size('720x?')//固定宽度
    .aspect('4:3') //约束比例
    .autopad('#35A5FF')//填充背景色
    .screenshots({
        timestamps: [30.5, '50%', '01:10.123'],
        filename: 'thumbnail-at-%s-seconds.png',
        folder: path.join(__dirname, "/output/"),
        size: '320x240'
    })
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
    // 将输出保存到文件
    .save(path.join(__dirname, './output/first.mp4'));