<template>
    <el-main>
        <div ref="container" class="fill">

        </div>
    </el-main>
</template>

<script>
import { EditorView, ViewUpdate, keymap } from "@codemirror/view";
import { EditorState, basicSetup } from "@codemirror/basic-setup";
import { defaultTabBinding } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { Panel, showPanel } from "@codemirror/panel";

export default {
    name: "CodeMirror",
    data() {
        return {
            text: `import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import '@/assets/themes-cayman/page-markdown.scss';
import Source from "./../components/Source";
Vue.component("vue-source", Source);


Vue.config.productionTip = false;

window.vue = new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");\n\n\n\n\n`,
        };
    },
    methods: {
        //输入时更新
        wordCountPanel(view) {
            let dom = document.createElement("div");
            dom.textContent = 20; //countWords(view.state.doc);
            const change = (state) => {
                dom.textContent = state.selection.ranges
                    .filter((range) => range.empty)
                    .map((range) => {
                        let line = state.doc.lineAt(range.head);
                        return "Line " + line.number + ":" + (range.head - line.from);
                    });
            };

            return { dom, create: change, update: (view) => change(view.state) };
        },
    },
    mounted() {
        //配置放在状态对象里

        const baseTheme = EditorView.baseTheme({
            ".cm-editor": {
                height: "100%",
                background: "blue",
                overflow: "auto",
            },
        });

        const startState = EditorState.create({
            doc: this.text,
            extensions: [basicSetup, baseTheme, keymap.of([defaultTabBinding]), showPanel.of(this.wordCountPanel), javascript()],
        });

        const view = new EditorView({
            state: startState,
            parent: this.$refs.container,
            // dispatch: (transaction) => {
            //     console.log("dispatch");
            // },

            update: (transaction) => {
                console.log("update");
            },
        });
        const viewUpdate = new ViewUpdate(view, startState);
        viewUpdate.changes = (a, b, c) => {
            console.log("-----", a, b, c);
        };
        //向编辑器插入头部表示
        view.dispatch({
            changes: { from: 0, insert: "#!/usr/bin/env node\n\n" },
        });

        setInterval(() => {
            console.log("JSON", startState.toJSON());
            console.log("Text", startState.toText("\n"));
        }, 60000);
    },
};
</script>
<style lang="stylus" scoped>
.fill {
    height: 100%;

    >>> .cm-editor {
        height: 100%;
        overflow: auto;
        outline: none;
    }
}
</style>
