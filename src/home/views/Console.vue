<template>
  <el-main>
    <p>{{str}}</p>
    <el-button type="primary" @click="checkControl">控制台</el-button>
  </el-main>
</template>
<script>
export default {
  name: "Console",
  data() {
    return {
      str: ''
    }
  },
  methods: {
    checkControl() {
    
      this.str = JSON.stringify(console);
    }
  }
}
</script>