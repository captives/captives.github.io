<template>
  <vue-code v-if="code">
    <p class="title">{{value}}</p>
    <pre :lang="lang">{{code}}</pre>
  </vue-code>
</template>
<script>
export default {
  name: "Source",
  props: {
    value: {
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
    }
  },
  mounted() {
    this.fetch(this.value).then(code => this.code = code);
  }
}
</script>
<style lang="stylus" scoped>
.el-dropdown {
  padding: 5px 12px;
}
</style>