<template>
    <div>
        <h2>Provide 、Inject</h2>
        <p>Provide 和 Inject 是成对出现的，Provide在父组件中提供给子组件使用的数据，inject在需要使用这个数据的子或孙组件等下级组件中注入数据； provide/inject可以轻松实现跨级访问父组件的数据</p>
        <vue-code>
            <pre lang="js">@Provide(key?: string | symbol) decorator </pre>
            <pre lang="js">@Inject(options?: { from?: InjectKey, default?: any } | InjectKey) decorator </pre>
        </vue-code>
        <h3>示例：</h3>
        <p>提供和赋值(静态数据、方法)</p>
        <vue-code>
            <pre lang="js">
import { Component, Provide, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component({ name: "VueItem" })
export default class VueItem extends Vue {
    @Provide()  readonly foo:string = 'foo';
    @Provide('bar')  readonly baz:string = 'bar';
    @Provide()  readonly now:Function = Date.now;
}</pre>
        </vue-code>
        <p>注入和使用</p>
        <vue-code>
            <pre lang="js">
import { Component, Inject, Vue } from 'vue-property-decorator'

const symbol = Symbol('baz')

@Component({ name: "VueItem" })
export default class VueItem extends Vue {
    @Inject() readonly foo!: string;
    @Inject('bar') readonly bar!: string;
    @Inject({ from: 'optional', default: 'default' }) readonly optional!: string;
    @Inject(symbol) readonly baz!: string;
    @Inject('now') readonly currentTime: Function;

    mounted() {
        console.log(this.foo, this.bar, this.baz);
        console.log(this.currentTime());
    }
}
            </pre>
        </vue-code>
        <p>等价于</p>
        <vue-code>
            <pre lang="js">
const symbol = Symbol("baz");
export default {
    name: "VueItem",
    inject: {
        foo: "foo",
        bar: "bar",
        optional: { from: "optional", default: "default" },
        baz: symbol,
        now: Date.now,
    },
    data() {
        return {
            foo: "foo",
            baz: "bar",
        };
    },
    provide() {
        return {
            foo: this.foo,
            bar: this.baz,
            now: this.now,
            currentTime: this.now,
        };
    },
};</pre>
        </vue-code>
        <h3>例子：</h3>
        <VueProvideInjectItem></VueProvideInjectItem>
    </div>
</template>
<script lang='ts'>
import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import VueProvideInjectItem from './VueProvideInjectItem.vue';

// 引入组件CSS样式
@Component({ name: 'VueProvideInject', components: { VueProvideInjectItem } })
export default class VueProvideInject extends Vue {

}
</script>