<template>
    <el-container>
        <el-aside class="sidebar" width="300px">
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="selectHandler(item)">{{item.name}}</li>
            </ul>
        </el-aside>
        <component :is="item.component"></component>
    </el-container>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({ name: 'Articles' })
export default class Articles extends Vue {
    private item: any = {};
    private list: Array<any> = [
        { name: "Nodejs 安装", component: () => import("./NodejsInstall.vue") },
        { name: "矩阵", component: () => import("./../matrix/index.vue") },
        { name: "Table定位", component: () => import("./../files/VueTable.vue") },
        { name: "HTML5", component: () => import("./HTML5.vue") },
        { name: "JS中var与function两种函数声明方式的区别", component: () => import("./JavaScriptScoped.vue") },
        { name: "RegExp", component: () => import("./RegExpFile.vue") },
        { name: "rgb-hls-hex进制颜色转换", component: () => import("./ColorConvert.vue") },
        { name: "VScode Setting", component: () => import("./VSCodeSettings.vue") },
        { name: "JavaScript 创建GUID/UUID", component: () => import("./JavaScriptGenerateUUID.vue") },
        { name: "WebRTC录制", component: () => import("./WebRTCRecorder.vue") },
        { name: "VCard 电子名片", component: () => import("./VCard.vue") },
        { name: "SQLite3", component: () => import("./SQLite3.vue") },
    ];

    private selectHandler(value: any) {
        this.item = value;
    }
}
</script>
<style lang='stylus' scoped>
.sidebar {
    ul {
        list-style: none;

        li {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 10px 5px;
            white-space: nowrap;
            border-bottom: 1px solid #EEE;
            cursor: pointer;

            &:hover {
                background: #EEE;
            }
        }
    }
}
</style>