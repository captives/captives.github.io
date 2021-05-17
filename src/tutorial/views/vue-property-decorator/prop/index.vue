<template>
    <div>
        <h2>Prop</h2>
        <vue-code>
            <pre lang="js">@Prop(options: ( Constructor | Constructor[] | PropOptions ) = {}) decorator </pre>
        </vue-code>
        <h3>示例：</h3>
        <vue-code>
            <pre lang="js">
import { Vue, Component, Prop } from 'vue-property-decorator'
 
@Component({ name: 'VueItem' })
export default class VueItem extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
}</pre>
        </vue-code>
        <p>等同于</p>
        <vue-code>
            <pre lang="js">
export default {
  name: "VueItem",
  props: {
    propA: {
      type: Number,
    },
    propB: {
      default: 'default value',
    },
    propC: {
      type: [String, Boolean],
    },
  },
} </pre>
        </vue-code>

        <h3>例子1 ：</h3>
        <VuePropItem :propA="propA" :propC="propC">
            <el-button type="primary" @click="changeHandler">更改值</el-button>
            <p>组件外面值更改，组件内部值跟着更新； 单向更新</p>
        </VuePropItem>

        <h3>例子2: <em>v-model</em></h3>
        <VuePropModelItem v-model="title"></VuePropModelItem>
        <div>
            <span>组件外：{{title}}</span>
            <el-button type="success" @click="title = '默认值' ">恢复值</el-button>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import VuePropItem from './VuePropItem.vue';
import VuePropModelItem from './VuePropModelItem.vue';

@Component({ name: 'VueProp', components: { VuePropItem, VuePropModelItem } })
export default class VueProp extends Vue {
    private propA: number = Date.now();
    private propC: string | boolean = "文本A";

    //测试v-model
    private title: string | null = null;

    private changeHandler() {
        this.propA = Date.now();
        this.propC = ["这是文本", true][Math.round(Math.random() * 10) % 2];
    }
}
</script>
<style lang='stylus' scoped></style>