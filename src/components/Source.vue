<template>
  <vue-code v-if="code">
    <p class="title">{{src | label}}</p>
    <pre :lang="lang">{{code}}</pre>
  </vue-code>
</template>
<script>
import code from './Code'
export default {
  name: "Source",
  components: {
    'vue-code': code
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
      code: null
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
      this.fetch("src" + this.src).then(code => this.code = code);
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-dropdown {
  padding: 5px 12px;
}
</style>