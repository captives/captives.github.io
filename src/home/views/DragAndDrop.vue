<template>
  <el-main>
    <el-row :gutter="100">
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
      <el-col :span="10" @dragover.prevent @drop="dropModuleOnEgret">
        <ol>
          <li>1</li>
        </ol>
      </el-col>
    </el-row>
    <el-row :gutter="100">
      <el-col :span="10">
        <VueDrag></VueDrag>
      </el-col>
      <el-col :span="10">
        <VueDrop></VueDrop>
      </el-col>
    </el-row>
  </el-main>
</template>
<script>
import VueDrag from './../components/VueDrag.vue';
import VueDrop from './../components/VueDrop.vue';
export default {
  components: {
    VueDrag,
    VueDrop
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7]
    }
  },

  methods: {
    dragstartByResource() {
      console.log('VueAndDrop 拖放开始');
    },
    dropModuleOnEgret() {
      console.log('VueAndDrop 拖放结束');
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