<template>
    <el-container :style="domStyle">私密会议室</el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from 'vuex-class';
const RoomStore = namespace("RoomStore");
@Component({
    name: "PrivateRoom",
})
export default class PrivateRoom extends Vue {
    @RoomStore.Getter('domStyle') private domStyle!: any;
    @RoomStore.Action('onResize') private onResize!: Function;

    mounted() {
        this.onResize({ element: this.$el });
        window.addEventListener('resize', this.onResize.bind(this, { element: this.$el }), false);
    }
}
</script>
<style lang="stylus" scoped>
.el-container {
    width: 1350px;
    height: 740px;
    background-image: radial-gradient(#ffffff, #d8f7f9);
}
</style>
