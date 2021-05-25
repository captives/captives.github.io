var path = require('path');
function stackInfo() {
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
    var stacklist = (new Error()).stack.split('\n').slice(3);
    var s = stacklist[0];
    var sp = stackReg.exec(s) || stackReg2.exec(s);
    var data = {};
    if (sp && sp.length === 5) {
        data.method = sp[1];
        data.path = sp[2];
        data.line = sp[3];
        data.pos = sp[4];
        data.file = path.basename(data.path);
    }
    return data;
};

//换行标志
const eol = require('os').EOL;
class Logger {
    constructor() {
        this.namespace = "default";
        this.includeTime = true;
        this.includeLevel = true;
        this.includeLabel = true;
        this.includeMethod = false;
        this.color = {
            default: 0, //系统默认色
            black: 36,//黑色
            red: 31,//红色
            green: 32,//绿色
            yellow: 33,//黄色
            blue: 34,//蓝色
            pink: 35,//粉红
            cyan: 36,//青色
            gray: 37,//灰色
        };
    }

    static create(val){
        let logger = new Logger();
        logger.namespace = val;
        return logger;
    }

    trace(level, stackInfo, arr) {
        var method = stackInfo['method'];
        var file = stackInfo['file'];
        var line = stackInfo['line'];

        if (this.includeLabel) {
            arr.unshift(file + ':' + line);//文件和行号
        }

        arr.unshift(this.namespace);

        if (this.includeLevel) {
            arr.unshift(level);//日志级别
        }

        if (this.includeTime) {
            arr.unshift('[' + new Date().toLocaleString() + ']');//日志级别
        }
        
        arr.push(eol);
        return process.stdout.write("> " + arr.join(' '));
    }

    log() {
         this.trace("[LOG]", stackInfo(), Array.prototype.slice.call(arguments));
    };

    info() {
        this.trace("[INFO]", stackInfo(), Array.prototype.slice.call(arguments));
    };

    warn() {
        this.trace("[WARN]", stackInfo(), Array.prototype.slice.call(arguments));
    };

    error() {
        this.trace("[ERROR]", stackInfo(), Array.prototype.slice.call(arguments));
    };

    fatal() {
        this.trace("[FATAL]", stackInfo(), Array.prototype.slice.call(arguments));
    };
}
module.exports = Logger;
