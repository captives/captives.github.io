频道名称  
	UU晚安故事12345

推流地址
	rtmp://pdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245?wsSecret=00ffaf262ba8b981bc5d3a7e5ce1fd0b&wsTime=1601367238  
拉流地址(HTTP)
	http://flvdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245.flv?netease=flvdl471bd653.live.126.net  
拉流地址(HLS)
	http://pullhlsdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245/playlist.m3u8  
拉流地址(RTMP)
	rtmp://vdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245



ffmpeg -re -i musicvideo.mp4 -c copy -f flv rtmp://pdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245?wsSecret=f384c79966e61243acb08fb024f1efe6&wsTime=1569383502

ffmpeg -re -i demo.mp4 -c copy -f flv rtmp://pdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245?wsSecret=f384c79966e61243acb08fb024f1efe6&wsTime=1569383502


ffmpeg -f gdigrab -framerate 6 -video_size 360x640 -i desktop -c:a copy -c:v libx264 -f flv -s 360x640 rtmp://pdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245?wsSecret=f384c79966e61243acb08fb024f1efe6&wsTime=1569383502

ffmpeg -f gdigrab -framerate 6 -video_size 360x640 -i desktop -c:a copy -c:v libx264 -f flv rtmp://pdl471bd653.live.126.net/live/990b997ca20146dfa0ae86f0874d9245?wsSecret=f384c79966e61243acb08fb024f1efe6&wsTime=1569383502

扩展资料：FFMPEG推流到RTMP服务器命令
1、将文件当作源推送到RTMP服务器

ffmpeg -re -i localFile.mp4 -c copy -f flv rtmp://server/live/streamName


参数解释
-r 以本地帧频读数据，主要用于模拟捕获设备。表示ffmpeg将按照帧率发送数据，不会按照最高的效率发送


2、将直播文件保存至本地

ffmpeg -i rtmp://server/live/streamName -c copy dump.flv


3、将其中一个直播流中的视频改用H.264压缩，音频不变，推送到另外一个直播服务器

ffmpeg -i rtmp://server/live/originalStream -c:a copy -c:v libx264 -vpre slow -f flv rtmp://server/live/h264Stream  


4、将其中一个直播流中的视频改用H.264压缩，音频改用aac压缩，推送到另外一个直播服务器

ffmpeg -i rtmp://server/live/originalStream -c:a libfaac -ar 44100 -ab 48k -c:v libx264 -vpre slow -vpre baseline -f flv rtmp://server/live/h264Stream


5、将其中一个直播流中的视频不变，音频改用aac压缩，推送到另外一个直播服务器

ffmpeg -i rtmp://server/live/originalStream -acodec libfaac -ar 44100 -ab 48k -vcodec copy -f flv rtmp://server/live/h264_AAC_Stream


6、将一个高清流复制为几个不同清晰度的流重新发布，其中音频不变

ffmpeg -re -i rtmp://server/live/high_FMLE_stream -acodec copy -vcodec x264lib -s 640×360 -b 500k -vpre medium -vpre baseline rtmp://server/live/baseline_500k -acodec copy -vcodec x264lib -s 480×272 -b 300k -vpre medium -vpre baseline rtmp://server/live/baseline_300k -acodec copy -vcodec x264lib -s 320×200 -b 150k -vpre medium -vpre baseline rtmp://server/live/baseline_150k -acodec libfaac -vn -ab 48k rtmp://server/live/audio_only_AAC_48k  


7、将当前摄像头以及扬声器通过DSHOW采集，使用H.264/AAC压缩后推送到RTMP服务器

ffmpeg -r 25 -f dshow -s 640×480 -i video=”video source name”:audio=”audio source name” -vcodec libx264 -b 600k -vpre slow -acodec libfaac -ab 128k -f flv rtmp://server/application/stream_name


8、将一个JPG图片经过H.264压缩后输出为MP4文件

ffmpeg -i INPUT.jpg -an -vcodec libx264 -coder 1 -flags +loop -cmp +chroma -subq 10 -qcomp 0.6 -qmin 10 -qmax 51 -qdiff 4 -flags2 +dct8x8 -trellis 2 -partitions +parti8x8+parti4x4 -crf 24 -threads 0 -r 25 -g 25 -y OUTPUT.mp4  


9、将MP3转化为AAC

ffmpeg -i 20120814164324_205.wav -acodec  libfaac -ab 64k -ar 44100  output.aac  


10、将AAC文件转化为flv文件，编码格式采用AAC

ffmpeg -i output.aac -acodec libfaac -y -ab 32 -ar 44100 -qscale 10 -s 640*480 -r 15 output.flv



扩展资料：ffmpeg推流命令详解


-re			按照帧率发送；如果不加，手册里说的是发送as fast as possible。
-i			输入
-vcodec copy		视频编码不变
-acodec copy		音频编码不变
-f 			flv输出格式flv
-y			直接写到输出文件。


-L			show license			显示许可

-h topic		show help			主题显示帮助

-help topic		show help			显示帮助

-version		show version			显示版本

-buildconf		show build configuration	显示构建配置

-formats		show available formats		显示可用的格式

-devices		show available devices		设备显示可用的设备

-codecs 		show available codecs		显示可用的编解码器

-decoders		show available decoders		显示可用解码器

-encoders		show available encoders		显示可用编码器

-bsfs			show available bit stream filters显示可用的比特流过滤器

-protocols		show available protocols	显示可用的协议

-filters 		show available filters		显示可用的过滤器

-pix_fmts		show available pixel formats	显示可用的像素格式

-layouts		show standard channel layouts	显示标准的频道布局

-sample_fmts		show available audio sample formats	显示可用的音频样本格式

-colors			show available color names		显示可用的颜色名称

-sources device		list sources of the input device	列表源输入设备

-sinks device		list sinks of the output device		列表的输出设备

-hwaccels		show available HW acceleration methods	展示了HW加速方法


