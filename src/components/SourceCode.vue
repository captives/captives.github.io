<template>
    <span>
        <el-dropdown @command="selecteItem">
            <span class="el-dropdown-link">
                <slot :data="value">Source</slot>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in value" :key="index" :command="item">{{ item.value | label }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-drawer :title="selectItem.value" :visible.sync="drawerVisible" :modal="false" :destroy-on-close="true" :modal-append-to-body="false" direction="rtl" size="40%">
            <vue-code v-if="selectItem.code">
                <pre :lang="selectItem.lang">{{ selectItem.code }}</pre>
            </vue-code>
        </el-drawer>
    </span>
</template>
<script>
import Code from "./Code";
export default {
    name: "SourceCode",
    components: {
        "vue-code": Code,
    },
    filters: {
        label(item) {
            let arr = item.split("/");
            return arr[arr.length - 1];
        },
    },
    props: {
        drawed: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            drawerVisible: false,
            selectItem: {},
        };
    },
    methods: {
        fetch(url) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("get", url);
                xhr.setRequestHeader("Content-type", "text/html");
                xhr.onloadstart = () => {};
                xhr.onload = () => {
                    resolve(xhr.response);
                };

                xhr.onprogress = (e) => {};
                xhr.send();
            });
        },
        selecteItem(data) {
            const url = data.value && data.value.indexOf("src/") == -1 ? "src/" + data.value : data.value;
            this.fetch(url).then((code) => {
                this.selectItem = data;
                this.drawerVisible = this.drawed;

                this.$set(data, "code", code);
                this.$emit("input", this.value);
            });
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-dropdown {
    cursor: pointer;
    font-size: 16px;
}
</style>
