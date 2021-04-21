<template>
    <el-container style="height:100vh">
        <el-header>
            <label>标&nbsp;&nbsp;题：</label>
            <el-input v-model="title" placeholder="请输入文章标题"></el-input>

            <el-button type="primary" @click="newHandler">新&nbsp;&nbsp;建</el-button>

            <el-dropdown split-button type="danger" @click="saveHandler" @command="exportHandler">
                保&nbsp;&nbsp;存
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="md">导出 *.md</el-dropdown-item>
                    <el-dropdown-item command="html">导出 *.html</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>

        <el-main>
            <mavon-editor ref="mavon-editor" class="fill" v-model="value" :toolbars="toolbars" fontSize="16px" placeholder="请输入文本" @change="changeHandler" @save="saveHandler">
                <!-- <i slot="left-toolbar-before">1</i> -->
                <!-- <i slot="left-toolbar-after">2</i> -->
                <!-- <i slot="right-toolbar-before">3</i> -->
                <!-- <i slot="right-toolbar-after">4</i> -->
            </mavon-editor>
        </el-main>
    </el-container>
</template>
<script lang="ts">
import request from "./../../api/Request";
import { Component, Vue } from "vue-property-decorator";
import VueCode from "@/components/VueCode.vue";
const URL: any = window.URL || window.webkitURL;

@Component({
    components: { VueCode }, name: "MarkDownEditor"
})
export default class MarkDownEditor extends Vue {
    private id: number | null = null;
    private title: string | null = null;
    private value: string | null = "#新建文档";
    private html: string | null = null;
    private desc: string | null = "";
    private error: string | null = "";
    private toolbars: any = {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
    };

    private changeHandler(value: string, html: string) {
        this.value = value;
        this.html = html;
    }

    private resetDocument() {
        this.id = null;
        this.title = null;
        this.value = null;
        this.desc = null;
        this.error = null;
        //@ts-ignore
        this.$refs['mavon-editor'].subfieldtoggle();
    }

    private newHandler() {
        if (this.title || this.value) {
            this.$confirm("确认放弃当前内容，新建文档吗？", "新建文档").then(res => {
                this.resetDocument();
                this.$router.push({ path: "/markdown/edit/new" });
            });
        } else {
            this.resetDocument();
            this.$router.push({ path: "/markdown/edit/new" });
        }
    }

    private editHandler(id: number) {
        //编辑指定信息
        request("/edit/read", { id: id }).then(({ data, success }: any) => {
            if (success) {
                this.id = data.id;
                this.title = data.title;
                this.value = data.text || "";
                this.desc = data.desc;
                document.title = this.title || '新建文档';
            } else {
                this.resetDocument();
                return this.$message({ type: "warn", message: "未查询到内容" });
            }
        });
    }

    private saveHandler() {
        if (!this.value) {
            return this.$message({ type: "error", message: "暂无内容需要保存" });
        }

        if (this.title) {
            request("/edit/save", {
                id: this.id,
                title: this.title,
                text: this.value,
                html: this.html,
                desc: this.desc,
            }).then((data: any) => {
                console.log("保存", data);
                //  this.$router.push({ path: "/markdown/edit/"+ data.id });
                this.$message({ type: "success", message: "内容已经保存成功" });
            });
        } else {
            this.$message({ type: "error", message: "请输入标题内容" });
        }
    }

    private exportHandler(type: string) {
        let blob = null;
        if (this.value && this.html) {
            if (type == 'md') {
                blob = new Blob([this.value], { type: 'text/plain' });
            } else {
                blob = new Blob([this.html], { type: 'html/plain' });
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = [this.title, type].join('.');
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                this.$message({ type: 'success', message: "文档下载完成" });
            }, 100);
        } else {
            this.$message({ type: 'error', message: "暂无内容需要导出" });
        }
    }

    private created() {
        const params: any = this.$route.params;
        if (params && params.id) {
            if (params.id === "new") {
                this.id = null;
            } else {
                this.editHandler(params.id);
            }
        } else {
            this.resetDocument();
        }
    }
}
</script>
<style lang="stylus" scoped>
.el-header {
    display: flex;
    align-items: center;

    label {
        white-space: nowrap;
        word-break: keep-all;
        margin-right: 10px;
    }

    >>> .el-button-group {
        display: flex;
    }

    .el-button {
        margin: 0 10px;
    }
}

.el-main {
    >>> .tip-block {
        border-color: #42b983;
        background-color: #f8f8f8;
        padding: 7px 20px;
        margin: 10px 0;
        border-left-width: 4px;
        border-left-style: solid;
        border-bottom-right-radius: 2px;
        border-top-right-radius: 2px;
        position: relative;

        &::before {
            position: absolute;
            content: url('/assets/css/bulb.svg');
            width: 20px;
            height: 20px;
            left: -14px;
            top: 15px;
        }

        &.info {
            border-color: #007bff;

            &::before {
                content: url('/assets/css/info.svg');
            }
        }

        &.warning {
            border-color: #f4cd00;

            &::before {
                content: url('/assets/css/warning.svg');
            }
        }

        &.error {
            border-color: #F56C6C;

            &::before {
                content: url('/assets/css/danger.svg');
            }
        }

        span.title {
            font-weight: 600;
            margin-top: 10px;
            display: block;
            color: #222;
        }

        p {
            margin: 10px 0;
        }
    }

    >>> .more-block details {
        cursor: pointer;

        summary {
            outline: none;
        }
    }

    >>> mark {
        color: #409EFF;
        background: rgba(160, 207, 255, 0.35);
        padding: 1px 10px;
        font-size: 0.75em;
        border-radius: 5px;
        margin: 0 5px;
    }

    >>> code {
        background: rgb(254 240 240);
        padding: 1px 5px;
        font-size: 0.75em;
        border-radius: 5px;
        margin: 0 5px;
    }

    >>> pre code {
        background: initial;
        padding: initial;
        border-radius: initial;
        margin: initial;
    }
}
</style>