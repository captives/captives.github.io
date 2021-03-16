<template>
    <div>
        <el-alert type="success" :closable="false">{{propA}} - 数据类型 - {{typeof(propA)}}</el-alert>
        <el-alert :title="propB" type="warning" :closable="false"> </el-alert>
        <el-alert type="success" :closable="false">{{propC}} - 数据类型 - {{typeof(propC)}} </el-alert>
        <slot></slot>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({ name: 'VuePropItem' })
export default class VuePropItem extends Vue {
    @Prop(Number) readonly propA: number | undefined
    @Prop({ default: 'default value' }) readonly propB!: string
    @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
</script>