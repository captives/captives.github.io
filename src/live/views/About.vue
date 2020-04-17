<template>
  <el-container>
    <el-header>
      <el-row :gutter="100">
        <el-col :span="12">
          <Square></Square>
        </el-col>
        <el-col :span="12">
          <Square></Square>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="flex" width="50%">
        <Square v-for="index in 19" :key="index"></Square>
      </el-aside>
      <el-main>
        <Square></Square>

        <el-tabs v-model="activeName" style="height: 300px">
          <el-tab-pane label="用户管理" name="first">
            <Square></Square>
            <Square></Square>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <Square></Square>
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="third">
            <Square></Square>
          </el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">
            <Square></Square>
          </el-tab-pane>
        </el-tabs>
        <Square></Square>
      </el-main>
    </el-container>
    <el-footer>
      <Square></Square>
    </el-footer>
  </el-container>
</template>
<script>
import Square from './AboutSquare.vue';
export default {
  name: "About",
  data() {
    return {
      activeName: "first"
    }
  },
  components: { Square }
}

</script>
<style lang="stylus" scoped>
.flex {
  display: flex;
  column-count: 2;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
}

.el-header, .el-footer {
  height: 100px !important;
  background: #67C23A;
}

.el-container {
  height: calc(100% - 200px);

  .el-aside {
    background: #E6A23C;
    overflow-y: auto;
  }

  .el-main {
    background: #F56C6C;
  }
}
</style>