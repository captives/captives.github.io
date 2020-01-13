<template>
  <el-dropdown @command="selecteItem">
    <span class="el-dropdown-link">Source</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item,index) in value"
        :key="index"
        :command="item"
      >{{ item.value | label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: "SourceCode",
  props: {
    value: {
      type: Array, default: () => []
    }
  },
  filters: {
    label(item) {
      let arr = item.split('/');
      return arr[arr.length - 1];
    }
  },
  methods: {
    fetch(url) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.onloadstart = () => { };
        xhr.onload = () => {
          resolve(xhr.response);
        }

        xhr.onprogress = (e) => {
        };
        xhr.send();
      });
    },
    selecteItem(data) {
      this.fetch(data.value).then(code => {
        this.$set(data, 'code', code);
        this.$emit('input', this.value);
      });
    }
  },
}
</script>
<style lang="stylus" scoped>
.el-dropdown {
  padding: 5px 12px;
  cursor: pointer;
}
</style>