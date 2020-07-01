<template>
  <el-col :span="10">
    <ul>
      <li
        v-for="item in list"
        :key="item"
        @dragstart="dragstartByResource"
        draggable="true"
      >{{item}}</li>
    </ul>
  </el-col>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    dragstartByResource() {
      console.log('VueDrag 拖放开始');
    }
  }
}
</script>
<style lang="stylus" scoped>
ul, ol {
  list-style: none;
  background: #EEE;
  min-height: 200px;

  li {
    width: 100px;
    margin: 5px;
    padding: 5px;
    text-align: center;
    background: blue;
    color: #FFF;
  }
}
</style>