<template>
    <el-main>
        <h1>Vue Property Decorator</h1>
        <vue-code>
            <pre lang="sh">npm i vue-property-decorator -save</pre>
        </vue-code>
        <el-collapse v-model="activeNames">
            <transition-group name="flip-list" tag="div">
                <el-collapse-item v-for="item in list" :title="item.label" :name="item.value" :key="item.value">
                    <component :is="item.component"></component>
                </el-collapse-item>
            </transition-group>
        </el-collapse>
        <h3>数据源</h3>
        <ul>
            <li>数据类型：{{ types }}</li>
            <li>数据类型：{{ courseTime }}</li>
        </ul>
        <h3>扩展：</h3>
        <p>
            <el-link href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html">动态组件，异步加载组件</el-link> -
            <el-link href="https://www.npmjs.com/package/vue-property-decorator">Vue Property Decorator</el-link>
        </p>
    </el-main>
</template>
<script lang='ts'>
import { Component, Provide, ProvideReactive, Vue } from 'vue-property-decorator';
//@ts-ignore;
import lodash from 'lodash';
@Component({
    name: 'VuePropertyDecorator',
})
export default class VuePropertyDecorator extends Vue {
    @Provide() private readonly type: Function = this.getType;
    @Provide() private readonly types: Array<string> = ['info', 'success', 'warning', 'error'];
    @ProvideReactive() public courseTime: string = "00:00";

    private activeNames: string = "";
    private list: Array<any> = [
        { value: "Prop", label: "@Prop", component: () => import('./prop/index.vue') },
        { value: "PropSync", label: "@PropSync(双向传值)", component: () => import('./propsync/index.vue') },
        { value: "Model", label: "@Model(双向传值)", component: () => import('./model/index.vue') },
        { value: "ModelSync", label: "@ModelSync", component: () => import('./modelsync/index.vue') },
        { value: "Watch", label: "@Watch", component: () => import('./watch/index.vue') },
        { value: "Provide", label: "@Provide(提供透传)", component: () => import('./provide-inject/index.vue') },
        { value: "Inject", label: "@Inject(注入透传)", component: () => import('./provide-inject/index.vue') },
        { value: "ProvideReactive", label: "@ProvideReactive(提供响应式透传)", component: () => import('./provide_inject-reactive/index.vue') },
        { value: "InjectReactive", label: "@InjectReactive(注入响应式透传)", component: () => import('./provide_inject-reactive/index.vue') },
        { value: "Emit", label: "@Emit", component: () => import('./emit/index.vue') },
        { value: "Ref", label: "@Ref", component: () => import('./ref/index.vue') },
        { value: "VModel", label: "@VModel", component: () => import('./vmodel/index.vue') },
    ];

    private getType() {
        return this.types[Math.round(Math.random() % 4)];
    }

    mounted() {
        setInterval(() => {
            const date: Date = new Date();
            this.courseTime = date.toLocaleString();

            if (date.getSeconds() == 0) {
                this.list = lodash.shuffle(this.list);
            }
        }, 1000);
    }

}
</script>
<style lang='stylus' scoped>
.flip-list-move {
    transition: transform 1s;
}

.el-main {
    max-width: 50%;
    text-align: left;
    margin: 0 auto;

    h1 {
        margin-bottom: 50px;
    }
}
</style>