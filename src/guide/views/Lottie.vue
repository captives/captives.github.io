<template>
  <div class="bg">
    <vue-lottie class="lottie" value="lottie2/data.json"></vue-lottie>
  </div>
</template>
<script>
export default {
  name: "Lottie",
};
</script>
<style lang="stylus" scoped>
.lottie {
  width: 800px;
  height: 800px;
  margin: 0 auto;
}

.bg {
  width: 100%;
  height: 800px;
  display: block;
  background: #040e33;
  text-align: center;
}
</style>
