let that = null;
export default class VueLogger {
    constructor() {
        this.debug = false;
        this.log = console.log;
        this.info = console.info;
        this.warn = console.warn;
        this.error = console.error;
        this.includeTime = true;
        this.includeLevel = true;
        this.includeLabel = true;
        this.color = { log: "", info: "", warn: "", error: "" };
        that = this;
        console.history = [];
        this.prefix = 'Vue-Debug:';

        console.log = function() {
            if (that.debug) {
                that.log("%c" + that.prefix, 'color: blue; font-weight: 600', ...arguments);
                // that.log.apply(console, arguments);
                that.trace("[LOG]", arguments, that.color.log || '#8DDAF0');
            }
        };

        console.info = function() {
            if (that.debug) {
                that.info("%c" + that.prefix, 'color: blue; font-weight: 600', ...arguments);
                // that.info.apply(console, arguments);
                that.trace("[INFO]", arguments, that.color.info || '#35AD83');
            }
        };

        console.warn = function() {
            if (that.debug) {
                that.warn("%c" + that.prefix, 'color: blue; font-weight: 600', ...arguments);
                // that.warn.apply(console, arguments);
                that.trace("[WARN]", arguments, that.color.warn || '#FDDC03');
            }
        };

        console.error = function() {
            if (that.debug) {
                that.error("%c" + that.prefix, 'color: blue; font-weight: 600', ...arguments);
                // that.error.apply(console, arguments);
                that.trace("[ERROR]", arguments, that.color.error || '#F25745');
            }
        }

        console.clear = function() {
            that.clear();
        };
    }

    trace(tag, args, color) {
        var arr = Array.prototype.slice.call(args);

        that.includeLevel && arr.unshift(tag);
        that.includeTime && arr.unshift(new Date().toLocaleString());
        arr.unshift(this.prefix);
        arr.unshift('>');

        var text = arr.join("&nbsp;&nbsp;");
        console.history.push(text);

        var item = document.createElement('li');
        item.innerHTML = text;
        item.style.color = color || '#FFF';
        var debug = document.getElementById("console");
        if (debug) {
            debug.appendChild(item);
            debug.scrollTop = debug.scrollHeight;
        }
        return text;
    }

    clear() {
        var debug = document.getElementById("console");
        if (debug) {
            debug.innerText = "";
        }
    }
}