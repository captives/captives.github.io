<template>
    <el-alert type="success" :closable="false">{{value}} <el-button type="info" size="mini" @click="updateHandler">更改值</el-button>
    </el-alert>
</template>
<script lang='ts'>
import { Component, Model, Vue } from 'vue-property-decorator'
@Component({ name: 'VueModelItem' })
export default class VueModelItem extends Vue {
    @Model('input', { type: String, default: "默认值" }) private value: string;
    private updateHandler() {
        this.$emit('input', "更改后 ----> " + Date.now());
    }
}
</script>