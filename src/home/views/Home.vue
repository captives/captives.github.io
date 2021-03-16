<template>
    <el-main class="center">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld :msg="title">
        </HelloWorld>
    </el-main>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "./../components/HelloWorld.vue";

export default {
    name: "home",
    components: {
        HelloWorld,
    },
    data() {
        return {
            list: [{ name: "AA", age: 10 }],
            title: "Welcome to Your Vue.js App !",
        };
    },
};
</script>
