<template>
  <div ref="lottieDiv"></div>
</template>
<script>
// 更多资源下载 lottiefiles.com/
import lottie from 'lottie-web';
export default {
  name: "lottie",
  props: {
    value: { type: String }
  },
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.lottieDiv,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: this.value
    });
  }
}
</script>
