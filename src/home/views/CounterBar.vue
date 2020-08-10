<template>
  <div class="stage-content">
    <ul class="stage-icon">
      <CounterBarItem v-for="(value,index) in list" :key="index" :value="value"></CounterBarItem>
    </ul>

    <el-row style="margin:20px 0">
      <el-button type="danger" size="mini" @click="increasing">递增</el-button>
      <el-button type="danger" size="mini" @click="decline">递减</el-button>
      <el-button type="danger" size="mini" @click="random">随机数</el-button>
    </el-row>
  </div>
</template>

<script>
import { update } from 'tween.js';
import CounterBarItem from './CounterBarItem.vue';
export default {
  name: "CounterBar",
  components: { CounterBarItem },
  data() {
    return {
      sid: 0,
      value: 0,
      list: [0, 0, 0, 0, 0, 0],
    }
  },
  methods: {
    stop() {
      if (this.sid) {
        clearInterval(this.sid);
        this.sid = 0;
      }
    },
    increasing() {
      this.stop();
      this.sid = setInterval(() => {
        let num = this.value++;
        let arr = num.toString().split('');
        this.list = arr.map(item => Number(item));
      }, 1000);
    },
    decline() {
      this.stop();
      this.sid = setInterval(() => {
        this.value--;
        this.value = this.value < 0 ? 99999 : this.value;
        let arr = this.value.toString().split('');
        this.list = arr.map(item => Number(item));
      }, 1000);
    },
    random() {
      this.stop();
      this.sid = setInterval(() => {
        let num = Math.ceil(Math.random() * 1000000);
        let arr = num.toString().split('');
        this.list = arr.map(item => Number(item));
      }, 2000);
    }
  },
  mounted() {
    function animate(time) {
      requestAnimationFrame(animate)
      update(time)
    }
    requestAnimationFrame(animate)
    this.random();
  }
};
</script>
<style lang="stylus" scoped>
.stage-content {
  width: 100%;
  margin: 30px auto;

  ul.stage-icon {
    list-style: none;
    width: 100%;
    height: 160px;
    margin: 0 auto;
    position: relative;
    display: flex;

    li {
      margin: 0 2px;
    }
  }
}
</style>