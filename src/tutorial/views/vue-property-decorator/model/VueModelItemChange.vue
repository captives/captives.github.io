<template>
    <el-alert type="success" :closable="false">{{name}} <el-button type="info" size="mini" @click="updateHandler">更改值</el-button>
    </el-alert>
</template>
<script lang='ts'>
import { Component, Model, Vue } from 'vue-property-decorator'
@Component({ name: 'VueModelItemChange' })
export default class VueModelItemChange extends Vue {
    @Model('change', { type: String, default: "默认值" }) private name: string;

    private updateHandler() {
        this.$emit('change', "更改后 ----> " + Date.now());
    }
}
</script>