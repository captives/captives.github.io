<template>
    <!-- 源代码查看功能 
                    - TODO 功能未实现
    思路1: 通过自定义指令，在需要的组件上添加 v-code 能自动添加该功能，通过v-code="filePath" 来自动加载该组件的url源代码
    思路2: 全局组件，需要展示源代码的组件上，添加该组件为父组件或者子组件，进行增加源代码查看功能
    难点: 思路1、思路2 得到的都是VueComponent实例，暂无法拿到src的相对路径

    目前已知： import Code from "./Code.vue"; Code 可以得到如下属性:
    {
        "name": "Code",
        "props": {
            "language": {
                "default": "javascrit"
            }
        },
        "methods": {},
        "staticRenderFns": [],
        "_compiled": true,
        "_scopeId": "data-v-bb4ac8c6",
        "beforeCreate": [null],
        "beforeDestroy": [null],
        "__file": "src/components/Code.vue",
        "_Ctor": {}
    }
    -->
    <div class="code-button" :class="{mask: show }" @mouseenter="mouseEnterHandler" @mouseleave="mouseLeaveHandler">
        <slot></slot>
        <el-button v-if="show" type="text" @click="openHandler">&lt;code/&gt;</el-button>

        <el-dialog title="" :visible.sync="visible" width="50%" :append-to-body="true">
            <h3>显示slot内容</h3>
            <vue-code>
                <pre lang="html">{{ html }}</pre>
            </vue-code>
        </el-dialog>
    </div>
</template>
<script>
import Code from "./Code.vue";
export default {
    name: "VueCode",
    data() {
        return {
            show: false,
            visible: false,
            html: "",
        };
    },
    methods: {
        mouseEnterHandler() {
            this.show = true;
        },
        mouseLeaveHandler() {
            this.show = false;
        },
        openHandler() {
            console.log("Code", JSON.stringify(Code));
            console.log("this", this);
            this.visible = true;
            this.$slots.default.forEach((item) => {
                if (item.componentInstance) {
                    console.warn("----> file ", item["__file"]);
                }
            });
            this.html = this.$slots.default[0].componentInstance.$el;
            console.log(this.html);
            console.log("打开", this.$slots.default);
        },
    },
    mounted() {
        //HTMLElement
        let div = this.$parent.$el;
        div.style.position = "relative";
    },
};
</script>
<style scoped>
.code-button {
    position: relative;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.code-button.mask {
    background: rgba(0, 0, 0, 0.35);
}

.code-button .el-button {
    position: absolute;
    right: 10px;
    top: 5px;
}
</style>