<template>
  <div>
    基础数据{{ num }}
    <button @click="counter">增加</button>
  </div>
</template>
<script>
import data from "./MixinsItem.js";
export default {
  name: "MixinsItemA",
  mixins: [data],
  created() {
    this.counter();
  },
};
</script>
