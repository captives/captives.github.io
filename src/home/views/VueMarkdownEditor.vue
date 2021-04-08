<template>
    <el-main>
        <mavon-editor class="fill" v-model="value" :toolbars="toolbars" fontSize="16px" placeholder="请输入文本" @change="changeHandler">
            <!-- <i slot="left-toolbar-before">1</i> -->
            <!-- <i slot="left-toolbar-after">2</i> -->
            <!-- <i slot="right-toolbar-before">3</i> -->
            <!-- <i slot="right-toolbar-after">4</i> -->
            <button slot="left-toolbar-after" type="button" class="op-icon fa fa-mavon-floppy-o" @click="dialog.visible=true"></button>

            <template slot="left-toolbar-after">
                <el-popover placement="top-start" title="文章列表" width="200" trigger="hover" popper-class="popper-list">
                    <ul class="list">
                        <li v-for="(item,index) in list" :key="index" @click="editHandler(item)">{{item.title}}</li>
                    </ul>
                    <button slot="reference" type="button" class="op-icon fa fa-mavon-bars" @click="getList"></button>
                </el-popover>
            </template>
        </mavon-editor>

        <el-dialog title="保存" :visible.sync="dialog.visible" width="520px" center>
            <el-form ref="dialog-form" :model="dialog" label-width="60px">
                <el-form-item label="标题" prop="title" :rules="[{required: true, message: '请输入文章标题', trigger: ['blur','change']}]">
                    <el-input v-model="dialog.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="dialog.desc" type="textarea" :rows="3" maxlength="50" placeholder="请输入描述信息"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialog.visible = false">取 消</el-button>
                <el-button type="primary" @click="saveHandler">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>
<script>
import axios from "axios";
const request = (path, data) => {
    return new Promise((resolve, reject) => {
        axios
            .post(location.origin.replace(location.port, 2020) + path, data)
            .then(({ data }) => resolve(data))
            .catch(reject);
    });
};

export default {
    name: "VueMarkdownEditor",
    data() {
        return {
            value: "# 这是默认值",
            list: [],
            dialog: {
                visible: false,
                id: null,
                text: "", //markdown 文本
                html: "", //HTML文本
                title: "", //标题
                desc: "", //描述
                anchor: [], //标签锚点
            },
            toolbars: {
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
            },
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        changeHandler(value, html) {
            this.dialog.text = value;
            this.dialog.html = value;
            console.log(value, html);
        },
        getList() {
            request("/edit/list").then(({ data }) => {
                console.log(data);
                this.list = data;
            });
        },
        editHandler(item) {
            //编辑指定信息
            request("/edit/read", { id: item.id }).then((data) => {
                console.log("read", item.id, data);
                if (data.success) {
                    this.value = data.data.text;
                    this.dialog.title = data.data.title;
                    this.dialog.id = data.data.id;
                    this.dialog.desc = data.data.desc;
                }
            });
        },
        saveHandler() {
            this.$refs["dialog-form"].validate((valid) => {
                if (valid) {
                    request("/edit/save", {
                        id: this.dialog.id,
                        title: this.dialog.title,
                        text: this.dialog.text,
                        html: this.dialog.html,
                        desc: this.dialog.desc,
                    }).then((data) => {
                        console.log("保存", data);
                    });
                    this.dialog.visible = false;
                    this.$message("内容已经发送服务器");
                }
            });
        },
    },
};
</script>
<style lang='stylus' scoped>
.el-main, .fill {
    height: 100%;

    >>> .add-image-link {
        padding: 30px 0 !important;
    }
}

.popper-list {
    ul.list {
        li {
            padding: 3px 5px 3px 0;
            cursor: pointer;
        }
    }
}
</style>