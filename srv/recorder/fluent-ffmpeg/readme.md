# **fluent-ffmpeg 使用指南**

## **查询ffmpeg功能**
fluent-ffmpeg使您能够查询已安装的ffmpeg版本，以获得支持的格式、编解码器和过滤器。

查看: `example_ffmpeg_support.js`

## **HLS**
### 介绍
HLS对于音视频是有编码要求的，HLS要求视频必须是H264协议,H264是目前最流行也是最成熟的视频编解码方案了。而在音频上，则要求为MP3, HE-AAC或AC-3这三种格式。在转换成HLS流后，会生成多个的TS文件。如果是点播的话，则是对视频文件进行TS的切片处理，一般情况下，每个TS文件的播放时间为10秒。但这并不是固定的，切片的多少，这是会影响直播的延迟情况。

HLS会生成一个m3u8的播放文件。这个播放文件可以通过VLC等一些播放器直接播放。现在大部分手机也支持HLS了，所以手机也是可以进行对HLS的直播或点播进行观看。但是目前的桌面端浏览器尚未完全支持HTML5的HLS播放，大部分直播还是依赖flash player进行封装直播（据说国内的很多视频站有自己的播放技术）。这边主要讨论的并非是桌面端，主要还是移动端的支持。

以下是由ffmpeg生成的一个直播的m3u8文件:
```markdown
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-ALLOW-CACHE:YES
#EXT-X-TARGETDURATION:16
#EXTINF:10.560000,
hls_out000.ts
#EXTINF:9.520000,
hls_out001.ts
#EXTINF:15.040000,
hls_out002.ts
#EXTINF:10.160000,
hls_out003.ts
#EXT-X-ENDLIST
```
-  `EXT-X-TARGETDURATION` 用来表示每个TS分片间隔为13秒。该参数是必须的，并且在同一个列表中是不能被改变的（直播是有列表大小的，当列表被刷新后，这个参数也可能不一样）。一般为10秒。
-  `EXT-X-MEDIA-SEQUENCE` 用来表示当前列表中第一个播放的媒体序列号
-  `EXTINF` 则表示当前TS分片所播放的时长
-  `EXT-X-ENDLIST` 表示列表结束，是必须要有的参数

m3u8文件还有一些其余的参数，并可以控制对应带宽播放哪些文件（也就是HLS可以更好自适应当前的网络带宽）等，这些具体还是去看RFC草案吧。


### HLS点播和直播的区别
- 点播就是将一个媒体文件切分成多个TS文件，并且m3u8文件包含全部的TS文件列表。

- 直播则在列表长度上会有所控制，也就是一般会比较短，并且为了减少延迟，可能会将每个分片的时长控制低于10秒，而点播都会直接使用10秒这个默认值。

- 点播的m3u8是死的，也就是一旦分片完成后，一般不会再去修改m3u8文件（内容）。而直播的m3u8文件（内容）则会根据直播的时间进行更新。（其实这点很重要，直播与点播的最大区别，也应该是大部分客户端判断的标准吧，目前还没细致去研究任何一款客户端）
  
- HLS点播其实是很不错的技术，支持不同带宽的播放列表（前提切片后需要对应的子m3u8播放文件以及对应分辨率的TS文件），缺点是10秒的切片，会导致有很多的小文件存在。而直播，依托现有CDN技术以及HTTP的支持，可以很好的支持高清直播。但是也有一定的硬伤，那就是延迟。
  


### ffmpeg之ssegment模块切片

```cmd
ffmpeg 
    -i source.mp4 
    -codec:v libx264 
    -codec:a mp3 
    -map 0 
    -f ssegment 
    -segment_format mpegts 
    -segment_list playlist.m3u8 
    -segment_time 10 
    out%03d.ts
```
这个用的ffmpeg的ssegment模块来进行对source.mp4文件进行切片，不带上-re参数，这样可以以最快的速度进行切片操作（当然该操作会消耗很大的CPU）; 

segment_format来指定输出格式为mpegts, segment_list用来配置输出的列表文件名, segment_time则是切片的时长。还有一些其余的参数，可以看ffmpeg的官方使用文档，或直接看libavformat/segment.c源文件，就会比较清楚了。

查看: `example_hls_segment-video-slice.js`


### ffmpeg之ssegment模块切片直播

```cmd
ffmpeg -re 
    -i source.mp4 
    -codec:v libx264 
    -codec:a mp3 
    -map 0 
    -f ssegment 
    -segment_format mpegts 
    -segment_list playlist.m3u8 
    -segment_list_flags +live 
    -segment_list_size 6 
    -segment_time 10 
    out%03d.ts
```
与点播的区别就是在加了`-segment_list_flags +live`以示直播，并且加上了-re参数; segment_list_size参数对列表数量进行控制在6个, 生成的TS文件并不会循环，会一直被保留, 对于录制需求,这是一个很棒的功能;

