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

        <h3>例子：</h3>
        <VuePropItem :propA="propA" :propC="propC">
            <el-button type="primary" @click="changeHandler">更改值</el-button>
        </VuePropItem>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import VuePropItem from './VuePropItem.vue';

@Component({ name: 'VueProp', components: { VuePropItem } })
export default class VueProp extends Vue {
    private propA: number = Date.now();
    private propC: string | boolean = "文本A";

    private changeHandler() {
        this.propA = Date.now();
        this.propC = ["这是文本", true][Math.round(Math.random() * 10) % 2];
    }
}
</script>
<style lang='stylus' scoped></style>