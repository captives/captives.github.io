<template>
    <el-main class="center">
        <h3>Javascript 中 var 声明和 function声明区别</h3>
        <p>示例 1</p>
        <vue-code>
            <pre lang="js">
// 函数表达式(function expression) 
var h1 = function () {
    // h1
}

// 函数声明(function declaration) 
function h2() {
    // h2
} </pre>
        </vue-code>
        <p>先说两者的显著区别:</p>
        <p>第一种声明方式也就是var声明方式, 函数只有在var语句声明之后才能被调用</p>
        <p>第二种生命方式也就是function声明方式, 函数可以在function声明之前被调用</p>

        <p>这是因为:</p>
        <p>对第一种情况, 函数表达式是在函数运行阶段才赋值给变量h</p>

        <p>对第二种情况, 函数表达式是在代码运行阶段之前, 也就是代码解析阶段才赋值给标识符h</p>

        <p><br><br>
            JS声明函数的三种方式:<br>
            1. 函数表达式: 即上面第一种方式, 这种方法使用function操作符创建函数, 表达式可以存储在变量或者对象属性里. 函数表达式往往被称为
            匿名函数, 因为它没有名字. 证明这一点你可以 console.log(h.name); 可以看到打印为空 ""; <br>
            2. 函数声明: 即上面第二种方式, 会声明一个具名函数, 且函数能在其所在作用域的任意位置被调用, 其创建的函数为具名函数, 证明这一
            点你可以 console.log(h.name); 可以看到打印为 "h". 可在后面的代码中将此函数通过函数名赋值给变量或者对象属性<br>
            3. Function()构造器: 不推荐这种用法, 容易出问题<br>
        </p>

        <p>
            <a href="https://www.jb51.net/article/135701.htm">更多阅读</a>
        </p>
    </el-main>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({ name: 'JavaScriptScoped' })
export default class JavaScriptScoped extends Vue {

    private example1() {
        // 函数表达式(function expression) 
        var h1 = function () {
            // h1
        }

        // 函数声明(function declaration) 
        function h2() {
            // h
        }
    }
}
</script>
<style lang='stylus' scoped></style>