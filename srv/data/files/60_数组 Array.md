# 数组 Array


## 基础

### map
> array.map(function(currentValue, index, arr), thisValue)

map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
map() 方法按照原始数组元素顺序依次处理元素。

```js
let list = [3, 5, 2, 15, 4, 0, 7, 56, 48, 14, 43, -10];

list.map(String);
// [ '3',  '5',  '2', '15', '4',  '0', '7',  '56', '48', '14', '43', '-10']

list.map(x => x > 0);
// [true, true, true, true, true, false, true, true, true, true, true, false]
```
:::warning
 map() 不会对空数组进行检测。
 map() 不会改变原始数组。
:::

### reduce
> array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

`reduce()`方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
`reduce()`可以作为一个高阶函数，用于函数的 compose。
:::warning
reduce() 对于空数组是不会执行回调函数的。
:::
```js
let list = [3, 5, 2, 15, 4, 0, 7, 56, 48, 14, 43, -10];
let result = list.reduce((t, c) => t + c);
//187
```

### filter
> array.filter(function(currentValue, index, arr), thisValue)

filter() 方法创建一个新的数组，新数组中的元素是, 通过检查指定数组中符合条件的所有元素。

```js
let list = [3, 5, 2, 15, 4, 0, 7, 56, 48, 14, 43, -10];

let result = list.filter(x => x > 0);
console.log(result);
// [3, 5, 2, 15, 4, 7, 56, 48, 14, 43]
console.log(list);
// [3, 5, 2, 15, 4, 0, 7, 56, 48, 14, 43, -10]
```
:::warning
 map() 不会对空数组进行检测。
 map() 不会改变原始数组。
:::

### sort
> array.sort(sortby)

用于对数组的元素进行排序。
返回对数组的引用。只在原数组上进行排序，不生成副本。
```js
list.sort((a, b) => a - b); // 正序
//[-10, 0, 2, 3, 4, 5, 7, 14, 15, 43, 48, 56]

list.sort((a, b) => b - a); // 倒序
//[56, 48, 43, 15, 14, 7, 5, 4, 3, 2, 0, -10]
```
英文字符串排序
```js
list.sort((a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
});
```




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

## 删除、去重

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

## 排序

### 普通排序(Sort)
```js
list.sort((a, b) => a - b); // 正序
list.sort((a, b) => b - a); // 倒序
```

### 冒泡排序(Bubble Sort)
冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
这个算法的名字由来, 是因为越小的元素会经由交换慢慢“浮”到数列的顶端。 
![冒泡排序(Bubble Sort)](/assets/array/1_bubble_sort.gif)
1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
3. 针对所有的元素重复以上的步骤，除了最后一个；
4. 重复步骤1~3，直到排序完成。
```js
function sort(list) {
    for (let k = 0; k < list.length; k++) {
        for (let i = 0; i < list.length - 1; i++) {
            if (list[i] > list[i + 1]) {
                let temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp;
            }
        }
    }
}
```

### 选择排序(Selection Sort)
选择排序是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。 
![选择排序(Selection Sort)](/assets/array/2_selection_sort.gif)

==n==个记录的直接可经过==n-1==趟直接得到有序结果。

```js
function sort(list) {
    let index = 0; //最小数的索引
    // 待排序数组
    for (let k = 0; k < list.length; k++) {
        index = k;
        // 未排序序列
        for (let i = k + 1; i < list.length; i++) {
            if (list[i] < list[index]) {
                index = i;
            }
        }

        let temp = list[index]; //最小的数
        list[index] = list[k];
        list[k] = temp;
    }
}
```
表现最稳定的排序算法之一，因为无论什么数据进去都是O(n2)的时间复杂度，所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。

### 插入排序(Insertion Sort)
插入排序的算法是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

![插入排序(Insertion Sort)](/assets/array/3_insertion_sort.gif)



--- 
[十大经典排序算法](https://www.cnblogs.com/onepixel/articles/7674659.html)