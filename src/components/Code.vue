<template>
  <div ref="code" class="code">
    <slot>code info</slot>
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
    const list = this.$refs.code.querySelectorAll('pre') || [];
    list.forEach(preEl => {
      var codeEl = document.createElement('code');
      if (preEl.innerHTML) {
        codeEl.innerHTML = preEl.innerHTML;
        codeEl.className = 'language-' + preEl.getAttribute('lang');
      }
      this.$refs.code.replaceChild(codeEl, preEl);
    });
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