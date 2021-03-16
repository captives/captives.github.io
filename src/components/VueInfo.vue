<template>
    <ul>
        <li>当前组件信息</li>
        <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
</template>
<script>
export default {
    name: "VueInfo",
    props: {
        value: { type: String },
    },
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.list.push("组件名称" + this.$options.name);
    },
};
</script>
