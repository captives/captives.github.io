export default [
  {
    title: "时间选择器",
    description: "el-time-select",
    content: `<el-time-select
        v-model="value"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="选择时间">
      </el-time-select>
      
      <script>
        export default {
          data() {
            return {
              value: ''
            };
          }
        }
      </script>`
  }, {
    title: "日期选择器",
    description: "el-date-picker",
    content: `<template>
      <div class="block">
        <span class="demonstration">默认</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div></template>

      <script>
        export default {
          data() {
            return {
              value1: '',
              value2: '',
            };
          }
        };
      </script>`
  }, {
    title: "Vue代码库",
    description: "el-date-picker",
    content: `<div ref="code" class="code">
    <pre  class="language-javascript"></pre>
  </div>`
  }
];