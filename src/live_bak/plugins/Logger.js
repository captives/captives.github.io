let logger = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  includeTime: true,
  includeLevel: true,
  includeLabel: true,
  color: { log: "", info: "", warn: "", error: "" },
  trace: function (tag, args, color) {
    for (var i in args) {
      if (typeof args[i] == "object") {
        args[i] = JSON.stringify(args[i]);
      }
    }

    var arr = Array.prototype.slice.call(args);

    logger.includeLevel && arr.unshift(tag);
    logger.includeTime &&
      arr.unshift(new Date().toLocaleString("chinese", { hour12: false }));
    arr.unshift(">");
    var text = arr.join("&nbsp;&nbsp;");
    var item = document.createElement("li");
    item.innerHTML = text;
    item.style.color = color || "#FFF";
    var debug = document.getElementById("console");
    if (debug) {
      debug.appendChild(item);
      debug.scrollTop = debug.scrollHeight;
    }
    return text;
  },
  clear: function () {
    var debug = document.getElementById("console");
    if (debug) {
      debug.innerText = "";
    }
  },
};

console.log = function () {
  logger.log.apply(console, arguments);
  logger.trace("[LOG]", arguments, logger.color.log || "#8DDAF0");
};

console.info = function () {
  logger.info.apply(console, arguments);
  logger.trace("[INFO]", arguments, logger.color.info || "#35AD83");
};

console.warn = function () {
  logger.warn.apply(console, arguments);
  logger.trace("[WARN]", arguments, logger.color.warn || "#FDDC03");
};

console.error = function () {
  logger.error.apply(console, arguments);
  logger.trace("[ERROR]", arguments, logger.color.error || "#F25745");
};

console.clear = function () {
  logger.clear();
};

export default logger;
