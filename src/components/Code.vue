<template>
    <div ref="code" class="code">
        <slot>code info</slot>
    </div>
</template>
<script>
import Prism from "prismjs";
export default {
    name: "Code",
    props: {
        language: { type: String, default: "javascrit" },
    },
    mounted() {
        this.render();
    },
    methods: {
        render() {
            const list = this.$refs.code.querySelectorAll("pre") || [];
            list.forEach((preEl) => {
                var codeEl = document.createElement("code");
                if (preEl.innerHTML) {
                    codeEl.innerHTML = preEl.innerHTML;
                    codeEl.className = "language-" + preEl.getAttribute("lang");
                }
                this.$refs.code.replaceChild(codeEl, preEl);
            });
            Prism.highlightAll();
        },
    },
};
</script>
<style lang="stylus" scoped>
.code {
    font-size: 18px;

    p {
        margin: 0;
        overflow-wrap: break-word;
        position: absolute;
        right: 10px;
        top: 0px;
        height: 32px;
        line-height: 32px;
        vertical-align: middle;

        &.title {
            font-size: 12px;
            text-align: left;
        }
    }
}
</style>
