<template>
  <el-row>
    <vue-code v-if="code">
      <p class="title">{{src | label}}</p>
      <pre :lang="lang">{{code}}</pre>
    </vue-code>

    <template v-else>
      <img :src="loading" alt />
    </template>
  </el-row>
</template>
<script>
import loading from '@/assets/loading-code.gif';
import Code from './Code'
export default {
  name: "Source",
  components: {
    'vue-code': Code
  },
  props: {
    src: {
      type: String, default: ''
    },
    lang: {
      type: String, default: "html"
    }
  },
  data() {
    return {
      code: null,
      loading
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
        xhr.onprogress = (e) => { };
        xhr.onload = () => {
          resolve(xhr.response);
        }

        xhr.onerror = err => {
          console.error(err);
        }
        xhr.send();
      });
    }
  },
  mounted() {
    if (this.src) {
      this.fetch("src/" + this.src).then(code => {
        this.code = code;
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-row {
  img {
    display: block;
    margin: 0 auto;
    pointer-events: none;
  }
}
</style>