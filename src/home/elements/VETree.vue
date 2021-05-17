<template>
    <el-main>
        <p>
            tree 自定义节点内容
            <el-button type="text" size="mini" @click="append()">新增</el-button>
        </p>
        <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
            <span slot-scope="{ node, data }" class="custom-tree-node" @dblclick="edit(node, data)">
                <el-input v-if="node.edited" v-model="data.label" placeholder="请输入内容" size="mini" clearable @blur="rename(node, data)" @change="rename(node, data)">
                    <el-button slot="append" @click="rename(node, data)">确认</el-button>
                </el-input>
                <span v-else>{{ node.label }}</span>
                <span>
                    <el-button type="text" size="mini" @click="append(data)">新增</el-button>
                    <el-button type="text" size="mini" @click="edit(node, data)">重命名</el-button>
                    <el-button type="text" size="mini" @click="remove(node, data)">删除</el-button>
                </span>
            </span>
        </el-tree>
        <p>级联菜单 同步显示</p>
        <el-cascader-panel :options="data" :props="{ value: 'id' }"></el-cascader-panel>
        <vue-source src="home/elements/VETree.vue" lang="html"></vue-source>
    </el-main>
</template>
<script>
let id = 1000;
const data = [
    {
        id: 1,
        label: "一级 1",
        children: [
            {
                id: 4,
                label: "二级 1-1",
                children: [
                    {
                        id: 9,
                        label: "三级 1-1-1",
                    },
                    {
                        id: 10,
                        label: "三级 1-1-2",
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: "一级 2",
        children: [
            {
                id: 5,
                label: "二级 2-1",
            },
            {
                id: 6,
                label: "二级 2-2",
            },
        ],
    },
    {
        id: 3,
        label: "一级 3",
        children: [
            {
                id: 7,
                label: "二级 3-1",
            },
            {
                id: 8,
                label: "二级 3-2",
            },
        ],
    },
];
export default {
    name: "VETree",
    data() {
        return {
            data: JSON.parse(JSON.stringify(data)),
        };
    },
    methods: {
        append(data) {
            const newChild = { id: ++id, label: "新增节点" };
            if (data) {
                if (!data.children) {
                    this.$set(data, "children", []);
                }
                data.children.push(newChild);
            } else {
                this.data.push(newChild);
            }
        },
        edit(node, data) {
            this.$set(node, "edited", true);
        },
        rename(node, data) {
            data.label = data.label || "未命名";
            this.$set(node, "edited", false);
        },
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex((d) => d.id === data.id);
            children.splice(index, 1);
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-tree >>> .el-tree-node__content {
    padding: 5px 10px;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
}
</style>
