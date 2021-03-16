<template>
    <div>
        <h2>Model</h2>

        <vue-code>
            <pre lang="js">@Model(event?: string, options: ( Constructor | Constructor[] | PropOptions ) = {}) decorator </pre>
        </vue-code>
        <h3>示例：</h3>
        <vue-code>
            <pre lang="js">
import { Vue, Component, Model } from 'vue-property-decorator'

@Component({ name: "VueItem" })
export default class VueItem extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean
}
            </pre>
        </vue-code>
        <p>等同于</p>
        <vue-code>
            <pre lang="js">
export default {
  name: "VueItem",
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
}  </pre>
        </vue-code>

        <h3>注意：</h3>
        <p>A：<em>v-model</em>是 <em>v-bind:value</em>和<em>v-on:input</em>的语法糖 </p>
        <p>B：声明组件内不支持默认值</p>

        <h3> 例子1：v-on:input 事件</h3>
        <VueModelItem v-model="title"></VueModelItem>
        <VueModelItem v-model="name"></VueModelItem>
        <VueModelItem></VueModelItem>

        <h3> 例子2： 其它类型事件</h3>
        <VueModelItemChange :name="name" @change="changeHandler"></VueModelItemChange>
        <h3>例子源码：</h3>
        <p>item.vue</p>
        <vue-code>
            <pre lang="js">
@Model('change', { type: String, default: "默认值" }) private name: string;

private updateHandler() {
    //更改值
    this.$emit('change', Date.now());
}</pre>
        </vue-code>
        <p>index.vue</p>
        <vue-code>
            <pre lang="html">&lt;Item :name="name" @change="val =&gt; name = val"&gt;&lt;/item&gt;</pre>
            <pre lang="js">private name: string | null = null; </pre>
        </vue-code>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import VueModelItem from './VueModelItem.vue';
import VueModelItemChange from './VueModelItemChange.vue';
@Component({ name: 'VueModel', components: { VueModelItem, VueModelItemChange } })
export default class VueModel extends Vue {
    private title: string = "标题";
    private name: string | null = null;

    private changeHandler(val: string) {
        console.log('---<', val);
        this.name = val;
    }
}
</script>
<style lang='stylus' scoped></style>