<template>
  <ol>
    <li v-for="i in size" :key="i">
      <span class="scale">
        <i
          v-for="k in count"
          :key="k"
          :class="{ active: k == 1, hide: k == count }"
        ></i>
      </span>
      <span v-if="i !== 1" class="label">{{ (i - 3) * 100 }}</span>
    </li>
  </ol>
</template>

<script>
export default {
  name: "VerticalRuler",
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
ol {
  list-style: none;
  width: 23px;
  height: 100%;
  padding: 0;
  margin: 0;

  li {
    display: block;
    height: 100px;
    width: 23px;
    position: relative;

    .label {
      font-size: 6px;
      line-height: 8px;
      height: 8px;
      width: 20px;
      text-align: center;
      display: block;
      color: #707F8D;
      transform: rotate(90deg);
      position: absolute;
      top: 9px;
      left: 5px;
    }

    .scale {
      width: 12px;
      height: 100%;
      display: flex;
      overflow: hidden;
      flex-direction: column;
      justify-content: space-between;

      i {
        width: 50%;
        height: 1px;
        background: #404D5B;

        &.active {
          width: 100%;
        }

        &.hide {
          background: none;
        }
      }
    }
  }
}
</style>
