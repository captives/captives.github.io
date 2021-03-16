<template>
    <div>
        <el-alert v-for="(item, key) in data" :key="key" @close="removeItemHandler(key)">{{key}} - {{item}}</el-alert>
        <p>
            内部：
            <el-button type="success" size="mini" @click="addItemHandler">添加</el-button>
        </p>
    </div>
</template>
<script lang='ts'>
import { Component, PropSync, Vue } from 'vue-property-decorator'
@Component({ name: 'VuePropSyncMapItem' })
export default class VuePropSyncMapItem extends Vue {
    @PropSync('value', { type: Object }) private data: any;

    private user: any = {
        name: "禹",
        age: 20,
        height: 185,
        country: "China",
        province: "豫",
        city: "牡丹",
        language: "zh_CN"
    }

    public addItemHandler() {
        for (let key in this.user) {
            if (!this.data[key]) {
                // this.data[key] = this.user[key]; //TODO 动态key，不能触发Vue响应机制
                this.$set(this.data, key, this.user[key]);
                this.$message({ type: "success", message: key + ":" + this.user[key] + "---- 属性已经添加" })
                break;
            }
        }
    }

    public removeItemHandler(key: string) {
        delete this.data[key];// 不能触发Vue响应机制
        this.data = Object.assign({}, this.data)
        this.$message({ type: "error", message: key + ":" + this.data[key] + "---- 移除" })
    }

}
</script>