<template>
    <div ref="container">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "DomResize",
    mounted() {
        const resizeObserver = new ResizeObserver((entries) => {
            console.log(entries);
        });
        resizeObserver.observe(this.$refs["container"]);
    },
};
</script>