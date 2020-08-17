<template>
  <div ref="item" class="box" @mouseover="show=true" @mouseout="show=false">
    <pre>
    Element: ({{offset.left}}, {{offset.top}}) {{offset.width}}x{{offset.height}}
    Stage:({{offset.x}}, {{offset.y}}) Rect:({{rect.x}}, {{rect.y}}) 
    Scroll:({{scroll.left}}, {{scroll.top}}) {{scroll.width}}x{{scroll.height}}
    DOM:({{dom.clientLeft + "," + dom.clientTop}})({{dom.offsetLeft + "," + dom.offsetTop}}){{dom.clientWidth + "x" + dom.clientHeight}}
    </pre>
    <div class="float-view" v-if="show">
      <div class="h" :style="{left: 0, top: offset.y + 'px'}"></div>
      <div class="v" :style="{left: offset.x+'px', top:0}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AboutSquare",
  data() {
    return {
      show: false,
      dom: {},
      rect: {},
      win: {},
      offset: { top: 0, left: 0 },
      scroll: {}
    }
  },
  methods: {
    onResize() {
      const dom = this.dom = this.$refs.item;
      this.rect = dom.getBoundingClientRect();
      this.win = dom.ownerDocument.defaultView;
      this.offset = {
        left: dom.offsetLeft,
        top: dom.offsetTop,
        x: this.rect.left + this.win.pageXOffset,
        y: this.rect.top + this.win.pageYOffset,
        width: dom.offsetWidth, height: dom.offsetHeight
      };
      this.scroll = { left: dom.parentNode.scrollLeft, top: dom.parentNode.scrollTop, width: dom.parentNode.scrollWidth, height: dom.parentNode.scrollHeight };
      console.warn(dom.parentNode.scrollLeft, dom.parentNode.scrollTop, dom.parentNode.scrollWidth, dom.parentNode.scrollHeight);
      this.$emit('change', this.offset);
    }
  },
  mounted() {
    this.onResize(document.documentElement);
    this.elementEvent.on('resize', () => {
      this.onResize(document.documentElement);
    });
  }
}
</script>
<style lang="stylus" scoped>
.box {
  display: block;
  background: #409EFF;
  width: 35%;
  margin: 10px;

  pre {
    color: #FFF;
    width: 100%;
    display: block;
  }

  .float-view {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .h {
      height: 1px;
      width: 100%;
      background: red;
      position: absolute;
    }

    .v {
      height: 100%;
      width: 1px;
      background: red;
      position: absolute;
    }
  }
}
</style>