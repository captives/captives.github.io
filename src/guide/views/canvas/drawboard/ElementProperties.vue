<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" class="center">颜色</el-col>
      <el-col :span="4" class="center">
        <el-color-picker v-model="element.fill" :predefine="predefineColors" size="small"></el-color-picker>
      </el-col>
      <el-col :span="10">
        <el-input v-model="element.fill" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6" class="center">边框</el-col>
      <el-col :span="4" class="center">
        <el-color-picker v-model="element.stroke" :predefine="predefineColors" size="small"></el-color-picker>
      </el-col>
      <el-col :span="10">
        <el-input v-model="element.stroke" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6" class="center">边框宽度</el-col>
      <el-col :span="14" class="center">
        <el-slider v-model="element.strokeWidth" :min="1" :max="20" :step="1" size="mini"></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6" class="center">背景色</el-col>
      <el-col :span="4" class="center">
        <el-color-picker v-model="element.background" :predefine="predefineColors" size="small"></el-color-picker>
      </el-col>
      <el-col :span="10">
        <el-input v-model="element.background" size="small"></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="6" class="center">透明度</el-col>
      <el-col :span="14" class="center">
        <el-slider v-model="element.opacity" :min="0.001" :max="1" :step="0.005"></el-slider>
      </el-col>
    </el-row>

    <el-divider content-position="left">锁定</el-divider>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-checkbox v-model="element.horizontalLock"></el-checkbox>
        <span>水平调整</span>
      </el-col>

      <el-col :span="12">
        <el-checkbox v-model="element.verticalLock"></el-checkbox>
        <span>垂直调整</span>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-checkbox v-model="element.horizontalScale"></el-checkbox>
        <span>水平缩放</span>
      </el-col>

      <el-col :span="12">
        <el-checkbox v-model="element.verticalScale"></el-checkbox>
        <span>垂直缩放</span>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-checkbox v-model="element.rotation"></el-checkbox>
        <span>旋转</span>
      </el-col>

      <el-col :span="12">
        <el-checkbox v-model="element.scaling"></el-checkbox>
        <span>缩放</span>
      </el-col>
    </el-row>

    <!-- <el-divider content-position="left">控制点</el-divider> -->

    <el-divider content-position="left">特定文本组件</el-divider>
    <template v-if="isText">
      <el-row :gutter="10">
        <el-col :span="6" class="center">对齐方式</el-col>
        <el-col :span="14" class="center">
          <el-select v-model="element.textAlign" placeholder="请选择" size="small">
            <el-option value="left">left</el-option>
            <el-option value="center">center</el-option>
            <el-option value="right">right</el-option>
            <el-option value="justify">justify</el-option>
            <el-option value="justify-left">justify-left</el-option>
            <el-option value="justify-right">justify-right</el-option>
            <el-option value="justify-center">justify-center</el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="6" class="center">字体大小</el-col>
        <el-col :span="14" class="center">
          <el-slider v-model="element.fontSize" :min="10" :max="60" :step="1" size="small"></el-slider>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6" class="center">行高</el-col>
        <el-col :span="14" class="center">
          <el-slider v-model="element.lineHeight" :min="10" :max="60" :step="1" size="small"></el-slider>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6" class="center">字符间距</el-col>
        <el-col :span="14" class="center">
          <el-slider v-model="element.charSpacing" :min="0" :max="20" :step="0.1" size="small"></el-slider>
        </el-col>
      </el-row>
      <el-row>
        <i class=""></i>
        <el-button type="primary" size="mini">粗体</el-button>
        <el-button type="success" size="mini">斜体</el-button>
        <el-button type="danger" size="mini">上划线</el-button>
        <el-button type="info" size="mini">下划线</el-button>

        <el-button type="danger" size="mini">上标</el-button>
        <el-button type="info" size="mini">下标</el-button>
        <el-button type="warning" size="mini">删除线</el-button>
      </el-row>
    </template>
  </div>
</template>
<script>
import { DrawType } from "./DrawTypeBar";
export default {
  name: "ElementProperties",
  props: {
    value: { type: Object, default: () => {} },
    drawType: { type: String },
  },
  data() {
    return {
      element: {
        fill: null,
        stroke: null,
        background: null,
        strokeWidth: 3,
        opacity: 1,
        textAlign: "left",
        fontSize: 12,
        lineHeight: 20,
        charSpacing: 1,
        horizontalLock: false,
        verticalLock: false,
        horizontalScale: false,
        verticalScale: false,
        rotation: false,
        scaling: false,
      },
      predefineColors: ["#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585", "rgba(255, 69, 0, 0.68)", "rgb(255, 120, 0)", "hsv(51, 100, 98)", "hsva(120, 40, 94, 0.5)"],
    };
  },
  computed: {
    isText() {
      return [DrawType.TEXTBOX, DrawType.ITEXT, DrawType.TEXT].indexOf(this.drawType) != -1;
    },
  },
  watch: {
    element: {
      deep: true,
      handler(value) {
        this.$emit("input", value);
      },
    },
  },
  created() {
    this.element = Object.assign({}, this.element, this.value);
  },
};
</script>
<style lang="stylus" scoped>
.el-checkbox {
  margin-right: 10px;
}
</style>
