<template>
  <div ref="code" class="code">
    <slot>console.log('hello code~')</slot>
  </div>
</template>
<script>
import Prism from 'prismjs';
export default {
  name: "Code",
  props: {
    language: { type: String, default: 'javascrit' },
  },
  mounted() {
    let preEl = this.$refs.code.querySelector('pre');
    if (preEl.innerHTML) {
      var codeEl = document.createElement('code');
      codeEl.innerHTML = preEl.innerHTML;
      codeEl.className = 'language-' + preEl.getAttribute('lang');
      this.$refs.code.replaceChild(codeEl, preEl);
    }
    Prism.highlightAll();
  },
}
</script>
<style lang="stylus" scoped>
.code {
  p {
    margin: 5px 10px 0 10px;
    overflow-wrap: break-word;

    &.title {
      font-size: 12px;
    }
  }
}
</style>