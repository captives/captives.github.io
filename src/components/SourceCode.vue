<template>
  <span>
    <el-dropdown @command="selecteItem">
      <span class="el-dropdown-link">
        <slot :data="value">Source</slot>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item,index) in value"
          :key="index"
          :command="item"
        >{{ item.value | label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-drawer
      :title="selectItem.value"
      :visible.sync="drawerVisible"
      :destroy-on-close="true"
      direction="rtl"
      size="40%"
    >
      <vue-code v-if="selectItem.code">
        <pre :lang="selectItem.lang">{{selectItem.code}}</pre>
      </vue-code>
    </el-drawer>
  </span>
</template>
<script>
import Code from './Code'
export default {
  name: "SourceCode",
  components: {
    'vue-code': Code
  },
  props: {
    drawed: {
      type: Boolean, default: true
    },
    value: {
      type: Array, default: () => []
    }
  },
  data() {
    return {
      drawerVisible: false,
      selectItem: {}
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
      this.fetch("src/" + data.value).then(code => {
        this.selectItem = data;
        this.drawerVisible = this.drawed;

        this.$set(data, 'code', code);
        this.$emit('input', this.value);
      });
    }
  },
}
</script>
<style lang="stylus" scoped>
.el-dropdown {
  cursor: pointer;
  font-size: 16px;
}

.el-drawer__wrapper {
  >>> .el-drawer:focus {
    outline: none;
  }

  >>> .el-drawer__header {
    padding-top: 20px;
    margin-bottom: 10px;

    &:focus, button:focus {
      outline: none;
    }
  }

  >>> .el-drawer__body {
    position: relative;

    .code {
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      bottom: 20px;
      margin: 0;
    }
  }
}
</style>