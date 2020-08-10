<template>
  <li>
    <span ref="currentTop" class="current stage-icon-top">{{value}}</span>
    <span ref="currentBottom" class="current stage-icon-bottom">{{value}}</span>

    <span ref="oldTop" class="old stage-icon-top">{{old}}</span>
    <span ref="oldBottom" class="old stage-icon-bottom">{{old}}</span>
  </li>
</template>

<script>
import { Tween, Easing } from 'tween.js';

export default {
  name: "CounterBar",
  data() {
    return {
      old: 0,
    }
  },
  props: {
    value: { type: Number, default: 0 }
  },
  watch: {
    value(val, old) {
      this.run();
    }
  },
  methods: {
    run() {
      const currentTop = this.$refs.currentTop;
      const currentBottom = this.$refs.currentBottom;
      const oldTop = this.$refs.oldTop;
      const oldBottom = this.$refs.oldBottom;

      let property = { rotateX: 0 }
      var topTween = new Tween(property)
        .to({ rotateX: -90 }, 200)
        .onUpdate(function () {
          oldTop.style.setProperty('transform', 'rotateX(' + property.rotateX + 'deg)');
          oldTop.style.setProperty('z-index', 1);
          oldBottom.style.setProperty('z-index', 1);
          currentTop.style.setProperty('z-index', 0);
          currentBottom.style.setProperty('z-index', 0);
        })

      var bottomTween = new Tween(property)
        .delay(200)
        .to({ rotateX: -90 }, 200)
        .onUpdate(function () {
          currentBottom.style.setProperty('transform', 'rotateX(' + (90 + property.rotateX) + 'deg)');
          oldTop.style.setProperty('z-index', 0);
          oldBottom.style.setProperty('z-index', 0);
          currentTop.style.setProperty('z-index', 1);
          currentBottom.style.setProperty('z-index', 1);
        })
        .onComplete(() => {
          this.old = this.value;
        })

      topTween.start();
      bottomTween.start();

    }
  }
};
</script>
<style lang="stylus" scoped>
li {
  border: 1px solid orange;
  width: 100px;
  height: 160px;
  display: block;
  position: relative;
  // overflow: hidden;

  span {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 4cm;
    text-align: center;
    width: 100px;
    position: absolute;
    left: 0;
    background-color: #fff;
    background-repeat: no-repeat;
    overflow: hidden;

    &.stage-icon-top {
      height: 79px;
      padding: 0;
      top: 0;
      transform-origin: center bottom;
      line-height: 160px;
    }

    &.stage-icon-bottom {
      height: 80px;
      top: 80px;
      padding: 0;
      transform-origin: center top;
      background: #FFF;
      line-height: 0;
    }

    &.old {
      z-index: 1;
    }

    &.current {
      z-index: 0;
    }
  }
}
</style>