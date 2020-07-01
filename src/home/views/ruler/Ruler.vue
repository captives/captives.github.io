<template>
  <div ref="ruler" class="ruler">
    <VerticalRuler class="vertical-ruler" :value="clientHeight"></VerticalRuler>
    <HorizontalRuler class="horizontal-ruler" :value="clientWidth"></HorizontalRuler>
    <slot></slot>
    <span>{{clientWidth}}x{{clientHeight}}</span>
  </div>
</template>
<script>

import VerticalRuler from "./VerticalRuler.vue";
import HorizontalRuler from './HorizontalRuler.vue';
export default {
  name: "Ruler",
  components: { VerticalRuler, HorizontalRuler },
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0
    }
  },
  mounted() {
    this.clientWidth = this.$parent.$el.clientWidth;
    this.clientHeight = this.$parent.$el.clientHeight;

    this.$refs.ruler.addEventListener('resize', event => {
      console.log('resize.....');
    });
  }
}
</script>

<style lang="stylus" scoped>
.ruler {
  position: relative;
  width: 100%;
  height: 100%;
  background: #eee;
  color: #FFF;

  .horizontal-ruler {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #0E1011;
  }

  .vertical-ruler {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: #0E1011;
  }
}
</style>