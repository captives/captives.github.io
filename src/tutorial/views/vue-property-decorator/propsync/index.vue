<template>
    <div>
        <h2>PropSync</h2>

        <vue-code>
            <pre lang="js">@PropSync(propName: string, options: ( Constructor | Constructor[] | PropOptions ) = {}) decorator </pre>
        </vue-code>
        <h3>示例：</h3>
        <vue-code>
            <pre lang="js">
import { Vue, Component, PropSync } from 'vue-property-decorator'
 
@Component({ name: 'VueItem' })
export default class VueItem extends Vue {
  @PropSync('name', { type: String }) syncedName!: string
}
                </pre>
        </vue-code>
        等同于
        <vue-code>
            <pre lang="js">
export default {
  name:"VueItem",
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    syncedName: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      },
    },
  }
} </pre>
            <pre lang="html">
&lt;VueItem :name="name" @update="(value) =&gt; name = value"&gt;&lt;/VueItem&gt;
</pre>
        </vue-code>

        <div>
            <h3>例子： 数据类型是String</h3>
            <el-button type="danger" size="mini" @click="changeHandler">外部恢复默认值</el-button>
            <VuePropSyncItem :name.sync="title"> </VuePropSyncItem>
        </div>

        <div>
            <h3>例子：数据类型是Array&lt;string&gt;:</h3>
            <p>数据源:{{list}}
                <el-button type="success" size="mini" @click="addItemHandler">添加</el-button>
                <el-button type="danger" size="mini" @click="removeItemHandler">移除</el-button>
            </p>
            <VuePropSyncArrayItem :list.sync="list"></VuePropSyncArrayItem>
        </div>

        <div>
            <h3>例子：数据类型是Map:</h3>
            <p>数据源:{{value}}
                <el-button type="success" size="mini" @click="addMapItemHandler">添加</el-button>
                <el-button type="danger" size="mini" @click="value={}">移除</el-button>
            </p>
            <VuePropSyncMapItem ref="mapItem" :value.sync="value"></VuePropSyncMapItem>
        </div>

        <el-divider>注意：</el-divider>
        <h3>A：PropSync不支持默认值，以下情况，内部显示不了声明的默认值</h3>
        <vue-code>
            <p>item.vue</p>
            <pre lang="html">&lt;div&gt;{ { syncedName } }&lt;/div&gt;</pre>
            <pre lang="js">@PropSync('name', { type: String, default: "这是默认值" }) syncedName!: string;</pre>
            <p>index.vue</p>
            <pre lang="html">&lt;item :name="name"&gt;&lt;/item&gt;</pre>
            <pre lang="js">private name: string | null = null;</pre>
        </vue-code>
        <p>
            <VuePropSyncItem :name="name"> </VuePropSyncItem>
        </p>

        <h3>B：".sync"忽略后只能单向传值；在组件内部，是不能更改值的。</h3>
        <p>
            <VuePropSyncItem :name="title"> </VuePropSyncItem>
        </p>

        <h3>".sync"修饰符无法更新迭代变量（数组、对象、对象数组）等，以下写法是错误的</h3>
        <vue-code>
            <pre lang="html"> &lt;PropSyncItem v-for="(item,index) in list" :key="index" :name.sync="item"&gt; &lt;/PropSyncItem&gt;</pre>
        </vue-code>
        <p>背景样式，是通过<em>@Provide</em>注入type方法，进行随机设置</p>
    </div>
</template>
<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator';
import VuePropSyncItem from './VuePropSyncItem.vue';
import VuePropSyncArrayItem from './VuePropSyncArrayItem.vue';
import VuePropSyncMapItem from './VuePropSyncMapItem.vue';
@Component({ name: 'VuePropSync', components: { VuePropSyncItem, VuePropSyncArrayItem, VuePropSyncMapItem } })
export default class VuePropSync extends Vue {
    @Ref('mapItem') private readonly mapItem!: VuePropSyncMapItem;
    private title: string = '这是标题';
    private name: string | null = null;//TODO 无效的,不支持默认值
    private list: Array<string> = ['info', 'success', 'warning', 'error'];
    private value: any = {
        name: "张三",
        age: 20,
        height: 185
    }

    private changeHandler() {
        this.title = "这是默认值标题";
    }

    private addItemHandler() {
        if (Math.round(this.list.length % 2) == 1) {
            this.list.push(this.list[Math.round(Math.random() % 4)]);
            this.$message({ type: "success", message: "新元素添加" });
        } else {
            //置顶添加
            // this.data.unshift(this.data[Math.round(Math.random() % 4)]);
            //保留位置置顶添加
            this.list.splice(4, 0, this.list[Math.round(Math.random() % 4)]);
            this.$message({ type: "info", message: "新元素置顶添加" });
        }
    }

    private removeItemHandler() {
        const index = Math.round(Math.random() * (this.list.length - 1));
        if (index <= 3) {
            this.$message({ type: "error", message: "保留元素不可以删除" });
        } else {
            this.list.splice(index, 1);
            this.$message({ type: "error", message: "元素" + index + " 被删除" });
        }
    }

    private addMapItemHandler() {
        this.mapItem.addItemHandler();
    }
}
</script>