<template>
    <div>
        <el-alert type="success" :closable="false">组件内部：{{value}}</el-alert>
        <el-button type="primary" @click="changeHandler">内部更新值</el-button>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({ name: 'VuePropItem' })
export default class VuePropItem extends Vue {
    @Prop({ type: String, default: "-" }) readonly value!: string;

    private changeHandler() {
        this.$emit("input", Date.now().toLocaleString());
    }
}
</script>