<template>
  <div ref="item" class="video-item">
    <p>{{ data.id }} - {{ data.name }}</p>
    <p>{{ RoleType[data.role] }}</p>
  </div>
</template>
<script>
export default {
  name: "VideoItem",
  props: {
    index: { type: Number, default: 1 },
    data: { type: Object, default: () => {} },
  },
  data() {
    return {
      position: {},
      rect: {},
    };
  },
  mounted() {
    this.onResize(document.documentElement);
    this.elementEvent.on("resize", () => {
      this.onResize(document.documentElement);
    });
  },
  methods: {
    onResize() {
      const dom = this.$refs.item;
      this.position = {
        x: dom.offsetLeft,
        y: dom.offsetTop,
        width: dom.offsetWidth,
        height: dom.offsetHeight,
      };

      this.rect = dom.getBoundingClientRect();
      this.win = dom.ownerDocument.defaultView;
      this.offset = {
        left: dom.offsetLeft,
        top: dom.offsetTop,
        x: this.rect.left + this.win.pageXOffset,
        y: this.rect.top + this.win.pageYOffset,
        width: dom.offsetWidth,
        height: dom.offsetHeight,
      };
      console.log(JSON.stringify(this.offset));
      this.$emit("change", this.data, this.offset);
    },
  },
};
</script>
<style lang="stylus" scoped>
.video-item {
  background: red;
  display: block;
  width: 160px;
  height: 120px;
  overflow: hidden;
}
</style>
