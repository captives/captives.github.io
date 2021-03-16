<template>
    <div>
        <VueWatchItem :value="title"></VueWatchItem>

        <h2>数组长度动态监听</h2>
        <p>以下两个例子，通过修改数组长度，进行的动画展示</p>
        <p>外部数据</p>
        <transition-group enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
            <el-alert v-for="item in list" :key="item.title" :type="item.value ? 'warning' : 'error'" :closable="false"> {{ item }} </el-alert>
        </transition-group>
        <p>内部数据</p>
        <VueWatchItemArray :value="list"></VueWatchItemArray>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';

import VueWatchItem from './VueWatchItem.vue';
import VueWatchItemArray from './VueWatchItemArray.vue';

@Component({ name: 'VueWatch', components: { VueWatchItem, VueWatchItemArray } })
export default class VueWatch extends Vue {
    private title: string = "这是标题";

    private list: Array<any> = [];

    mounted() {
        setInterval(() => {
            const date: Date = new Date();
            this.title = date.toString();
            this.list.push({ title: this.title, date: date });
            if (this.list.length > 5) {
                setTimeout(() => {
                    this.list.shift();
                }, 2000);
            }
        }, 5000);
    }
}
</script>