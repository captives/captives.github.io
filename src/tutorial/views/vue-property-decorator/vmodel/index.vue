<template>
    <div>
        <h2>VModel</h2>
        <vue-code>
            <pre lang="js">@VModel(propsArgs?: PropOptions) decorator </pre>
        </vue-code>
        <h3>示例：</h3>
        <vue-code>
            <pre lang="js">
import { Vue, Component, VModel } from 'vue-property-decorator'
 
@Component({ name: "VueItem" })
export default class VueItem extends Vue {
    @VModel({ type: String | Number | Boolean }) private name: string | number| boolean;

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
        this.$emit('input', value)
      }
    }
  }
}
            </pre>
        </vue-code>
        <h3> 注意：</h3>
        <p>A：<em>v-model</em>是 <em>v-bind:value</em>和<em>v-on:input</em>的语法糖</p>
        <p>B：声明组件内不支持默认值</p>
        <p>C：VModel 是ModeSync下（prop: "value", event: "input")下的简写形式</p>

        <h3> 例子: </h3>
        <VueModelItem v-model="title"></VueModelItem>
        <VueModelItem v-model="name"></VueModelItem>
        <VueModelItem></VueModelItem>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import VueModelItem from './VueVModelItem.vue';
@Component({ name: 'VueVModel', components: { VueModelItem } })
export default class VueVModel extends Vue {
    private title: string = "标题";
    private name: string | null = null;

    private changeHandler(val: string) {
        this.name = val;
    }
}
</script>
<style lang='stylus' scoped></style>