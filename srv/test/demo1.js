process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdout.write('请输入:'); //标准输出
process.stdin.on('data', function (data) {
    var str = data.slice(0, -2);
    process.stdin.emit('end');
    process.stdout.write('输入的:' + str);
});
process.stdin.on('end', function () {
    process.stdin.pause();
});

/* const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('你认为 Node.js 中文网怎么样？', (answer) => {
    // 对答案进行处理
    console.log(`多谢你的反馈：${answer}`);
    rl.close();
}); */