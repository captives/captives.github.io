<template>
    <div>
        <el-alert v-for="(item,index) in data" :key="index" :type="item">{{item}}
            <el-button type="primary" size="mini" style="float:right" @click="updateHandler(index)">更改值</el-button>
        </el-alert>
        <p>
            内部：
            <el-button type="success" size="mini" @click="addItemHandler">添加</el-button>
            <el-button type="danger" size="mini" @click="removeItemHandler()">移除</el-button>
        </p>
    </div>
</template>
<script lang='ts'>
import { Component, PropSync, Vue } from 'vue-property-decorator'
@Component({ name: 'VuePropSyncArrayItem' })
export default class VuePropSyncArrayItem extends Vue {
    @PropSync('list', { type: Array }) private data: Array<string>;

    private addItemHandler() {
        if (Math.round(this.data.length % 2) == 1) {
            this.data.push(this.data[Math.round(Math.random() % 4)]);
            this.$message({ type: "success", message: "新元素添加" });
        } else {
            //置顶添加
            // this.data.unshift(this.data[Math.round(Math.random() % 4)]);
            //保留位置置顶添加
            this.data.splice(4, 0, this.data[Math.round(Math.random() % 4)]);
            this.$message({ type: "info", message: "新元素置顶添加" });
        }
    }

    private removeItemHandler(index: number) {
        const size = index || Math.round(Math.random() * (this.data.length - 1));
        console.log('移除指定元素', index, size);
        if (size <= 3) {
            this.$message({ type: "error", message: "保留元素不可以删除 - " + size });
        } else {
            this.data.splice(size, 1);
            this.$message({ type: "error", message: "元素" + size + " 被删除" });
        }
    }

    private updateHandler(index: number) {
        //不能触发Vue自响应
        // this.data[index] = "更改后====> " + Date.now();
        this.$set(this.data, index, "更改后 ---> " + Date.now());
        console.log('更改值。。。。。', index);
    }
}
</script>