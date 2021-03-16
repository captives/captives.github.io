<template>
    <div>
        <h2>ModelSync</h2>
        <vue-code>
            <pre lang="js">@ModelSync(propName: string, event?: string, options: ( Constructor | Constructor[] | PropOptions ) = {}) decorator </pre>
        </vue-code>
        <h3>示例：</h3>
        <vue-code>
            <pre lang="js">
import { Vue, Component, ModelSync } from 'vue-property-decorator'
 
@Component({ name: "VueItem" })
export default class VueItem extends Vue {
    @ModelSync('value', 'change', { type: String | Number | Boolean }) private name: string | number | boolean;

    private updateHandler() {
        this.name =  "Now: " + Date.now();
    }
}
            </pre>
        </vue-code>
        <p>等同于</p>
        <vue-code>
            <pre lang="js">
export default {
  name: "VueItem",
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String | Number | Boolean
    }
  },
  computed: {
    name: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  }
}
            </pre>
        </vue-code>
        <h3> 注意：</h3>
        <p>A：<em>v-model</em>是 <em>v-bind:value</em>和<em>v-on:input</em>的语法糖</p>
        <p>B：声明组件内不支持默认值</p>

        <h3> 例子1：v-on:input 事件</h3>
        <VueModelItem v-model="title"></VueModelItem>
        <VueModelItem v-model="name"></VueModelItem>
        <VueModelItem></VueModelItem>

        <h3> 例子2： 其它类型事件</h3>
        <VueModelItemChange :value="name" @change="changeHandler"></VueModelItemChange>
        <h3>例子源码：</h3>
        <p>item.vue</p>
        <vue-code>
            <pre lang="js">
@ModelSync('value', 'change', { type: String, default: "默认值" }) private name: string;

// 更改值
private updateHandler() {
    // TODO 不需要$emit()
    // this.$emit('change', Date.now());
    // 直接更改即可
    this.name = ""Now: " +  Date.now();
}</pre>
        </vue-code>
        <p>index.vue</p>
        <vue-code>
            <pre lang="html">&lt;Item :value="name" @change="val =&gt; name = val"&gt;&lt;/item&gt;</pre>
            <pre lang="js">private name: string | null = null; </pre>
        </vue-code>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import VueModelItem from './VueModelItem.vue';
import VueModelItemChange from './VueModelItemChange.vue';
@Component({ name: 'VueModelSync', components: { VueModelItem, VueModelItemChange } })
export default class VueModelSync extends Vue {
    private title: string = "标题";
    private name: string | null = null;

    private changeHandler(val: string) {
        console.log('---<', val);
        this.name = val;
    }
}
</script>
<style lang='stylus' scoped></style>