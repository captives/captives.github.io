<template>
  <div class="row">
    <vue-code v-if="code">
      <p class="title">{{src | label}}</p>
      <pre :lang="lang">{{code}}</pre>
    </vue-code>

    <template v-else>
      <vue-lottie class="lottie" value="assets/lottie/lf20_0H52jw.json"></vue-lottie>
    </template>
  </div>
</template>
<script>
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
div.row {
  img {
    display: block;
    margin: 0 auto;
    pointer-events: none;
  }

  .lottie {
    width: 200px;
    height: 200px;
    margin: 100px auto 0 auto;
  }
}
</style>