<template>
  <router-view id="app"></router-view>
</template>

<script>
export default {
  name: "App",
  mounted() {
    window.onresize = () => {
      this.elementEvent.emit("resize", document.documentElement);
    };
  },
};
</script>
<style lang="stylus">
html, body, #app {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;

  ul, ol, li {
    list-style: none;
  }
}
</style>
