<template>
    <el-main class="center">
        <h2>HTML5 基本知识</h2>

        <h3>HTML5 window事件</h3>
        <p>
            浏览器选项卡获取焦点和失去焦点
            <el-checkbox v-model="visibilityStated">监听</el-checkbox>
        </p>
        <vue-code>
            <pre lang="js">
document.addEventListener("visibilitychange", () => {
        if (document.visibilityState == "hidden") {
            document.title = "选项卡被隐藏";
        }else{
            document.title = "选项卡被激活";
        }
    });</pre>
        </vue-code>

        <p>
            浏览器选项卡关闭
            <el-checkbox v-model="selectValue">监听</el-checkbox>
        </p>
        <vue-code>
            <pre lang="js">
window.addEventListener("beforeunload", (e) => {
        if (this.selectValue) {
            var confirmationMessage = "要记得保存！你确定要离开我吗？";
            (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
            return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
        }
    });</pre>
        </vue-code>

        <p>
            页面开始打印/打印结束后事件
            <el-checkbox v-model="printValue" @change="printChangeHandler">监听</el-checkbox>
        </p>
        <vue-code>
            <pre lang="js">
window.addEventListener("beforeprint", function (event) {
    console.log('准备打印', event);
});

window.addEventListener("afterprint", function (event) {
    console.log('打印完成/取消', event);
});</pre>
        </vue-code>

    </el-main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "HTML5",
})
export default class HTML5 extends Vue {
    private visibilityStated = false;
    private selectValue = false;
    private printValue = false;

    private visibilitychange() {
        document.addEventListener("visibilitychange", () => {
            if (this.visibilityStated) {
                if (document.visibilityState == "hidden") {
                    document.title = "选项卡被隐藏";
                } else {
                    document.title = "选项卡被激活";
                }
            }
        });
    }

    private beforeunload() {
        window.addEventListener("beforeunload", (e) => {
            if (this.selectValue) {
                var confirmationMessage = "要记得保存！你确定要离开我吗？";
                (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
                return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
            }
        });
    }

    private printHandler() {
        window.addEventListener("beforeprint", (event) => {
            if (this.printValue) {
                document.title = "打印开始，准备点什么";
            }
            console.log('beforeprint', event);
        });

        window.addEventListener("afterprint", (event) => {
            if (this.printValue) {
                document.title = "打印完成，做点什么";
            }
            console.log('打印完成', event);
        });
    }

    private printChangeHandler() {
        if (!this.printValue) {
            document.title = this.$options.name + "_" + this.$route.name;
        }
    }

    private mounted() {
        this.visibilitychange();
        this.beforeunload();
        this.printHandler();

        window.addEventListener("storage", function (event) {
            console.log("其它页面更新存储", event.key + ' 键已经从 ' + event.oldValue + ' 改变为 ' + event.newValue + '.');
        });


    }
}
</script>
