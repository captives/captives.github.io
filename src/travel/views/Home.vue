<template>
    <div class="home">
        <transition mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <img v-show="show" alt="Vue logo" src="../assets/logo.png" @click="show=!show" />
        </transition>
        <transition mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <img v-show="!show" alt="Vue logo" src="../assets/logo.png" @click="show=!show" />
        </transition>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Home",
})
export default class Home extends Vue {
    private show: boolean = false;
}
</script>
<style lang="stylus" scoped>
.home {
    text-align: center;
}
</style>
