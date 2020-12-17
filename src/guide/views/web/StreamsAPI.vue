<template>
  <el-main>
    <h3>概念</h3>
    <p>
      流式传输涉及将要通过网络接收的资源分解成小块，然后一点一点地处理它。这是浏览器在接收要显示在网页上的资产时无论如何要做的事情-视频缓冲区和更多的内容可以逐渐播放，有时您会看到图像随着加载的内容逐渐显示。
    </p>

    <p>
      但这是JavaScript以前从未有过的。以前，如果我们要处理某种类型的资源（例如视频或文本文件等），则必须下载整个文件，等待将其反序列化为合适的格式，然后再处理收到全部款项后，整个订单。
    </p>

    <p>
      由于Streams可用于JavaScript，所有这些都发生了变化—现在，您就可以在客户端上可用JavaScript时就开始一点一点地开始处理JavaScript原始数据，而无需生成缓冲区，字符串或Blob。
    </p>
    <el-image
      src="https://mdn.mozillademos.org/files/15817/Concept.png"
    ></el-image>
    <p>
      还有其他优点-您可以检测流何时开始或结束，将流链接在一起，根据需要处理错误和取消流，并对读取流的速度做出反应。
    </p>

    <h3>简单流复制</h3>
    <el-row :gutter="10">
      <el-col :span="18">
        <img :src="gray.source" alt="" style="width: 320px" />
        <img :src="gray.target" alt="" style="width: 320px" />
      </el-col>
      <el-col :span="6">
        左图是原始的，右图是使用自定义流创建的，该流实现图像拷贝。
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import GrayscalePNGTransformer from "./../../plugins/png-lib";
export default {
  name: "StreamsAPI",
  data() {
    return {
      gray: {
        source: null,
        target: null,
      },
    };
  },
  mounted() {
    this.grayScaledPNG();
  },
  methods: {
    grayScaledPNG() {
      fetch("/assets/logo.png")
        // 将其主体作为ReadableStream检索
        .then((response) => {
          return response.body;
        })
        // 创建一个灰色比例的PNG流
        .then((rs) => {
          console.log(rs);
          const reader = rs.getReader();
          return new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader.read();
                // 当不再需要消耗数据时，中断读数
                if (done) {
                  break;
                }
                // 将下一个数据块排队到我们的目标流中
                controller.enqueue(value);
              }
              // 关闭数据流
              controller.close();
              reader.releaseLock();
            },
          });
        })
        // 从流中创建新响应
        .then((rs) => new Response(rs))
        // 为响应创建对象URL
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        // Update image
        .then((url) => (this.gray.target = url))
        .catch((err) => console.error(err));
    },
  },
};
</script>
