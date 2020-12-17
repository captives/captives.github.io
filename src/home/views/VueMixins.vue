<template>
  <div>
    <MixinsItemA></MixinsItemA>
    <MixinsItemB></MixinsItemB>
  </div>
</template>
<script>
import MixinsItemA from "./mixins/MixinsItemA.vue";
import MixinsItemB from "./mixins/MixinsItemB.vue";
export default {
  name: "VueMixins",
  components: {
    MixinsItemA,
    MixinsItemB,
  },
};
</script>
