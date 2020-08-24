<template>
  <el-form :model="form" label-width="60px">
    <h1>属性</h1>
    <el-form-item label="X">
      <el-slider v-model="form.x" :min="0" :max="1920" show-input input-size="mini"></el-slider>
    </el-form-item>
    <el-form-item label="Y">
      <el-slider v-model="form.y" :min="0" :max="1080" show-input input-size="mini"></el-slider>
    </el-form-item>

    <el-form-item label="rotate">
      <el-slider v-model="form.rotate" :min="-180" :max="180" show-input input-size="mini"></el-slider>
    </el-form-item>
    <el-form-item label="scaleX">
      <el-slider v-model="form.scaleX" :min="0" :max="3" :step="0.001" show-input input-size="mini"></el-slider>
    </el-form-item>
    <el-form-item label="scaleY">
      <el-slider v-model="form.scaleY" :min="0" :max="3" :step="0.001" show-input input-size="mini"></el-slider>
    </el-form-item>
    <el-form-item label="skewX">
      <el-slider v-model="form.skewX" :min="-180" :max="180" :step="1" show-input input-size="mini"></el-slider>
    </el-form-item>
    <el-form-item label="skewY">
      <el-slider v-model="form.skewY" :min="-180" :max="180" :step="1" show-input input-size="mini"></el-slider>
    </el-form-item>

    <h1>动作</h1>
    <el-form-item label="time">
      <el-slider v-model="form.time" :min="0" :max="10" :step="0.01" show-input input-size="mini"></el-slider>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue, Model } from 'vue-property-decorator'
@Component({
  name: "Sidebar"
})
export default class Sidebar extends Vue {
  @Model('value', { type: Object }) private form: any;
}
</script>