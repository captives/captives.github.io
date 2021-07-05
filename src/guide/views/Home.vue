<template>
    <el-main>
        <el-row class="content center">
            <img alt="Vue logo" src="../assets/logo.png" />
        </el-row>
        <el-row class="content">
            <h1 @click="show({ title: 'vue-code', src: 'components/Code.vue' })">
                vue-code
            </h1>
            <p>组件及样式引入</p>
            <vue-code>
                <pre lang="javascript">
import '@/assets/theme';
import Code from './../components/Code.vue'
Vue.component('vue-code', Code);
</pre>
            </vue-code>

            <p>or</p>
            <vue-code>
                <pre lang="javascript">
global.js
import '@/assets/themes-cayman/page-markdown.scss';
import Code from './components/Code';
export default {
    install(Vue) {
        Vue.component('vue-code', Code);
    }
}

main.js
import global from './../plugins/global';
Vue.use(global);
</pre>
            </vue-code>

            <p>组件使用</p>
            <vue-code>
                <pre lang="html">
&lt;vue-code&gt;
  &lt;p&gt;sh&lt;/p&gt;
  &lt;pre lang="sh"&gt;ping localhost&lt;/pre&gt;
&lt;/vue-code&gt;
</pre>
            </vue-code>

            <vue-code>
                <pre lang="css">
.el-aside {
  .el-menu {
    height: 100%;
  }
}

.el-container {
  .el-breadcrumb {
    margin-left: 20px;
    line-height: 45px;
  }
}
</pre>
            </vue-code>

            <vue-code>
                <p>console</p>
                <pre lang="console">ping localhost</pre>
            </vue-code>
            <vue-code>
                <p>bash</p>
                <pre lang="bash">ping localhost</pre>
            </vue-code>
            <vue-code>
                <p>sh</p>
                <pre lang="sh">ping localhost</pre>
            </vue-code>
            <vue-code>
                <p>cmd</p>
                <pre lang="cmd">ping localhost</pre>
            </vue-code>
        </el-row>

        <el-row class="content">
            <h1 @click="show({ title: 'vue-source', src: 'components/Source.vue' })">
                vue-source
            </h1>
            <p>组件引入</p>
            <vue-code>
                <pre lang="javascript">
import Source from './../components/Source';
Vue.component('vue-source', Source);
</pre>
            </vue-code>
            <p>组件使用</p>
            <vue-code>
                <pre lang="html">
&lt;vue-source src="/plugins/global.js" lang="javascript"&gt;&lt;/vue-source&gt;
</pre>
            </vue-code>
        </el-row>

        <el-row class="content">
            <h1 @click="show({ title: 'vue-source', src: 'components/SourceCode.vue' })">
                source-code
            </h1>
            <p>代码集合列表展示组件, 组件引入:</p>
            <vue-code>
                <pre lang="javascript">
import SourceCode from './../components/SourceCode';
Vue.component('source-code', SourceCode);

....
//数据源
list: [
  { value: 'components/SourceCode.vue', lang: "html" },
  { value: 'plugins/global.js', lang: "javascript" },
  { value: 'assets/themes-cayman/page-markdown.scss', lang: "css" },
]
</pre>
            </vue-code>
            <p>组件使用, 抽屉式弹出</p>
            <vue-code>
                <pre lang="html">
&lt;source-code :value="list"&gt;查看源码&lt;/source-code&gt;
</pre>
            </vue-code>
            <p>或自定义代码渲染</p>
            <vue-code>
                <pre lang="html">
&lt;source-code v-model="list" :drawed="false"&gt;&lt;/source-code&gt;
&lt;el-row v-for="item in list" :key="item.value"&gt;
  &lt;vue-code v-if="item.code"&gt;
    &lt;p&gt;{ { item.value } }&lt;/p&gt;
    &lt;pre :lang="item.lang"&gt;{ { item.code } }&lt;/pre&gt;
  &lt;/vue-code&gt;
&lt;/el-row&gt;
</pre>
            </vue-code>
        </el-row>

        <el-row class="content">
            <h1 @click="show({ title: 'url-input', src: 'components/URLInput.vue' })">
                url-input
            </h1>
            <p>HTML</p>
            <vue-code>
                <pre lang="html">
&lt;url-input v-model="url" :list="$videoList"&gt;&lt;/url-input&gt; 
&lt;video  :src="url" controls muted loop autoplay&gt;&lt;/video&gt;
</pre>
            </vue-code>JavasSript部分
            <vue-code>
                <pre lang="javascript">
data() {
  return {
    url: "",
    list: [
            { label: "樱花小镇 1080P MP4", value: "/assets/medias/cherry_town.mp4" },
            { label: "森林 1080P MP4", value: "/assets/medias/forest.mp4" },
            { label: "Piper 720P", value: "/assets/medias/Piper_720P.mp4" },
            { label: "Piper 1080P", value: "/assets/medias/Piper_1080P.mp4" },
            { label: "汽车 绿幕 720P", value: "/assets/medias/green-screen-car.mp4" },
            { label: "锦里 音频 mp3", value: "/assets/medias/jinli.mp3" },
      ];
  }
}
</pre>
            </vue-code>
        </el-row>

        <el-dialog :title="dialog.title" :visible.sync="dialog.visible" @closed="dialog.src = null">
            <vue-source v-if="dialog.src" :src="dialog.src"></vue-source>
            <span v-else>暂无数据</span>
        </el-dialog>
    </el-main>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            dialog: {
                title: null,
                visible: false,
                src: null,
            },
        };
    },
    methods: {
        show(item) {
            this.dialog.title = item.title;
            this.dialog.src = item.src;
            this.dialog.visible = true;
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-main {
    .content {
        max-width: 960px;
        display: block;
        margin: 0 auto;
        padding-bottom: 20px;
    }

    .el-dialog {
        >>> .el-dialog__body {
            padding-top: 0px;
        }
    }
}
</style>
