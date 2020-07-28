<template>
  <el-main>
    <h3>站点导航</h3>
    <el-row :gutter="50">
      <el-col :span="12">
        <el-tree :data="list" :props="{ label: 'name'}" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="12">
        <el-cascader
          v-model="value"
          :options="list"
          :props="{ label: 'name', value: 'path'}"
          @change="handleChange"
        ></el-cascader>
      </el-col>
    </el-row>
  </el-main>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import list from './../../router';
	
@Component({
  name: "WebSite"
})
export default class WebSite extends Vue {
  private value: any | null = null;
  private list: Array<any> = list;

  private handleNodeClick(data: any) {

  }

  private handleChange(data: any) {

  }
}

</script>
<style lang="stylus" scoped></style>