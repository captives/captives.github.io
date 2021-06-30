
<template>
    <div class="vue-table">
        <div ref="header" class="header">
            <slot name="header"></slot>
        </div>
        <div ref="body">
            <slot name="fixed"></slot>
        </div>
        <el-table :data="data" :style="{ height: fixed ? maxHeight : 'initial' }" v-bind="$attrs" v-on="$listeners" :max-height="fixed ? maxHeight : 'initial'">
            <slot></slot>
        </el-table>
        <div ref="footer" class="footer">
            <slot name="footer">
                <el-pagination :layout="layout" @current-change="changePage" @size-change="sizeChange" :current-page="page" :page-size="size" :page-sizes="sizes" :total="total"> </el-pagination>
            </slot>
        </div>
    </div>
</template>
<script>
import { Table } from "element-ui";
let resizeObserver;
export default {
    name: "VueTable",
    components: { [Table.name]: Table },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        fixed: {
            type: Boolean,
            default: false,
        },
        page: {
            type: Number,
            default: 1,
        },
        size: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 1,
        },
        sizes: {
            type: Array,
            default: () => [10, 20, 50, 100, 200],
        },
        layout: {
            type: String,
            default: "sizes, prev, pager, next, total",
        },
        stick: {
            //固定窗口
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            maxHeight: "100%",
        };
    },
    watch: {
        stick() {
            this.fixed && this.onresize();
        },
        fixed(value) {
            value ? this.observe() : this.unobserve();
        },
    },
    methods: {
        changePage(page) {
            this.$emit("page-change", page, this.size);
        },
        sizeChange(size) {
            this.$emit("page-change", this.page, size);
        },
        onresize() {
            if (!this.$el || !this.$refs["header"] || !this.$refs["footer"] || !this.$refs["body"]) {
                return;
            }
            let doc = this.$el.getBoundingClientRect();
            const dom = window.getComputedStyle(this.$el);
            let paddingTop = parseInt(dom["padding-top"].replace("px", ""));
            let paddingBottom = parseInt(dom["padding-top"].replace("px", ""));
            let main = this.$el.getBoundingClientRect();
            let header = this.$refs["header"].getBoundingClientRect();
            let footer = this.$refs["footer"].getBoundingClientRect();
            let body = this.$refs["body"].getBoundingClientRect();
            if (this.stick) {
                this.maxHeight = Math.floor(doc.height - paddingTop - paddingBottom - body.height - footer.height) + "px";
            } else {
                this.maxHeight = Math.floor(doc.height - paddingTop - paddingBottom - body.height - header.height - footer.height) + "px";
            }
        },
        observe() {
            resizeObserver.observe(this.$el);
            resizeObserver.observe(this.$refs["header"]);
            resizeObserver.observe(this.$refs["footer"]);
            resizeObserver.observe(this.$refs["body"]);
        },
        unobserve() {
            resizeObserver.disconnect();
            this.maxHeight = "initial";
        },
    },
    mounted() {
        resizeObserver = new ResizeObserver((entries) => {
            this.onresize();
        });

        this.fixed ? this.observe() : this.unobserve();
    },
};
</script>
<style lang="stylus" scoped>
.vue-table {
    flex: 1;
    overflow-x: hidden;

    .footer {
        text-align: right;
    }
}

. table {
    [class^='jr-icon-'], [class*=' jr-icon-'] {
        color: red;
        margin-right: 12px;
    }

    [class^='jr-icon-']:last-child, [class*='jr-icon-']:last-child {
        margin-right: 0;
    }
}
</style>