查看: `example_hls_segment-video-slice-live.js`


### ffmpeg之hls模块切片直播

```cmd
ffmpeg -re 
    -i source.mp4 
    -codec:v libx264 
    -codec:a libfaac 
    -map 0 
    -f hls  
    -hls_list_size 6 
    -hls_wrap 10 
    -hls_time 10 
    playlist.m3u8
```
- `hls_list_size`即为HLS播放的列表，
- `hls_wrap` 则表示为最大的TS循环数，也就是每10个一个循环，比如现在是生成playlist0.ts~playlist9.ts，10个文件，之后又会从playlist0.ts重新生成。

目前新版本的ffmpeg的HLS模块加了很多参数，具体可以看libavformat/hlsenc.c中的*static const AVOption options[]* 的内容，其中HLS还支持加密的操作;

HLS模块实现于libavformat/hlsenc.c、libavformat/hls.c、libavformat/hlsproto.c;

查看: `example_hls_hls-video-slice-live.js`

### ffmpeg之hls模块多码率hls生成

```cmd
ffmpeg -re 
    -i source.mp4
    -codec:v:0 copy 
    -codec:a:0 copy
    -codec:v:1 libx264 -s 640x320
    -codec:a:1 aac 
    -b:a:1 32k
    -map 0:v    //取第一路流的视频
    -map 0:a    //取第一路流的音频
    -map 0:v    //取第一路流的视频
    -map 0:a    //取第一路流的音频
    -f hls  
    -var_stream_map 'v:0,a:0 v:1,a:1'
    -hls_list_size 6
    -hls_wrap 10
    -hls_time 10 
    -hls_playlist_type vod
    -master_pl_name master.m3u8
    out%v/playlist.m3u8
```
- `master_pl_name`用于指定输出的master playlist文件名；
- `var_stream_map`用于指定variant list中包含的节目信息，其中以空格分隔，比如上面的参数表示：variant#0中包含原始的1080p视频和音频，variant#1包含640x320的视频和32k的音频。

这个命令输出的master.m3u8格式如下：
```markdown
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=773027,RESOLUTION=1280x720
out0/playlist.m3u8

#EXT-X-STREAM-INF:BANDWIDTH=35200,RESOLUTION=640x320,CODECS="avc1.640016,mp4a.40.2"
out1/playlist.m3u8。
```
所生成的ts文件分别位于out0和out1目录下。

查看: `example_hls_hls-video-slice-live-multiple.js`


### HLS切片合并
- 本地合并
```cmd 
ffmpeg -i playlist.m3u8 -c copy playlist.mp4
```

- 线上合并
```cmd
ffmpeg -i https://xxx.com/playlist.m3u8 -c copy playlist.mp4
```

查看: `example_hls-to-mp4-mov.js`

## **fluent-ffmpeg** 文件输入输出流

### 文件输出流




###  常用选项说明
-f fmt(输入/输出)
    强制输入或者输出文件格式。通常输入文件的格式会被自动检测。然后通过文件扩展名猜测输出文件格式，因此在大多数情况下，该选项不需要显式使用。

-i url（输入文件）
    输入文件的url。

-y（全局）
    不通过询问而直接覆盖输出文件。

-n（全局）
    不覆盖输出文件，如果已经存在同名文件则立即退出。

-stream_loop number(输入)
    设置输入流循环的次数，0意味着不循环，-1意味着无限循环。

-c[:stream_specifier] codec (输入/输出,每个流)
-codec[:stream_specifier] codec (输入/输出,每个流)
    为一个或者多个流选择一个解码器或者编码器，codec选项是一个编码器或者解码器，或者使用copy来表明这仅仅是流复制，流的复制不需要进行重新编码。如：
```
    ffmpeg -i input.avi -map 0 -c:v libx264 -c:a copy output.avi  // 使用libx264来编码所有的流，并复制音频。
```

-t duration（输入/输出）
    当用作输入选项时（-i之前），可以限制从输入文件读取数据的时间。
    当用作输出选项时（在输出url之前），到达持续时间后停止写入数据。
    -t的时间值必须符合时间格式规范。具体参考后面章节。

-to position(输出)
    在给定的位置上停止写入数据到输出。position必须符合时间格式规范。具体参考后面章节。

-fslimit_size(输出)
    设置文件大小限制，使用字节表示。到达字节限制时会停止写入字节数，

