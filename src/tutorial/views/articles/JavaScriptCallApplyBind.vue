<template>
    <el-main>
        <h1> JavaScript 中的 call、apply、bind </h1>
        <h2>一、call、apply 的定义</h2>
        call 和 apply 可以调用函数，改变this指向实现继承和借用别的对象的方法：
        <ul>
            <li> 1、Object.call(新this对象, 实参1, 实参2, 实参3…)</li>
            <li> 2、Object.apply(新this对象, [实参1, 实参2, 实参3…])</li>
        </ul>
        <h2> 二、call、apply 的用法</h2>
        1、间接调用函数，改变函数作用域的this指向
        <vue-code>
            <pre lang="js">
function foo() {
        console.log(this)
}
foo.apply('这里是 apply 改变的 this 值') // 这里是 apply 改变的 this 值
foo.call('这里是 call 改变的 this 值') // 这里是 call 改变的 this 值
    </pre>
        </vue-code>
        实质上是 call 将 foo 中this的指向改为 bar，并调用了该函数。call 和 apply 对应的第一个参数就是this，如果不传或者传 null、undefined 时，this指向window。

        2、劫持其他对象的方法
        实现方法见上一个用法举例中的代码。

        <vue-code>
            <pre lang="js">
var foo = {
    name: '张三',
    logName: function() {
        console.log(this.name)
    }
}

var bar = {
    name: '李四'
}

foo.logName.call(bar) // 李四
           </pre>
        </vue-code>
        3、两个函数实现继承
        <vue-code>
            <pre lang="js">
function Animal(name) {
    this.name = name
    this.showName = function() {
        consloe.log(this.name)
    }
}

function Cat(name) {
    Animal.call(this, name)
}

var cat = new Cat('Black Cat')
cat.showName() // Black Cat
            </pre>
        </vue-code>
        4、为类数组（arguments、nodeList）添加数组方法，如 push、filter、pop 等：
        <vue-code>
            <pre lang="js"> function argumentsFunc() {
            Array.prototype.push.call(arguments, '王五')
            console.log(arguments) // ['张三', '李四', '王五']
        }

        argumentsFunc('张三', '李四')
           </pre>
        </vue-code>
        这里也出现了另一个知识点，即当方法没有定义接收数据的参数，但调用方法时传递了参数，如何在方法内使用传递过来的数据。这里可以使用arguments进行接收，arguments 属于类数组，document.getElementByName(‘className’) 拿到的 nodeList 也是类数组。

        5、合并数组
        <vue-code>
            <pre lang="js">let arr1 = [1, 2, 3]
        let arr2 = [4, 5, 6]
        Array.prototype.push.apply(arr1, arr2)
        console.log(arr1) // [1, 2, 3, 4, 5, 6]
            </pre>
        </vue-code>
        6、求数组最大值
        <vue-code>
            <pre lang="js">let arr3 = [7, 8, 9]
        console.log(Math.max.apply(null, arr3)) // 9
        </pre>
        </vue-code>
        7、判断字符类型
        <vue-code>
            <pre lang="js">
        Object.prototype.toString.call({}) // '[object Object]'
        Object.prototype.toString.call([]) // '[object Array]'
        Object.prototype.toString.call('') // '[object String]'
            </pre>
        </vue-code>
        <h2> 三、bind</h2>
        bind 以后 fooNewBind 重新绑定了方法内部的this指向，此时不会调用方法，不兼容 IE8。
        var name = '李四'
        var foo = {
        name: '张三',
        logName: function(age) {
        console.log(this.name, age)
        }
        }

        var fooNew = foo.logName
        var fooNewBind = foo.logName.bind(foo)

        fooNew(10) // 李四 10
        fooNewBind(11) // 张三 11
        此时如果bind换成 call 或者 apply 的话，就需要再加上age参数，且会调用方法。

        <h2>四、三者异同</h2>
        <ul>
            <li>同：都是改变函数的this指向，都可接收参数</li>
            <li>异：bind 和 call 是接收单个参数，apply 是接收数组</li>
        </ul>

    </el-main>
</template>