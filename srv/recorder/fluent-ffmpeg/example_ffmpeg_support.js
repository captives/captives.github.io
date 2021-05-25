const ffmpeg = require('fluent-ffmpeg');

/**
 * 查询ffmpeg功能
 * fluent-ffmpeg使您能够查询已安装的ffmpeg版本，以获得支持的格式、编解码器和过滤器。
 */
ffmpeg.getAvailableFormats((err, formats) => {
    console.log("Available formats:");
    console.dir(formats);
});

ffmpeg.getAvailableCodecs((err, codecs) => {
    console.log("Available codecs:");
    console.dir(codecs);
});

ffmpeg.getAvailableFilters((err, filters) => {
    console.log("Available filters:");
    console.dir(filters);
});

// Those methods can also be called on commands
new ffmpeg({ source: './../demo.mp4' })
    .getAvailableCodecs((err, codecs) => {
        console.log("Available codecs:");
        console.dir(codecs);
    });