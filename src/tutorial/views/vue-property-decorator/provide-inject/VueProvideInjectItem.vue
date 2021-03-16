<template>
    <div>
        <p>顶级组件传入的4种提示颜色</p>
        <div>数据源：{{ types }}</div>
        <div>样式：
            <el-tag v-for="item in types" :key="item" :type="item">{{item}}</el-tag>
        </div>

        <p>顶级组件传入的函数对象，执行后返回随机提示</p>
        <el-button :type="tagType" @click="changeHandler" size="mini">{{tagType}}</el-button>
        等价于
        <el-button :type="randomType" @click="randomHandler" size="mini">{{randomType}}</el-button>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Inject } from 'vue-property-decorator'
@Component({ name: 'VueProvideInjectItem' })
export default class VueProvideInjectItem extends Vue {
    // 注入一个函数, 顶级组件提供
    @Inject() private type!: Function;
    //等价于
    @Inject('type') private random!: Function;

    //注入一个基本数据类型，顶级组件提供
    @Inject() private types!: Array<string>;

    private tagType: string = '点击切换';
    private randomType: string = "点击切换";

    private changeHandler() {
        this.tagType = this.type();
    }

    private randomHandler() {
        this.randomType = this.random();
    }
}
</script>
<style lang='scss' scoped>
</style>