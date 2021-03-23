<template>
    <el-input v-model="text" placeholder="请输入内容" clearable v-bind="$attrs">
        <template slot="prepend">
            <el-select v-if="list.length" v-model="selectValue" placeholder="请选择视频" @change="changeHandler">
                <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span v-else>URL：</span>
        </template>
        <el-button slot="append" icon="el-icon-s-promotion" @click="requestURL"></el-button>
    </el-input>
</template>
<script>
export default {
    name: "URLInput",
    props: {
        value: {
            type: String,
            default: "",
        },
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            text: this.value,
            selectValue: null,
        };
    },
    mounted() {
        if (this.list.length) {
            this.text = this.list[0].value;
            this.selectValue = this.text;
            this.$emit("input", this.text);
        }
    },
    methods: {
        changeHandler(event) {
            this.text = this.selectValue;
        },
        requestURL() {
            this.$emit("input", this.text);
            this.$emit("change", this.selectValue);
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
        width: 200px;
    }
}
</style>
