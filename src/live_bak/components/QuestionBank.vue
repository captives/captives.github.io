<template>
  <el-row>
    <el-alert :title="data.title" type="warning" :closable="false"></el-alert>
    <el-alert
      v-for="(item,index) in data.options"
      :key="index"
      :title="subjectOptionLabel[index] + '、' + item"
      type="info"
      :closable="false"
    ></el-alert>
    <el-alert :title="'正确选项：' + data.correct" description type="success" :closable="false"></el-alert>
    <el-row class="footer">
      <slot :data="data"></slot>
    </el-row>
  </el-row>
</template>
<script>
export default {
  name: "QuestionBank",
  props: {
    data: {}
  },
  data() {
    return {
      subjectOptionLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
    }
  },
}
</script>

<style lang="stylus" scoped>
.footer {
  margin-top: 50px;
  width: 100%;
  text-align: center;
}
</style>