-ss position(输入/输出)
    当用作输入选项时（-i之前），会在此文件中寻找position指定的位置。注意：在大多数容器格式中，不可能完全寻找到，所以ffmpeg会寻求距离position最近的点。
    用作输出选项时（在输出url之前），解码，但是会丢弃输入，直到时间戳抵达position。同样的，position依然是时间格式。

-sseof position(输入/输出)
    这个选项于ss相似，但是相对于文件结束符（eof=end of file），

-itsoffset offset（输入）
    设置输入的时间偏移量。offset必须是一个时间段偏移量。偏移量会被添加到输入文件的时间戳中。指定了正的偏移量意味着相应的流被延迟了偏移量设定的时间段。

-timestamp date（输出）
    在容器中设置录制时间戳。date必须是一个日期格式规范。

-metadata[:metadata_specifier] key=value(输出，每个metadata)
   设置元数据键值对。可选的元数据说明符（metadata_specifier）可以用来设置流/章节/节目上的元数据。例如：
```
    ffmpeg -i input.avi -metadata title="my title" out.flv      //   这串指令用于设置输出文件的标题元数据。
    ffmpeg -i input.avi -metadata:s:a:0 language=eng out.flv    //   设置该流的第一个音频的语言。
```

-disposition[:stream_specifier] value(输出，每个流)
    # 该选项会从输入流中复制配置，并且覆盖输出流。可以通过设置其值为0来删除这个设置。
    # 以下是disposition的枚举值：
    default
    dbd
    original
    comment
    lyrics
    karaoke
    forced
    hearing_impaired
    visual_impaired
    clean_effects
    captions
    descriptions
    metadata
    如：
```
    ffmpeg -i in.mkv -disposition:a:1 default out.mkv # 将第二个音频设置为default

    ffmpeg -i INPUT -disposition:s:0 0 -disposition:s:1 default OUTPUT # 将第二个字幕流设置为默认，从第一个字幕流中移除默认配置。
```

-program [title=title:][program_num=program_num:]st=stream[:st=stream...](输出)
    # 创建具有指定标题和program_num（节目编号）的节目。并将指定的流添加到其中。

-target type（输出）
    # 指定目标文件类型（vcd、svcd、dvd、dv、dv50），这些类型可能会加上pal-、ntsc-或者filem-前缀以使用相应的标准，然后自动地设置格式选项。如：
    ffmpeg -i input.avi -target vcd /tmp/vcd.mpg

-dframes number(输出)
    # 设置要输出的数据帧数量。这是一个过时的别名，它真是的样子是这样的：-frames:d,你应该使用这个来替代。

-frames[:stream_specifier] framecount(输出，每个流)
    # 在到达给定的帧数量后停止写入流。

-q[:stream_specifier] q (输出，每个流)
-qscale[:stream_specifier] q (output,per-stream)
    # 使用固定质量标尺。

-filter[:stream_specifier] filtergraph(输出，每个流)
    # 根据指定的filtergraph创建filtergraph。并用其过滤流。

-filter_script[:stream_specifier] filename (输出，每个流)
    # 该选项于-filter相似。

-filter_threads nb_threads (全局)
    # 定义了使用多少个线程用于处理过滤器管道。每个管道会产生一个线程池用于并行处理。默认是可用的cpu核心数。

-pre[:stream_specifier] preset_name (输出，每个流)
    # 为匹配的流预设。

-stats（全局）
    # 打印编码的进度和统计信息。该选项默认开启，如果要禁用它使用-nostats。

-process url（全局）
    # 发送进度信息到url。大约每秒写入一次。

-stdin
    # 在标准输入中启用交互，该选项默认启用，要禁用使用-nostdin。

-debug_ts（全局）
    # 打印时间戳信息。该选项默认禁用。调试于测试使用该选项非常有用。

-attach filename（输出）
    # 添加一个附件到输出文件，该选项仅有少量的格式支持。比如添加一个字体文件用于渲染字幕的字体。这个附件被实现为一个特定的流。所以，该选项会往文件中添加一个流。如：
    ffmpeg -i INPUT -attach DejaVuSans.ttf -metadata:s:2 mimetype=application/x-truetype-font out.flv # 注意：我们依然需要将metadata指定mime映射。

-dump_attachment[:stream_specifier] filename (输入，每个流)
    # 提取匹配的附件流到指定的文件中，文件名由filename指定。
    # 如，提取第一个附件到文件，命名为out.tff：
    ffmpeg -dump_attachment:t:0 out.tff -i INPUT

    # 如，提取所有附件到文件中：
    ffmpeg -dump_attachment:t "" -i INPUT

-noautorotate
    # 基于文件元数据禁用视频旋转。


