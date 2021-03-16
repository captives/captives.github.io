<template>
    <div>
        <el-alert v-for="(item, index) in list" :key="index" type="info">{{item}}</el-alert>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({ name: 'VueWatchItemMap' })
export default class VueWatchItemMap extends Vue {
    @Prop({ type: Object, default: () => { } }) private data: any;

    @Watch('data')
    dataChangeHandler(value: any) {

    }
}
</script>
<style lang='scss' scoped>
</style>