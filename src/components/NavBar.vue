<template>
    <el-menu v-bind="$attrs" :default-active="selectActive" @select="navSelectHandler">
        <slot></slot>
        <template v-for="item in list">
            <el-submenu v-if="item.children" :key="item.path" :index="item.path">
                <template slot="title">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </template>

                <template v-for="sub in item.children">
                    <el-submenu v-if="sub.children" :key="sub.path" :index="sub.path">
                        <template slot="title">{{ sub.name }}</template>
                        <el-menu-item v-for="ssub in sub.children" :key="ssub.path" :index="ssub.path">{{ ssub.name }}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="sub.path" :index="sub.path">{{ sub.name }}</el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item v-else :key="item.path" :index="item.path">{{ item.name }}</el-menu-item>
        </template>
        <slot name="append"></slot>
    </el-menu>
</template>
<script>
//TODO use : <NavBar mode="horizontal"></NavBar>
export default {
    name: "NavBar",
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectActive: null,
        };
    },
    methods: {
        navSelectHandler(path, list, el) {
            this.$emit("change", path, list, el);

            // const str = list[0] + "#" + path;
            // if (path.indexOf(".") != -1) {
            //     window.location.href = path;
            // } else {
            //     window.location.href = list[0] + "#" + path;
            // }
            // if (path.indexOf('.') != -1) {
            //   window.location.href = path;
            // } else {
            //   this.selectActive = path;
            //   this.$router.push({ path });
            // }
        },
    },
};
</script>