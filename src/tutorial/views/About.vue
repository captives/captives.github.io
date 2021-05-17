<template>
    <el-main>

    </el-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "About", })
export default class About extends Vue {
}
</script>
<style lang="stylus" scoped>
.el-main {
    flex: 1;
    width: 70%;
    margin: 0 auto;
}
</style>
