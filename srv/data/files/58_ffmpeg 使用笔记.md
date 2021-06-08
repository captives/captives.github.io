# ffmpeg 使用笔记


## 录制

### 转录网络媒体流
```sh
ffmpeg -i {input_url} -c copy {output_file}
```
示例
录制hls,rtmp,http文件流
```sh
ffmpeg -i https://tencent.avalive.cn/8cf3a1e9vodcq1256803167/1613cd155285890819181394384/playlist_eof.m3u8 -c copy record_1.flv
```


## 转码


