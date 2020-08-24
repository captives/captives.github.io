<template>
  <el-main>
    <h3>TypeScript Vue ESLint 配置</h3>
    <p>.eslintrc.js</p>
    <p>使用<em>parser</em>插件</p>
    <vue-code>
      <pre lang="sh">module.exports = {
     /* 指定如何解析语法。可以为空，但若不为空，只能配该值，原因见下文。*/
    parser: 'vue-eslint-parser', 
    /* 扩展配置，加一些插件 */            
    extends: [
        'plugin:vue/recommended',              /* eslint应用在vue的必须配置 */
        'plugin:prettier/recommended'          /* 使用Prettier */
    ],
    /* 优先级低于parse的语法解析配置 */
    parserOptions: {
        parser: '@typescript-eslint/parser',   /* 解析ts语法 */
        ecmaVersion: 2018,
        sourceType: 'module'
    }
}
      </pre>
    </vue-code>
    <p>.eslintrc.yml</p>
    <vue-code>
      <pre lang="sh">parser: 'vue-eslint-parser'
extends: 
  - 'eslint:recommended'
  - 'plugin:vue/recommended'
parserOptions:
  parser: 'babel-eslint'
  ecmaFeatures:
    legacyDecorators: true
  ecmaVersion: 2018
  sourceType: 'module'
      </pre>
    </vue-code>
  </el-main>
</template>
<style lang="stylus" scoped>
.el-main {
  text-align: initial;
  width: 60%;
  min-width: 750px;
  margin: 0 auto;
}
</style>