<template>
  <el-table :data="data" border stripe :show-header="false">
    <el-table-column
      width="100"
      prop="id"
      label="日期"
      align="center"
    ></el-table-column>
    <el-table-column
      width="80"
      prop="name"
      label="姓名"
      align="center"
    ></el-table-column>
    <el-table-column prop="role" label="地址">
      <template slot-scope="scope">{{ RoleType[scope.row.role] }}</template>
    </el-table-column>
    <el-table-column prop="time" label="时间">
      <template slot-scope="scope">{{ scope.row.time | localTime }}</template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "OnlineList",
  props: {
    data: {},
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
