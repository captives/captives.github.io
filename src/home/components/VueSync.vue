<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="onClick">更改标题</button>
  </div>
</template>
<script>
export default {
  name: "VueSync",
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  computed: {
    docTitle: {
      get() {
        return this.title;
      },
      set(value) {
        this.$emit("update:title", value);
      },
    },
  },
  methods: {
    onClick() {
      this.docTitle = "This is Vue.js Web App !";
    },
  },
};
</script>
