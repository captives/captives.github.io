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
        indent: ["error", 2],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-unused-vars": "off", // ["error", { args: "none" }], //消除未使用的变量，函数和函数的参数
        "comma-spacing": ["error", { before: false, after: true }], //在指定位置添加一定的间距
        "linebreak-style": "off", //强制执行统一的行结尾，而不受操作系统
        "no-useless-escape": "off", //标志可以在不改变行为的情况下安全地移除。
        // "semi-style": ["error", "last"], //以分号为单位报告行结束符
        "arrow-parens": "off", //箭头函数参数周围加上括号
        "arrow-spacing": ["error", { before: true, after: true }], //箭头函数的箭头前后添加相同间距
        "multiline-ternary": "off", //允许三元表达式的操作数被换行符隔开
        "vue/html-quotes": ["error", "double"],
        "vue/html-indent": "off", //["error", 2],
        "vue/script-indent": "off", // ["error", 2],
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
        "@typescript-eslint/no-inferrable-types": "off", // 关闭类型推断
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