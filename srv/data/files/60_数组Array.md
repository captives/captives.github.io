# 数组Array

## 数据交换

### 普通做法
就是引入临时变量tmp,适用范围广；是最简单、直观、也是最高效的；但是，会增加内存的使用。
```js
function exchange(a, b) {
    let c = a;
    a = b;
    b = c;
    return [a, b];
}
```

### 算术运算
适用范围，仅支持数字；
通过算术运算过程中的技巧，可以巧妙地将两个值进行互换。但是，有个缺点就是变量数据溢出。因为JavaScript能存储数字的精度范围是-253到253。所以，加法运算，会存在溢出的问题。
方式一：
```js
function exchange(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return [a, b];
}

```
方式二：
```js
function exchange(a, b) {
     a = b - a + (b = a); //等价于方式三
    return [a, b];
}

```
方式三：
```js
function exchange(a, b) {
    let c = b;
    b = a;
    a = c - a + b;
    return [a, b];
}
```
### 数组方式
```js
function exchange(a, b) {
    a = [a, b]; 
    b = a[0];
    a = a[1];
    return [a, b];
}
```
等价于
```js
function exchange(a, b) {
    a = [b, b = a][0];
    return [a, b];
}
```
### 对象方式
和数组方式类似，利用对象的键值对进行数据交换。
```js
function exchange(a, b) {
    a = { a: b, b: a };
    b = a.b;
    a = a.a;
    return [a, b]; 
}
```

### ES6解构
用解构的语法特性，一次性解决，简单暴力，哈哈哈~
更重要的一点：解构语法还适用于其他类型的变量进行互换。所以，用解构可以很easy地进行互换。
```js
function exchange(a, b) {
    [a, b] = [b, a];
    return [a, b];
}
console.log(exchange(3, 6)); //[6, 3]
```

### 异或操作
巧用位运算的技巧，利用 a ^ b ^ b == a 的特点，进行数值交换，避免了使用算术运算带来的弊端，不会发生溢出问题。
```js
function exchange(a, b) {
    a ^= b;
    b ^= a;
    a ^= b;
    return [a, b];
}
```
或者
```js
function exchange(a, b) {
    a = (b = (a ^= b) ^ b) ^ a;
    return [a, b];
}
```


## 排序

## 去重

### 正序去重复
```js
const list = [2, 1, 3, 45, 5, 4, 3, 2, 4, 5];

function distinct(list) {
    for (let i = 0; i < list.length; i++) {
        //如果有相同的值,不同的索引,删除当前数据
        if (list.indexOf(list[i]) != i) {
            list.splice(i, 1);
            i--; //删除后索引回退
        }
    }
    return list;
}

console.log(distinct(list)); //[ 2, 1, 3, 45, 5, 4 ]
```

### 倒序去重复
```js
const list = [2, 1, 3, 45, 5, 4, 3, 2, 4, 5];
function distinct(list) {
    for (let i = list.length - 1; i >= 0; i--) {
        //如果有相同的值,不同的索引,删除当前数据
        if (list.indexOf(list[i]) != i) {
            list.splice(i, 1);
        }
    }
    return list;
}

console.log(distinct(list)); //[ 2, 1, 3, 45, 5, 4 ]
```

## 删除


## 排序
### 普通排序
```js
list.sort((a, b) => a - b); // 正序
list.sort((a, b) => b - a); // 倒序
```