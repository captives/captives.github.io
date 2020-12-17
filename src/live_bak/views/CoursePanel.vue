<template>
  <el-row>
    <img class="course" :src="list[page - 1]" />
  </el-row>
</template>
<script>
export default {
  name: "CoursePanel",
  props: {
    list: {
      type: Array,
      defalute: () => [],
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  mounted() {
    this.$emit("change", this.page, this.list.length);
  },
  methods: {
    prevPage() {
      this.page--;
      this.page = this.page > 0 ? this.page : 1;
      this.$emit("change", this.page, this.list.length);
    },
    nextPage() {
      this.page++;
      this.page = this.page < this.list.length ? this.page : this.list.length;
      this.$emit("change", this.page, this.list.length);
    },
    changePage(i) {
      this.page = i;
      this.$emit("change", this.page, this.list.length);
    },
  },
};
</script>
<style lang="stylus" scoped>
.el-row {
  width: 100%;
  height: 100%;

  .course {
    width: 100%;
    height: 100%;
  }
}
</style>
