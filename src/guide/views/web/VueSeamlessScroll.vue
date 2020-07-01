<template>
  <el-main>
    <el-row style="height: 301px; overflow: hidden;">
      <VueScroller :data="list" :class-option="classHOption">
        <Hotel :list="list"></Hotel>
        <Hotel :list="list"></Hotel>
      </VueScroller>
    </el-row>

    <el-row style="height: 200px; overflow: hidden;">
      <VueScroller :data="list" :class-option="classOption">
        <ul>
          <li v-for="item in list" :key="item.id">{{item.title}} - {{item.grassCount}}</li>
        </ul>
      </VueScroller>
    </el-row>
    <vue-source src="guide/views/web/VueSeamlessScroll.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
//无限滚动
//https://chenxuan0000.github.io/vue-seamless-scroll/index.html#/routerOne
import scroll from 'vue-seamless-scroll';
import Hotel from './Hotel.vue';
export default {
  name: "VueSeamlessScroll",
  components: { VueScroller: scroll, Hotel },
  data() {
    return {
      list: [],
      classHOption: {
        limitMoveNum: 2,
        direction: 3,
        singleWidth: 227
      },
      classOption: {
        step: 0.5,
        limitMoveNum: 5
      }
    }
  },
  created() {
    this.$fetch('/assets/hotel.json').then((res) => {
      this.list = res;
    });
  }
}
</script>
<style lang="stylus" scoped></style>