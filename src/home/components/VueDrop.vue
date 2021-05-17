<template>
    <el-col :span="10">
        <ol @dragover.prevent @drop="dropModuleOnEgret">
            <li>1</li>
        </ol>
    </el-col>
</template>
<script>
export default {
    data() {
        return {
            list: [1, 2, 3, 4, 5, 6, 7],
        };
    },
    methods: {
        dropModuleOnEgret() {
            console.log("VueDrop 拖放结束");
        },
    },
};
</script>
<style lang="stylus" scoped>
ul, ol {
    list-style: none;
    background: #EEE;
    min-height: 200px;

    li {
        width: 100px;
        margin: 5px;
        padding: 5px;
        text-align: center;
        background: blue;
        color: #FFF;
    }
}
</style>
