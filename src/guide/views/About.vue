<template>
    <el-container>
        <el-aside width="20%">

        </el-aside>
        <el-main>
            <!-- 源码组件的演示 -->
            <source-code v-model="list" :drawed="false">源码</source-code>
            <el-row v-for="item in list" :key="item.value">
                <vue-code v-if="item.code">
                    <p>{{ item.value }}</p>
                    <pre :lang="item.lang">{{ item.code }}</pre>
                </vue-code>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
import router from "@/router";
export default {
    name: "About",
    data() {
        return {
            list: [
                { value: "components/SourceCode.vue", lang: "html" },
                { value: "plugins/global.js", lang: "javascript" },
                { value: "assets/css/code-style.css", lang: "css" },
            ],
        };
    },
};
</script>
<style lang="stylus" scoped>
.el-aside {
    border-right: 1px solid rgb(84, 92, 100);
}

ul {
    list-style: none;

    li {
        margin: 10px 0;
        padding: 5px;
    }
}

.el-row.nav {
    padding-left: 50px;
}
</style>
