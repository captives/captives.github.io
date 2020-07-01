<template>
  <ul>
    <li v-for="item in list" :key="item.id" :style="{'background-image': `url(${item.listImg})`}">
      <span>{{item.title}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Hotel",
  props: {
    list: { type: Array, defaute: () => [] }
  }
}
</script>
<style lang="stylus" scoped>
ul {
  list-style: none;
  display: flex;
  flex-wrap: nowrap;

  li {
    float: left;
    width: 227px;
    height: 301px;
    background: #f7f7f7;
    margin-right: 16px;
    margin-top: 16px;
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: auto 100%;

    span {
      color: #FFF;
      display: inline-block;
      padding: 16px;
      width: calc(100% - 32px);
      height: 120px;
    }
  }
}
</style>