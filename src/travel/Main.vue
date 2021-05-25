<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "Main" })
export default class Main extends Vue {

}
</script>
<style lang="stylus" scoped>
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

