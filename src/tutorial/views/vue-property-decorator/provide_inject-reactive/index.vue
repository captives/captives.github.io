<template>
    <div>
        <h2>ProvideReactive InjectReactive</h2>
        <p>ProvideReactive 和 InjectReactive 是成对出现的，
            是Provide和Inject的响应式版本，如果父组件修改提供的值，则子组件可以捕获该修改；</p>
        <vue-code>
            <pre lang="js">@ProvideReactive(key?: string | symbol) decorator </pre>
            <pre lang="js">@InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey) decorator </pre>
        </vue-code>

        <h3>示例：</h3>
        <p>提供和赋值(静态数据、方法)</p>
        <vue-code>
            <pre lang="js">
import { Component, ProvideReactive, Vue } from 'vue-property-decorator'

const key = Symbol()
@Component({ name: "VueItem" })
export default class VueItem extends Vue {
    @ProvideReactive() one = 'value';
    @ProvideReactive(key) two = 'value';
    @ProvideReactive() public courseTime: string = "00:00";

    mounted() {
        setInterval(() => {
            this.courseTime = new Date().toLocaleString();
        }, 1000);
    }
} </pre>
        </vue-code>
        <p>注入和使用</p>
        <vue-code>
            <pre lang="html">&lt;b&gt;{ { courseTime } } - { { time } }&lt;/b&gt;</pre>
            <pre lang="js">
import { Component, InjectReactive, Vue } from 'vue-property-decorator'
@Component({ name: "VueItem" })
export default class VueItem extends Vue {
    @InjectReactive() one!: string;
    @InjectReactive(key) two!: string;
    @InjectReactive() private readonly courseTime: string;
    @InjectReactive('courseTime') private readonly time: string;
}</pre>
        </vue-code>

        <h3>例子：</h3>
        <p>响应式透传数据,数据响应来自顶层组件</p>
        <b>{{ courseTime }} - {{ time }}</b>
    </div>
</template>
<script lang='ts'>
import { Component, InjectReactive, Vue } from 'vue-property-decorator'
@Component({ name: 'VueProvideInjectReactive' })
export default class VueProvideInjectReactive extends Vue {
    @InjectReactive() private readonly courseTime: string;
    @InjectReactive('courseTime') private readonly time: string;

}
</script>