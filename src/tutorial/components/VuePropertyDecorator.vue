<template>
  <div>
    <h1>{{msg}}</h1>
    <VueRef ref="hello"></VueRef>
    <button @click="onclick">[Ref]点击一下</button>

    <h3>--- {{offspring}}---</h3>
    <p>1、
      {{userData}}
      <VuePropSync v-model="userData" :children.sync="offspring"></VuePropSync>
    </p>
    <p>2、
      {{userData}}
      <VueModel v-model="userData"></VueModel>
    </p>
    <p>3、
      {{userData}}
      <VueModelBase v-model="userData"></VueModelBase>
    </p>
    <p>4、
      {{userList}}
      <VuePropSyncArray v-model="userList"></VuePropSyncArray>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from 'vue-property-decorator'
import VueRef from './VueRef.vue';
import VueModel from './VueModel.vue'
import VueModelBase from './VueModelBase.vue'
import VuePropSync from './VuePropSync.vue'
import VuePropSyncArray from './VuePropSyncArray.vue'
@Component({
  name: "VuePropertyDecorator",
  components: { VueRef, VuePropSync, VuePropSyncArray, VueModel, VueModelBase }
})

export default class VuePropertyDecorator extends Vue {
  @Prop({ type: String, default: 'title' }) private msg!: string | null;
  @Ref() private hello!: VuePropertyDecorator;
  @Ref('aButton') private  button!: HTMLButtonElement | null;
  private offspring: any = {};

  private userData: any = {
    age: 23, name: "李四-----", desc: "z是"
  }

  private userList: Array<any> = [
    { age: 23, name: "李四-----", desc: "z是" }
  ]

  private onclick() {
    //@ts-ignore
    this.hello.show("2");
    console.log(this.button);
  }

  mounted() {
   //@ts-ignore
    window.userData = {};
    //@ts-ignorev
    this.userData =  window['userData'];
    //@ts-ignore
    // window.userData = this.userData;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
