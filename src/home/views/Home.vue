<template>
  <div class="center">
    <img alt="Vue logo" src="../assets/logo.png" />
    <VueSync :title.sync="title"></VueSync>
    <VueModel v-model="list"></VueModel>
    <VueModelBase v-model="list" :title="list"></VueModelBase>
    <ul>
      <li v-for="(item,index) in list" :key="index">{{item.name}} | {{item.age}}</li>
    </ul>
    <HelloWorld :msg="title" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from './../components/HelloWorld.vue'
import VueSync from './../components/VueSync.vue';
import VueModel from './../components/VueModel.vue';
import VueModelBase from './../components/VueModelBase.vue'
export default {
  name: 'home',
  components: {
    HelloWorld, VueSync, VueModel, VueModelBase
  },
  data() {
    return {
      list: [
        { name: "AA", age: 10 }
      ],
      title: "Welcome to Your Vue.js App !"
    }
  }
}
</script>
