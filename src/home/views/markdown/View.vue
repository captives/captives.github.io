<template>
    <div class="content">
        <h1 v-if="error">{{error}}</h1>
        <template v-else>
            <h1 class="title">{{title}}</h1>
            <div class="body" v-html="html"></div>
            <div class="footer">{{desc}}</div>
        </template>
    </div>
</template>
<script>
import { request } from "./HTTPRequest.js";
import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";

const markdown = MarkdownIt({
    html: true, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />).
    breaks: true, // Convert '\n' in paragraphs into <br>
    langPrefix: "lang-", // CSS language prefix for fenced blocks. Can be
    linkify: false, // 自动识别url
    typographer: true,
    quotes: "“”‘’",
});

var defaultRender =
    markdown.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    var hIndex = tokens[idx].attrIndex("href");
    if (tokens[idx].attrs[hIndex][1].startsWith("#")) return defaultRender(tokens, idx, options, env, self);
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex("target");

    if (aIndex < 0) {
        tokens[idx].attrPush(["target", "_blank"]); // add new attribute
    } else {
        tokens[idx].attrs[aIndex][1] = "_blank"; // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
};

["tip", "info", "warning", "error"].forEach((type) => {
    const reg = eval("/^" + type + "\\s+(.*)|" + type + "$/");
    markdown.use(MarkdownItContainer, type, {
        validate: function (params) {
            return params.trim().match(reg);
        },
        render: function (tokens, idx) {
            var m = tokens[idx].info.trim().match(reg);
            if (tokens[idx].nesting === 1) {
                if (markdown.utils.escapeHtml(m[1])) {
                    return `<div class='tip-block ${type}'><span class='title'> ${markdown.utils.escapeHtml(m[1])} </span>`;
                } else {
                    return `<div class='${type}-block'>`;
                }
            } else {
                return "</div>";
            }
        },
    });
});

markdown.use(MarkdownItContainer, "more", {
    validate: function (params) {
        return params.trim().match(/^more\s+(.*)$/);
    },
    render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^more\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
            // opening tag
            return "<div class='more-block'><details><summary>" + markdown.utils.escapeHtml(m[1]) + "</summary>\n";
        } else {
            // closing tag
            return "</details></div>";
        }
    },
});

markdown.use(require("markdown-it-footnote"));

import Prism from "prismjs";

const cache = [];
export default {
    name: "view",
    data() {
        return {
            id: null,
            title: null,
            html: "",
            value: "#新建文档",
            desc: "",
            error: "",
        };
    },
    methods: {
        editHandler(id) {
            //编辑指定信息
            request("/edit/read", { id: id }).then(({ data, success }) => {
                if (success) {
                    this.id = data.id;
                    this.title = data.title;
                    this.value = data.text || "";
                    this.html = markdown.render(data.text);
                    this.desc = data.desc;

                    this.$nextTick(() => {
                        Prism.highlightAll();
                    });
                } else {
                    this.error = "查无结果";
                }
            });
        },
    },
    beforeCreate() {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/assets/css/page.css";
        document.querySelector("head").appendChild(link);
        cache.push(link);
    },
    destroyed() {
        cache.forEach((item) => {
            if (document.querySelector("head") && item) {
                document.querySelector("head").removeChild(item);
            }
        });
    },
    created() {
        const params = this.$route.params;
        if (params && params.id) {
            this.editHandler(params.id);
        } else {
            this.error = "404";
        }
    },
};
</script>
<style lang="stylus" scoped>
.content {
    position: relative;
    padding: 35px 0;
    margin: 0 20%;

    >>> pre {
        margin: 20px 0;
        border-radius: 2px;
        background: #405261;
        overflow: auto;

        code {
            padding: 10px;
            border-radius: 0.3em;
        }
    }
}
</style>