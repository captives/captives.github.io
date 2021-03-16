<template>
    <el-alert type="success" :closable="false">{{value}} ----> {{currentTime}}</el-alert>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({ name: 'VueWatchItem' })
export default class VueWatchItem extends Vue {
    @Prop() private readonly value: string;

    private currentTime: string = '----';

    @Watch('value')
    valueChange(value: string) {
        const date = new Date(value);
        this.currentTime = date.toLocaleDateString() + "  " + date.toLocaleTimeString();
    }
}
</script>