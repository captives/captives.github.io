<template>
  <el-input placeholder="请输入内容" v-model="text" clearable>
    <template slot="prepend">
      <el-select
        v-model="selectValue"
        v-if="list.length"
        placeholder="请选择视频"
        @change="changeHandler"
      >
        <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <span v-else>URL：</span>
    </template>
    <el-button slot="append" icon="el-icon-s-promotion" @click="requestURL"></el-button>
  </el-input>
</template>
<script>
export default {
  name: "URLInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    list: {
      type: Array, default: () => []
    }
  },
  data() {
    return {
      text: this.value,
      selectValue: null
    }
  },
  methods: {
    changeHandler(event) {
      this.text = this.selectValue;
    },
    requestURL() {
      this.$emit('input', this.text);
    }
  },
  mounted() {
    if (this.list.length) {
      this.text = this.list[0].value;
      this.selectValue = this.text;
      this.$emit('input', this.text);
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-input {
  >>> .el-input-group__append {
    color: #FFF;
    font-size: 18px;
    background-color: #409eff;
    border-color: #409eff;

    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }

  .el-select {
    width: 200px;
  }
}
</style>