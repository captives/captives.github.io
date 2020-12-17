module.exports = {
  env: {
    browser: true,
    node: true,
    amd: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    indent: "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "comma-spacing": ["error", { before: false, after: true }],
    "linebreak-style": [0, "error", "windows"],
    "semi-style": ["error", "last"],
    "multiline-ternary": "off",
    "vue/html-quotes": ["error", "double"],
    /** 自我关闭风格 */
    "vue/html-self-closing": "off",
    /** 在标签的右括号之前需要或不允许使用空格 */
    "vue/html-closing-bracket-spacing": "error",
    /** 强制每行的最大属性数 */
    "vue/max-attributes-per-line": "off",
    /**
     * prop 的默认值必须匹配它的类型
     * @reason 类型相关的约束交给 TypeScript
     */
    "vue/require-valid-default-prop": "off",
    /**
     * props 的取值必须是基本类型的构造函数，而不是字符串
     * @reason 类型相关的约束交给 TypeScript
     */
    "vue/require-prop-type-constructor": "off",
    "vue/mustache-interpolation-spacing": "off",
    /**
     * 限制自定义组件的属性风格
     */
    "vue/attribute-hyphenation": "off",
    /**
     * 组件的属性必须为一定的顺序
     */
    "vue/order-in-components": "error",
    /**
     * 标签属性必须按规则排序
     */
    "vue/attributes-order": "off",
    /**
     * 组件中必须按照 <script>, <template>, <style> 排序
     * @reason 这是官方建议的顺序
     */
    "vue/component-tags-order": [
      "error",
      { order: ["template", "script", "style"] },
    ],
    /**
     * 禁止使用 any
     */
    "@typescript-eslint/no-explicit-any": ["off"], //any类型检查的警告
    /**
     * 禁止使用 // @ts-ignore // @ts-nocheck // @ts-check
     * @reason 这种注释本身就是对特殊代码的说明
     */
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    /**
     * 指定类成员的排序规则
     * @reason 优先级：
     * 1. static > instance
     * 2. field > constructor > method
     * 3. public > protected > private
     */
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "public-static-field",
          "protected-static-field",
          "private-static-field",
          "static-field",
          "public-static-method",
          "protected-static-method",
          "private-static-method",
          "static-method",
          "public-instance-field",
          "protected-instance-field",
          "private-instance-field",
          "public-field",
          "protected-field",
          "private-field",
          "instance-field",
          "field",
          "constructor",
          "public-instance-method",
          "protected-instance-method",
          "private-instance-method",
          "public-method",
          "protected-method",
          "private-method",
          "instance-method",
          "method",
        ],
      },
    ],
    /**
     * interface 和 type 定义时必须声明成员的类型
     */
    "@typescript-eslint/typedef": [
      "error",
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],
  },
};
