<template>
  <ul>
    <li v-for="i in size" :key="i">
      <span class="scale">
        <i
          v-for="k in count"
          :key="k"
          :class="{ active: k == 1, hide: k == count }"
        ></i>
      </span>
      <span v-if="i !== 1" class="label">{{ (i - 3) * space }}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "HorizontalRuler",
  props: {
    value: { type: Number, default: 100 },
    space: { type: Number, default: 100 },
  },
  data() {
    return {
      count: 6,
    };
  },
  computed: {
    size() {
      if (this.value && this.space) {
        return Math.ceil(this.value / this.space);
      } else {
        return 0;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
ul {
  list-style: none;
  width: 100%;
  height: 23px;
  padding: 0;
  margin: 0;
  white-space: nowrap;

  li {
    display: inline-block;
    width: 100px;

    .label {
      font-size: 6px;
      line-height: 8px;
      height: 8px;
      display: block;
      color: #707F8D;
      padding-top: 2px;
    }

    .scale {
      width: 100%;
      height: 12px;
      display: flex;
      overflow: hidden;
      justify-content: space-between;

      i {
        width: 1px;
        height: 50%;
        background: #404D5B;

        &.active {
          height: 100%;
        }

        &.hide {
          background: none;
        }
      }
    }
  }
}
</style>
