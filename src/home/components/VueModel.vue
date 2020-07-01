<template>
  <div>
    <h1>{{title}}</h1>
    <button @click="onClick">更改标题 - model</button>
  </div>
</template>
<script>
export default {
  name: "VueModel",
  model: {
    prop: "title",
    event: "change"
  },
  props: {
    title: {
      //   type: String, default: "标题"
      type: Array, default: () => { }
    }
  },
  methods: {
    onClick() {
      //   this.$emit('change', "Vue Web App");
      let list = this.title;
      list.push({ name: "BB", age: 12304 });
      this.$emit('change', list);
    }
  }
}
</script>