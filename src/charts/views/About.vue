<template>
    <el-main>
        <p>client</p>
        <vue-source src="/charts/views/Xterm.vue" lang="html"></vue-source>
        <p>server</p>
        <vue-source src="srv/socket/xterm.js" lang="html"></vue-source>
    </el-main>
</template>

<script>
export default {
    name: "About",
    data() {
        return {};
    },
};
</script>