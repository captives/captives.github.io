<template>
  <el-main>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="label" label="名称"> </el-table-column>
      <el-table-column prop="kind" label="类型"> </el-table-column>
      <el-table-column prop="deviceId" label="Device ID"> </el-table-column>
    </el-table>

    <el-tag v-if="error" class="error" type="danger">{{ error }}</el-tag>

    <vue-source src="/webrtc/views/webrtc/MediaDevices.vue" lang="html"></vue-source>
  </el-main>
</template>
<script>
export default {
  name: "MediaDevices",
  data() {
    return {
      tableData: [],
      error: null
    }
  },
  methods: {
    gotDevices(deviceInfos) {
      this.tableData = deviceInfos;
    },
    handleError(err) {
      this.error = err;
    }
  },
  mounted() {
    navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError);
  }
}
</script>