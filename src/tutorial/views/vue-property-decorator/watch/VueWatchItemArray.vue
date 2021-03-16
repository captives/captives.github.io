<template>
    <div>
        <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <el-alert v-for="item in list" :key="item.title" type="info" :closable="false"> {{ item }} </el-alert>
        </transition-group>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({ name: 'VueWatchItemArray' })
export default class VueWatchItemArray extends Vue {
    @Prop({ type: Array, default: () => [] }) private value: Array<any>;

    private list: Array<any> = [];

    @Watch('value')
    listChangeHandler(value: Array<any>) {
        value.forEach(item => {
            const date: Date = item.date;
            item.value = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        });
        this.list = value;
    }
}
</script>