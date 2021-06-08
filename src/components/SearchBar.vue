<template>
    <el-input v-model="keyword" v-bind="$attrs" @keyup.enter.native="requestURL">
        <el-select slot="prepend" v-if="list.length" v-model="selectValue" placeholder="请选择">
            <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="requestURL"></el-button>
    </el-input>
</template>
<script>
export default {
    name: "SearchBar",
    props: {
        value: {
            type: String,
            default: "",
        },
        list: {
            type: Array,
            default: () => [
                { label: "Pixabay", value: "https://pixabay.com/images/search/" },
                { label: "百度", value: "https://www.baidu.com/s?wd=" },
                { label: "必应", value: "https://cn.bing.com/search?q=" },
                { label: "Google", value: "https://www.google.com/search?q=" },
                { label: "360", value: "https://www.so.com/s?q=" },
                { label: "搜狗", value: "https://www.sogou.com/web?query=" },
                { label: "B站", value: "https://search.bilibili.com/all?keyword=" },
                { label: "Gitee", value: "https://search.gitee.com/?q=" },
                { label: "GitHub", value: "https://github.com/search?q=" },
                { label: "微信搜索", value: "https://weixin.sogou.com/weixin?query=" },
                { label: "丁香搜索", value: "https://search.dxy.cn/?words=" },
                { label: "微博搜索", value: "https://s.weibo.com/weibo?q=" },
                { label: "京东搜索", value: "https://search.jd.com/Search?keyword=" },
            ],
        },
    },
    data() {
        return {
            keyword: "",
            selectValue: null,
        };
    },
    mounted() {
        if (this.list.length) {
            this.selectValue = this.list[0].value;
        }
        this.keyword = this.value;
    },
    methods: {
        requestURL() {
            if (this.keyword) {
                this.$emit("input", this.keyword);
                this.$emit("change", this.selectValue + this.keyword);
            } else {
                this.$message({ type: "warning", message: "请输入内容" });
            }
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-input {
    >>> .el-input-group__append {
        color: #FFF;
        font-size: 18px;
        background-color: #409eff;
        border-color: #409eff;

        &:hover {
            background: #66b1ff;
            border-color: #66b1ff;
        }
    }

    .el-select {
        width: 100px;
    }
}
</style>