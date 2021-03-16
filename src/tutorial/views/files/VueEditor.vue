<template>
    <el-main class="center">
        <el-row style="margin: 20px 0">
            <el-col :span="2" style="text-align: center">内容标题</el-col>
            <el-col :span="22">
                <el-input v-model="title" placeholder="请输入内容标题"></el-input>
            </el-col>
        </el-row>
        <!-- Account: 593278382@qq.com -->
        <editor v-model="content" apiKey="9j0jjt7739g05sqrj9uki6phym2b0gxsjqaamqdox4gj52hw" :init="options"></editor>

        <el-divider content-position="left">输出</el-divider>
        <div v-html="content"></div>
        <el-divider content-position="left">内容</el-divider>
        <div>{{ content }}</div>
    </el-main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Editor from "@tinymce/tinymce-vue";
import EditorTemplate from "./../../template/EditorTemplate";
@Component({
    name: "VueEditor",
    components: { Editor },
})
export default class VueEditor extends Vue {
    private title = "";
    private content = "";
    private options: any = {
        height: 600,
        language: "zh_CN",
        branding: false, //去除右下角水印
        elementpath: false, //禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        browser_spellcheck: true, // 启用拼写检查
        plugins: [
            "advcode advlist anchor autolink paste imagetools",
            "codesample template fullscreen preview",
            "lists link image media searchreplace print help",
        ],
        templates: EditorTemplate, //只能添加HTML片段
        content_css: "//www.tiny.cloud/css/codepen.min.css",
        // 自定义菜单分组
        menubar: false,
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
        toolbar: `
    template | undo redo | 
    bold italic underline strikethrough | 
    fontsizeselect forecolor backcolor | 
    alignleft aligncenter alignright | 
    image media link | 
    codeformat codesample code preview publishButton | searchreplace help`,
        setup: (editor: any) => {
            //自定义工具
            editor.ui.registry.addButton("publishButton", {
                tooltip: "发布",
                icon: "save",
                onAction: () => {
                    alert("发布内容");
                    if ("Prism" in window) {
                        //@ts-ignore
                        window["Prism"].highlightAll();
                    }
                    // editor.insertContent("<strong>It's 内容已经发布!</strong>");
                },
            });
        },
        codesample_languages: [
            { text: "HTML/XML", value: "markup" },
            { text: "CSS", value: "css" },
            { text: "Less", value: "less" },
            { text: "Stylus", value: "stylus" },
            { text: "JavaScript", value: "javascript" },
            { text: "TypeScript", value: "typescript" },
            { text: "SQL", value: "sql" },
            { text: "GraphQL", value: "graphql" },
            { text: "PowerShell", value: "powershell" },
            { text: "Markdown", value: "markdown" },
        ],
        help_tabs: ["shortcuts", "keyboardnav", "plugins"],
    };
}
</script>