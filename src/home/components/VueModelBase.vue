<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="onClick">增加项A</button>
    <button @click="onClickB">增加项B</button>
  </div>
</template>
<script>
export default {
  name: "VueModelBase",
  props: {
    value: {
      type: Array,
      default: () => {},
    },
    title: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    onClick() {
      let list = this.title;
      list.push({ name: "BB", age: 12304 });
      this.$emit("input:title", list);
    },

    onClickB() {
      let list = this.title;
      list.push({ name: "BB", age: 12304 });
      this.$emit("input", list);
    },
  },
};
</script>
