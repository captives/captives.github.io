<template>
  <el-table :data="tableData" stripe>
    <el-table-column label="媒体流ID" align="center">
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">{{scope.row.label.substr(0, 8)}}...</template>
      </el-table-column>
    </el-table-column>

    <el-table-column :label="value && value.id">
      <el-table-column prop="kind" label="类型" align="center"></el-table-column>
      <el-table-column label="id" align="center">
        <template slot-scope="scope">{{scope.row.id.substr(0, 8)}}...</template>
      </el-table-column>
      <el-table-column label="state" align="center">
        <template slot-scope="scope">{{scope.row.readyState}}</template>
      </el-table-column>
      <el-table-column label="enabled" align="center">
        <template slot-scope="scope">{{scope.row.enabled}}</template>
      </el-table-column>
      <el-table-column label="muted" align="center">
        <template slot-scope="scope">{{scope.row.muted}}</template>
      </el-table-column>
      <el-table-column v-if="edited" label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="移除轨道" placement="left">
            <el-link class="el-icon-minus" @click="removeTrack(scope.row)"></el-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-main class="table-expand">
            <el-row>
              <h4>Base:</h4>
              <el-col :span="12">label: {{scope.row.label}}</el-col>
              <el-col :span="12">ID: {{scope.row.id}}</el-col>
            </el-row>
            <el-row>
              <h4>Constraints:</h4>
              <el-col
                v-for="(item,key) in scope.row.getConstraints()"
                :key="key"
                :span="12"
              >{{key}} : {{item}}</el-col>
            </el-row>
            <el-row>
              <h4>Settings:</h4>
              <el-col
                v-for="(item,key) in scope.row.getSettings()"
                :key="key"
                :span="12"
              >{{key}} : {{item}}</el-col>
            </el-row>
            <el-row>
              <h4>Capabilities:</h4>
              <el-col
                v-for="(item,key) in scope.row.getCapabilities()"
                :key="key"
                :span="12"
              >{{key}} : {{item}}</el-col>
            </el-row>
          </el-main>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: "StreamTracks",
  props: {
    value: {
      type: MediaStream, default: null
    },
    edited: {
      type: Boolean, default: false
    }
  },
  data() {
    return {
      id: null,
      tableData: []
    }
  },
  watch: {
    value(stream) {
      this.id = stream.id;
      this.tableData = [];
      this.tableData = this.tableData.concat(stream.getVideoTracks(), stream.getAudioTracks());
    }
  },
  methods: {
    removeTrack(track) {
      if (this.value) {
        track.stop();
        this.value.removeTrack(track);
        console.log('remove track id', track.label, track.id);
        this.$emit('input', this.value);
      }
    }
  },
}
</script>
<style lang="stylus" scoped>
.el-table {
  >>> .el-table__expanded-cell {
    padding: 0px 20px;

    &:hover {
      background: #eee !important;
    }

    h4 {
      margin-top: 5;
      margin-bottom: 10px;
    }

    .el-col-12 {
      overflow-wrap: break-word;
      padding-left: 20px;
    }
  }
}
</style>