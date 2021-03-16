/*
 * jQuery File Upload Demo
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global $ */

$(function() {
    'use strict';

    // 初始化jQuery文件上载小部件：
    $('#fileupload').fileupload({
        // 取消注释以下内容以发送跨域Cookie：
        // xhrFields: { withCredentials: true },
        url: 'server/php/'
    });

    // 通过重定向选项启用iframe跨域访问：
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(/\/[^/]*$/, '/cors/result.html?%s')
    );

    if (window.location.hostname === 'blueimp.github.io') {
        // Demo settings:
        $('#fileupload').fileupload('option', {
            url: '//jquery-file-upload.appspot.com/',
            // 启用图像大小调整，Android和Opera除外，它们实际上支持图像大小调整，但无法通过XHR请求发送Blob对象：
            disableImageResize: /Android(?!.*Chrome)|Opera/.test(
                window.navigator.userAgent
            ),
            maxFileSize: 999000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
        // 为支持CORS的浏览器上载服务器状态检查：
        if ($.support.cors) {
            $.ajax({
                url: '//jquery-file-upload.appspot.com/',
                type: 'HEAD'
            }).fail(function() {
                $('<div class="alert alert-danger"></div>')
                    .text('上载服务器当前不可用 - ' + new Date())
                    .appendTo('#fileupload');
            });
        }
    } else {
        // 加载现有文件：
        $('#fileupload').addClass('fileupload-processing');
        $.ajax({
                // 取消注释以下内容以发送跨域Cookie：
                // xhrFields: { withCredentials: true },
                url: $('#fileupload').fileupload('option', 'url'),
                dataType: 'json',
                context: $('#fileupload')[0]
            })
            .always(function() {
                $(this).removeClass('fileupload-processing');
            })
            .done(function(result) {
                console.log('上传完成', result);
                $(this)
                    .fileupload('option', 'done')
                    .call(this, $.Event('done'), { result: result });
            });
    }
});