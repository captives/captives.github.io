<template>
  <el-container>
    <el-main class="center">
      <canvas ref="canvas"></canvas>
      <el-pagination
        :page-size="1"
        :pager-count="7"
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="pages"
        @current-change="init"
      ></el-pagination>
    </el-main>
    <el-aside width="30%">
      <p>1、安装pdfjs依赖</p>
      <vue-code>
        <pre lang="javascript">npm install pdfjs-dist --save-dev</pre>
      </vue-code>
      <p>2、引用</p>
      <vue-code>
        <pre lang="javascript">
import PDF from 'pdfjs-dist'

PDF.disableWorker = true;
const loadingTask = PDF.getDocument(this.url);
loadingTask.promise.then(PDFDocument => {
    this.pdf = PDFDocument;
    this.pages = PDFDocument.numPages;
    this.pdf.getPage(num).then(this.renderPage);
});
</pre>
      </vue-code>

      <p>3、使用canvas作为预览pdf文件的画布</p>
      <span style="font-size:13px">
        每个PDF页面都有其自己的视口，该视口定义了以像素为单位的大小（72DPI）和初始旋转。
        默认情况下，视口会缩放为PDF的原始大小，但是可以通过修改视口来更改。
        创建视口时，还将创建一个初始转换矩阵，该矩阵考虑了所需的比例和旋转，并转换坐标系
      </span>
      <vue-code>
        <pre lang="html">
&lt;canvas ref=&quot;canvas&quot;&gt;&lt;/canvas&gt;
</pre>

        <pre lang="javascript">
var canvas = this.$refs.canvas;
var context = canvas.getContext('2d');

const getStyle = (obj, attr) => {
    return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];
}

const dpr = window.devicePixelRatio || 1
const bsr = context.webkitBackingStorePixelRatio ||
context.mozBackingStorePixelRatio ||
context.msBackingStorePixelRatio ||
context.oBackingStorePixelRatio ||
context.backingStorePixelRatio || 1
const ratio = dpr / bsr;

const padding = parseInt(getStyle(canvas.parentNode, 'padding-left')) * 2;
const viewport = page.getViewport((canvas.parentNode.clientWidth - padding) / page.getViewport(1).width);
canvas.width = viewport.width * ratio;
canvas.height = viewport.height * ratio;
canvas.style.width = viewport.width + 'px';
canvas.style.height = viewport.height + 'px';
</pre>
      </vue-code>

      <p>4、渲染页面</p>
      <vue-code>
        <pre lang="javascript">page.render({ canvasContext: context, viewport: viewport });</pre>
      </vue-code>
      <p>
        5、
        <source-code :value="[{ value: 'components/SourceCode.vue', lang: 'html' }]">
          <template slot-scope="data">
            <span>完整源码</span>
            <el-row v-for="item in data" :key="item.value">
              <vue-code v-if="item.code">
                <p>{{item.value}}</p>
                <pre :lang="item.lang">{{item.code}}</pre>
              </vue-code>
            </el-row>
          </template>
        </source-code>
      </p>
    </el-aside>
  </el-container>
</template>
<script>
import PDF from 'pdfjs-dist'

export default {
  name: "PDFJs",
  data() {
    return {
      url: "assets/color-card.pdf",
      pdf: null,
      pages: 0,
    }
  },
  methods: {
    init(num) {
      this.pdf.getPage(num).then(this.renderPage)
    },
    renderPage(page) {
      var canvas = this.$refs.canvas;
      var context = canvas.getContext('2d');

      const getStyle = (obj, attr) => {
        return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];
      }

      const dpr = window.devicePixelRatio || 1
      const bsr = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1
      const ratio = dpr / bsr;

      const padding = parseInt(getStyle(canvas.parentNode, 'padding-left')) * 2;
      const viewport = page.getViewport((canvas.parentNode.clientWidth - padding) / page.getViewport(1).width);
      canvas.width = viewport.width * ratio;
      canvas.height = viewport.height * ratio;
      canvas.style.width = viewport.width + 'px';
      canvas.style.height = viewport.height + 'px';

      page.render({ canvasContext: context, viewport: viewport });
    }
  },
  mounted() {
    PDF.disableWorker = true;
    const loadingTask = PDF.getDocument(this.url);
    loadingTask.promise.then(PDFDocument => {
      this.pdf = PDFDocument;
      this.pages = PDFDocument.numPages;
      this.init(1);
    });
  }
}
</script>

<style lang="stylus" scoped>
.el-main {
  .el-pagination {
    margin-top: 40px;
  }
}

.el-aside {
  padding: 20px;
}
</style>