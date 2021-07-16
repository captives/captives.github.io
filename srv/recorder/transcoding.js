// ffmpeg -i *.mp4 -s 1280x720  *.mov

const fs = require('fs-extra');
const async = require('async');
const ffmpeg = require('fluent-ffmpeg');
let list = [];

function createTask(path, output) {
    fs.ensureDirSync(output);
    let dirs = fs.readdirSync(path) || [];
    dirs.forEach(dir => {
        const _path = path + '/' + dir;
        const stat = fs.lstatSync(_path);
        if (stat.isDirectory()) {
            //继续遍历
            createTask(path + '/' + dir, output + '/' + dir);
        } else {
            //视频文件加入任务
            const ext = dir.lastIndexOf('.') != -1 && dir.substr(dir.lastIndexOf('.'), dir.length);
            if (['.mp4', '.mov', '.flv', '.mpeg'].includes(ext)) {
                let file = {
                    path: _path,
                    output: output + "/" + dir,
                    name: dir.substr(0, dir.lastIndexOf('.')),
                    ext,
                    ...stat
                };
                list.push(file);
            }
        }
    });
}
createTask("/Volumes/DATA/整理文档/仿知乎专栏企业级项目", "/Volumes/DATA/整理文档/仿知乎专栏企业级项目_output");
// console.log(list);
console.log(list.length);
async.eachLimit(list, 3, (item, callback) => {
    console.log('\n\n\n\n任务输入', item.path);
    console.log('任务输出', item.output);

    const command = ffmpeg(item.path)
        .addInputOption('-re')
        // .addInputOption('-re')
        // .inputOptions('-stream_loop -1')
        // .inputFPS(29.7) //可改变帧速率
        // .videoCodec('libx264') //视频编码
        // .audioBitrate('128k') //比特率
        // .audioChannels(2) //声道no de
        // .audioCodec('copy') //音频编码
        .size('720x?') //固定宽度
        // .aspect('4:3') //约束比例
        // .autopad('#35A5FF') //填充背景色
        // .format('flv')
        .on('start', commandLine => {
            console.log('视频开始处理: ' + commandLine);
        })
        // 输入编解码器数据
        .on('codecData', data => {
            console.log('Input is ' + data.audio + ' audio ' + 'with ' + data.video + ' video');
        })
        //进度
        .on('progress', progress => {
            console.log(item.name, 'Processing: ' + Math.round(progress.percent) + '% done');
        })
        // 转码错误
        .on('error', err => {
            console.log(item.name, '处理视频发生错误: ' + err.message);
        })
        //处理完成
        .on('end', () => {
            console.log('处理视频成功:', item.name);
            callback()
        })
        .output(item.output)
        .run()
}).then((err) => {
    console.log("转码完成", err);
})