# 数组

## 检索
### _.indexOf(array, value, [fromIndex = 0])
:::more 参数
- array (Array): 需要查找的数组。
- value (*): 需要查找的值。
- [fromIndex=0] (number): 开始查询的位置。
返回值
- (number): 返回 值value在数组中的索引位置, 没有找到为返回-1。
:::
使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero) 等值比较，返回首次`value`在数组`array`中被找到的索引值， 如果`fromIndex`为负值，将从数组`array`尾端索引进行匹配。
```js
_.indexOf([1, 2, 1, 2], 2);
// => 1
 
// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3

```

### _.findIndex(array, [predicate = _.identity], [fromIndex=0])
:::more 参数
- array (Array): 要搜索的数组。
- [predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
- [fromIndex=0] (number): The index to search from.

返回值
- (number): 返回找到元素的 索引值（index），否则返回 -1
:::

该方法类似`_.find`，区别是该方法返回第一个通过`predicate`判断为真值的元素的索引值（index），而不是元素本身。
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.findIndex(users, item => item.user == 'barney');
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```

### _.findLastIndex(array, [predicate = _.identity], [fromIndex=array.length-1])
:::more 参数
- array (Array): 要搜索的数组。
- [predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
- [fromIndex=array.length-1] (number): The index to search from.

返回值
- (number): 返回找到元素的 索引值（index），否则返回 -1
:::
这个方式类似`_.findIndex`，区别是它是从右到左的迭代集合array中的元素。
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2
 
// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0
 
// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2
 
// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0
```

### _.lastIndexOf(array, value, [fromIndex=array.length-1])
这个方法类似`_.indexOf`，区别是它是从右到左遍历`array`的元素。
::: more 参数
- array (Array): 要搜索的数组。
- value (*): 要搜索的值。
- [fromIndex=array.length-1] (number): 开始搜索的索引值。

返回值
- (number): 返回匹配值的索引值，否则返回 -1。
:::
```
_.lastIndexOf([1, 2, 1, 2], 2);
// => 3
 
// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1
```


### _.head(array)
获取数组 array 的第一个元素。
```js
_.head([1, 2, 3]);
// => 1
 
_.head([]);
// => undefined
```

### _.last(array)
获取array中的最后一个元素。
```js
_.last([1, 2, 3]);
// => 3
```

### _.initial(array)
获取数组`array`中除了最后一个元素之外的所有元素（去除数组array中的最后一个元素）。
```js
_.initial([1, 2, 3]);
// => [1, 2]
```

### _.tail(array)
返回 array 数组的切片，除了array数组第一个元素以外的全部元素。
```js
_.tail([1, 2, 3]);
// => [2, 3]
```

### _.nth(array, [n=0])
获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
```js 
var array = ['a', 'b', 'c', 'd'];
 
_.nth(array, 1);
// => 'b'
 
_.nth(array, -2);
// => 'c';
```


### _.take(array, [n=1])
创建一个数组切片，从array数组的起始元素开始提取n个元素。
```js
_.take([1, 2, 3]);
// => [1]
 
_.take([1, 2, 3], 2);
// => [1, 2]
 
_.take([1, 2, 3], 5);
// => [1, 2, 3]
 
_.take([1, 2, 3], 0);
// => []
```

### _.takeRight(array, [n=1])
创建一个数组切片，从array数组的最后一个元素开始提取n个元素。
```js
_.takeRight([1, 2, 3]);
// => [3]
 
_.takeRight([1, 2, 3], 2);
// => [2, 3]
 
_.takeRight([1, 2, 3], 5);
// => [1, 2, 3]
 
_.takeRight([1, 2, 3], 0);
// => []
```

### _.takeRightWhile(array, [predicate = _.identity])
::: more 参数
- array (Array): 要检索的数组。
- [predicate = _.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
-(Array): 返回 array 数组的切片。
:::
从array数组的最后一个元素开始提取元素，直到`predicate`返回假值。`predicate`会传入三个参数： `(value, index, array)`。
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.takeRightWhile(users, item => !item.active);
// => objects for ['fred', 'pebbles']
 
// The `_.matches` iteratee shorthand.
_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeRightWhile(users, ['active', false]);
// => objects for ['fred', 'pebbles']
 
// The `_.property` iteratee shorthand.
_.takeRightWhile(users, 'active');
// => []
```

### _.takeWhile(array, [predicate = _.identity])
::: more 参数
- array (Array): 要检索的数组。
- [predicate = _.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
-(Array): 返回 array 数组的切片。
:::
从`array`数组的起始元素开始提取元素，直到`predicate`返回假值。`predicate`会传入三个参数：`(value, index, array)`。
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false},
  { 'user': 'pebbles', 'active': true }
];
 
_.takeWhile(users, item => !item.active);
// => objects for ['barney', 'fred']
 
// The `_.matches` iteratee shorthand.
_.takeWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeWhile(users, ['active', false]);
// => objects for ['barney', 'fred']
 
// The `_.property` iteratee shorthand.
_.takeWhile(users, 'active');
// => []
```





### _.slice(array, [start=0], [end=array.length])
:::more 参数
- array (Array): 要裁剪数组。
- [start=0] (number): 开始位置。
- [end=array.length] (number): 结束位置。

返回
- (Array): 返回 数组array 裁剪部分的新数组。
:::

裁剪数组`array`，从`start`位置开始到`end`结束，但不包括`end`本身的位置。

:::info
这个方法用于代替[Array#slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)来确保数组正确返回。
:::
```js
var array = [1, 2, 3, 4];
var evens = _.slice(array, 1, 3);
console.log(array);
// =>  [1, 2, 3, 4]

console.log(evens);
// => [2, 3]
```


## 分组
### _.chunk(array, [size=1])
将数组`array`拆分成多个`size`长度的区块，并将这些区块组成一个新数组。 如果`array`无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```
### _.zip([arrays])
创建一个分组元素的数组，数组的第一个元素包含所有给定数组的第一个元素，数组的第二个元素包含所有给定数组的第二个元素，以此类推。
```js
_.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
```
### _.unzip(array)
这个方法类似于`_.zip`，除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。（返回数组的第一个元素包含所有的输入数组的第一元素，第一个元素包含了所有的输入数组的第二元素，依此类推。）
```js
var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]
 
_.unzip(zipped);
// => [['fred', 'barney'], [30, 40], [true, false]]
```
### _.zipWith([arrays], [iteratee = _.identity])
:::more 参数
- [arrays] (...Array): 要处理的数组。
- [iteratee=_.identity] (Function): 函数用来组合分组的值。

返回
- (Array): 返回分组元素的新数组。
:::
这个方法类似于`_.zip`，不同之处在于它接受一个 iteratee（迭代函数），来 指定分组的值应该如何被组合。 该iteratee调用每个组的元素： (...group).
```js
_.zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c);
// => [111, 222]
```
### _.unzipWith(array, [iteratee = _.identity])
:::more 参数
- [arrays] (...Array): 要处理的数组。
- [iteratee=_.identity] (Function): 函数用来组合分组的值。

返回
- (Array): 返回分组元素的新数组。
:::
此方法类似于`_.unzip`，除了它接受一个iteratee指定重组值应该如何被组合。iteratee 调用时会传入每个分组的值： (...group)。
```js
var zipped = _.zip([1, 2], [10, 20], [100, 200]);
// => [[1, 10, 100], [2, 20, 200]]
 
_.unzipWith(zipped, _.add);
// => [3, 30, 300]
```



## 合并
### _.join(array, [separator=','])
将 array 中的所有元素转换为由 separator 分隔的字符串
```js
_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'
```

### _.concat(array, [values])
创建一个新数组，将`array`与任何数组 或 值连接在一起。
```js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
```

### _.union([arrays])
创建一个按顺序返回一个新的联合数组,并且数组的元素是唯一的。所有给定数组的元素值使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)做等值比较。
```js
_.union([2], [1, 2], [3])
// => [2, 1, 3]
```
### _.unionBy([arrays], [iteratee = _.identity])
这个方法类似[_.union](https://www.lodashjs.com/docs/lodash.union)，除了它接受一个`iteratee`（迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 会传入一个参数：(value)。
```js
_.unionBy([2.1], [1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```

### _.unionWith([arrays], [comparator])
:::more 参数
- [arrays] (...Array): 要检查的数组。
- [comparator] (Function): 比较函数，调用每个元素。

返回
- (Array): 返回一个新的联合数组。
:::
这个方法类似[_.union](https://www.lodashjs.com/docs/lodash.union)，除了它接受一个`comparator`调用比较`arrays`数组的每一个元素。`comparator`调用时会传入2个参数：`(arrVal, othVal)`。
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.unionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```



## 过滤

### _.difference(array, [values])
创建一个具有唯一`array`值的数组，每个值不包含在其他给定的数组中。该方法使用SameValueZero做相等比较。结果值是从第一数组中选择, 顺序是由第一个数组中的顺序确定。
:::warning 注意：
创建一个新数组，这个数组中的值，为第一个参数（array）排除了给定数组中的值。
:::
```js
_.difference([3, 2, 1], [4, 2]);
// => [3, 1]
```

### _.differenceBy(array, [values], [iteratee = _.identity])
::: more 参数
- array (Array): 要检查的数组。
- [values] (...Array): 排除的值。
- [iteratee=_.identity] (Array|Function|Object|string): iteratee 调用每个元素。
 
返回：
(Array): 返回一个过滤值后的新数组。
:::
这个方法类似`_.difference` ，增加一个 `iteratee`（注：迭代器）， 调用`array`和`values`中的每个元素以产生比较的标准。 结果值是从第一数组中选择。`iteratee`会调用一个参数：(value)。
> 首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值

:::warning 注意：
不像[_.pullAllBy](https://www.lodashjs.com/docs/lodash.differenceBy#pullAllBy)，这个方法会返回一个新数组。
:::

```js
//迭代器把值Math.floor后进行比较，返回的原值
_.differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor);
// => [3.1, 1.3]
 
// 指定对象属性排除
_.differenceBy([{ 'x': 2, 'y': 3 }, { 'x': 1, 'y': 3 }], [{ 'x': 1 }], 'x')
// => [{x: 2, y: 3}]

_.differenceBy([{ 'x': 2, 'y': 3 }, { 'x': 1, 'y': 3 }], [{ 'x': 1 }], 'x')
// => [{x: 2, y: 3}, { 'x': 1, 'y': 3 }]
```


### _.differenceWith(array, [values], [comparator])
:::more 参数
- array (Array): 要检查的数组。
- [values] (...Array): 排除的值。
- [comparator] (Function): comparator 调用每个元素。

返回值
- 返回一个过滤值后的新数组。
:::
这个方法类似`_.difference`，除了它接受一个`comparator`（比较器），它调用比较`array`，`values`中的元素。 结果值是从第一数组中选择。`comparator`调用参数有两个：`(arrVal, othVal)`。
:::warning 注意：
不像[_.pullAllWith](https://www.lodashjs.com/docs/lodash.differenceWith#pullAllWith)，这个方法会返回一个新数组。
:::
```js

_.differenceWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]

_.differenceWith([{ 'x': 1, 'y': 2, 'z': 4 }, { 'x': 2, 'y': 1}], [{ 'x': 1, 'y': 2 }], _.isEqual)
// => [{ 'x': 1, 'y': 2, 'z': 4 }, { 'x': 2, 'y': 1}]
```

### _.compact(array)
创建一个新数组，包含原数组中所有的非假值元素。例如`false`, `null`, `0`, `""`, `undefined`, `NaN` 等都是被认为是“假值”
```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

### _.intersection([arrays])
创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)进行相等性比较。（可以理解为给定数组的交集）
```js
_.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```
### _.intersectionBy([arrays], [iteratee = _.identity])
这个方法类似`_.intersection`，区别是它接受一个`iteratee`调用每一个`arrays`的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。`iteratee`会传入一个参数：`(value)`。
```js
//迭代器把值Math.floor后进行比较，返回的原值
_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]
 
// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
```

### _.intersectionWith([arrays], [comparator])
:::more 参数
- [arrays] (...Array): 待检查的数组。
- [comparator] (Function): comparator（比较器）调用每个元素。

返回值
- (Array): 返回一个包含所有传入数组交集元素的新数组。
:::
这个方法类似`_.intersection`，区别是它接受一个`comparator`调用比较`arrays`中的元素。结果值是从第一数组中选择。`comparator`会传入两个参数:`(arrVal, othVal)`。
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]
```

## 移除


### _.remove(array, [predicate = _.identity])

:::more 参数
- array (Array): 要修改的数组。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (Array): 返回移除元素组成的新数组。
:::

移除数组中`predicate`（断言）返回为真值的所有元素，并返回移除元素组成的数组。`predicate`（断言）会传入3个参数：`(value, index, array)`。

::: warning 注意：
和[_.filter](https://www.lodashjs.com/docs/lodash.filter)不同, 这个方法会改变数组`array`。使用[_.pull](https://www.lodashjs.com/docs/lodash.pull)来根据提供的`value`值从数组中移除元素。
:::
```js
var array = [1, 2, 3, 4];
var evens = _.remove(array, n => n % 2 == 0);
 
console.log(array);
// => [1, 3]
 
console.log(evens);
// => [2, 4]
```

### _.drop(array, [n=1])
:::more 参数
- array (Array): 要查询的数组。
- [n=1] (number): 要去除的元素个数。

返回值
- (Array): 返回array剩余切片。
:::
创建一个切片数组，去除array前面的n个元素；n默认值为1。
```js
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```

### _.dropRight(array, [n=1])
创建一个切片数组，去除array尾部的n个元素；n默认值为1。
```js
_.dropRight([1, 2, 3]);
// => [1, 2]
 
_.dropRight([1, 2, 3], 2);
// => [1]
 
_.dropRight([1, 2, 3], 5);
// => []
 
_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```
### _.dropRightWhile(array, [predicate = _.identity])
:::more 参数
- array (Array): 要查询的数组。
- [predicate=_.identity] (Function): 这个函数会在每一次迭代调用。

返回值
- (Array): 返回array剩余切片。
:::
创建一个切片数组，去除array中从`predicate`返回值开始到尾部的部分。`predicate`会传入3个参数： `(value, index, array)`。
```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['barney']
 
// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ['active', false]);
// => objects for ['barney']
 
// The `_.property` iteratee shorthand.
_.dropRightWhile(users, 'active')
=>  objects for ['barney', 'fred', 'pebbles']

_.isEqual(_.dropRightWhile(users, 'active'), users);
// => true
```

### _.dropWhile(array, [predicate = _.identity])
:::more 参数
- array (Array): 要查询的数组。
- [predicate=_.identity] (Function): 这个函数会在每一次迭代调用。

返回值
- (Array): 返回array剩余切片。
:::
创建一个切片数组，去除array中从起点开始到`predicate`返回值结束部分。`predicate`会传入3个参数：`(value, index, array)`。
```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']
 
// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']
 
// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']

_.isEqual(_.dropWhile(users, 'active'), users);
// => true
```

### _.pull(array, [values])
移除数组`array`中所有和给定值相等的元素，使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)进行全等比较。
:::warning 注意： 
和[_.without](https://www.lodashjs.com/docs/lodash.without) 方法不同，这个方法会改变数组。使用[_.remove](https://www.lodashjs.com/docs/lodash.remove) 从一个数组中移除元素。
:::
```js
var array = [1, 2, 3, 1, 2, 3];
 
_.pull(array, 2, 3);
console.log(array);
// => [1, 1]
```

### _.pullAll(array, values)
这个方法类似[_.pull](https://www.lodashjs.com/docs/lodash.pull)，区别是这个方法接收一个要移除值的数组。
:::warning 注意： 
不同于[_.difference](https://www.lodashjs.com/docs/lodash.difference), 这个方法会改变数组`array`
:::
```js
var array = [1, 2, 3, 1, 2, 3];
 
_.pullAll(array, [2, 3]);
console.log(array);
// => [1, 1]
```
### _.pullAllBy(array, values, [iteratee = _.identity])
:::more 参数
- array (Array): 要修改的数组。
- values (Array): 要移除值的数组。
- [iteratee=_.identity] (Array|Function|Object|string): iteratee（迭代器）调用每个元素。

返回值
- (Array): 返回 array.
:::
这个方法类似于[_.pullAll](https://www.lodashjs.com/docs/lodash.pullAll) ，区别是这个方法接受一个 `iteratee`（迭代函数） 调用`array`和`values`的每个值以产生一个值，通过产生的值进行了比较。`iteratee`会传入一个参数：`(value)`。
::: warning 注意： 
不同于[_.differenceBy](https://www.lodashjs.com/docs/lodash.differenceBy), 这个方法会改变数组 `array`
:::
```js
var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 
_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
console.log(array);
// => [{ 'x': 2 }]
```

### _.pullAllWith(array, values, [comparator])
:::more 参数
- array (Array): 要修改的数组。
- values (Array): 要移除值的数组。
- [comparator] (Function): comparator（比较器）调用每个元素。

返回值
- (Array): 返回 array。
:::

这个方法类似于[_.pullAll](https://www.lodashjs.com/docs/lodash.pullAll)，区别是这个方法接受 `comparator`调用`array`中的元素和`values`比较。`comparator`会传入两个参数：`(arrVal, othVal)`。

::: warning 注意： 
不同于[_.differenceWith](https://www.lodashjs.com/docs/lodash.differenceWith), 这个方法会改变数组 `array`
:::

```js
var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 
_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```

### _.pullAt(array, [indexes])
:::more 参数
- array (Array): 要修改的数组。
- [indexes] (...(number|number[])): 要移除元素的索引。

返回值
- (Array): 返回移除元素组成的新数组。
:::
根据索引`indexes`，移除`array`中对应的元素，并返回被移除元素的数组。

:::warning 注意：
和 [_.at](https://www.lodashjs.com/docs/lodash.at)不同, 这个方法会改变数组 array。
:::

```js
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);
 
console.log(array);
// => [5, 15]
 
console.log(evens);
// => [10, 20]
```

### _.without(array, [values])
创建一个剔除所有给定值的新数组，剔除值的时候，使用SameValueZero[^1]做相等比较。
:::warning 注意:
不像[_.pull](https://www.lodashjs.com/docs/lodash.pull), 这个方法会返回一个新数组。
:::






## 增加

### _.fill(array, value, [start=0], [end = array.length])
:::more 参数
- array (Array): 要填充改变的数组。
- value (*): 填充给 array 的值。
- [start=0] (number): 开始位置（默认0）。
- [end=array.length] (number):结束位置（默认array.length）。

返回值
- (Array): 返回 array。
:::
使用`value`值来填充（替换）`array`，从`start`位置开始, 到`end`位置结束（但不包含end位置）
:::warning
这个方法会改变`array`(不是创建新数组）
:::
```js
var array = [1, 2, 3];
 
_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']
 
_.fill(Array(3), 2);
// => [2, 2, 2]
 
_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```


## 排序

### _.sortedIndex(array, value)
使用二进制的方式检索，来决定`value`值应该插入到数组中尽可能小的索引位置，以保证array的排序。
```js
_.sortedIndex([1, 2, 4], 3);
// => 2
```

### _.sortedIndexBy(array, value, [iteratee = _.identity])
:::more 参数
- array (Array): 要检查的排序数组。
- value (*): 要评估的值。
- [iteratee=_.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。

返回
- (number): 返回 value值 应该在数组array中插入的索引位置 index。
:::

这个方法类似[_.sortedIndex](https://www.lodashjs.com/docs/lodash.sortedIndex)，除了它接受一个`iteratee`（迭代函数），调用每一个数组（array）元素，返回结果和value 值比较来计算排序。iteratee 会传入一个参数：(value)。
```js
var array = [{ 'x': 3 }, { 'x': 4 }, { 'x': 5 }, { 'x': 6 }];

_.sortedIndexBy(array, { 'x': 4 }, item => item.x);
// => 1

// The `_.property` iteratee shorthand.
_.sortedIndexBy(array, { 'x': 4 }, 'x');
// => 1
```

### _.sortedIndexOf(array, value)
这个方法类似[_.indexOf](https://www.lodashjs.com/docs/lodash.indexOf)，除了它是在已经排序的数组	`array`上执行二进制检索。
```js
_.sortedIndexOf([4, 5, 5, 5, 6], 5);
// => 1
```

### _.sortedLastIndex(array, value)
此方法类似于[_.sortedIndex](https://www.lodashjs.com/docs/lodash.sortedIndex)，除了它返回`value`值在`array`中尽可能大的索引位置（index）。
```js
_.sortedLastIndex([4, 5, 5, 5, 6], 5);
// => 4
```


### _.sortedLastIndexBy(array, value, [iteratee = _.identity])
:::more 参数
- array (Array): 要检查的排序数组。
- value (*): 要评估的值。
- [iteratee = _.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。

返回
- (number): 返回 value值 应该在数组array中插入的索引位置 index。
:::
这个方法类似[_.sortedLastIndex](https://www.lodashjs.com/docs/lodash.sortedLastIndex) ，除了它接受一个`iteratee`（迭代函数），调用每一个数组`array`元素，返回结果和`value`值比较来计算排序。`iteratee `会传入一个参数：`value`。

```js
var array = [{ 'x': 3 }, { 'x': 4 }, { 'x': 5 }, { 'x': 6 }];

_.sortedLastIndexBy(array, { 'x': 4 }, item => item.x);
// => 2

// The `_.property` iteratee shorthand.
_.sortedLastIndexBy(array, { 'x': 4 }, 'x');
// => 2
```

### _.sortedLastIndexOf(array, value)
这个方法类似[_.lastIndexOf](https://www.lodashjs.com/docs/lodash.lastIndexOf)，除了它是在已经排序的数组array上执行二进制检索。
```js
_.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
// => 3
```

### _.sortedUniq(array)
这个方法类似[_.uniq](https://www.lodashjs.com/docs/lodash.uniq)；它会优化排序数组，返回一个新的不重复的数组。
```js
_.sortedUniq([1, 1, 2]);
// => [1, 2]
```

### _.sortedUniqBy(array, [iteratee])
这个方法类似[_.uniqBy](https://www.lodashjs.com/docs/lodash.uniqBy)；它会优化排序数组，返回一个新的不重复的数组。
```js
_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
// => [1.1, 2.3]
```

## 去重

### _.uniq(array)
返回一个去重后的array数组副本。使用了SameValueZero[^1] 做等值比较。只有第一次出现的元素才会被保留。
```js
_.uniq([2, 1, 2]);
// => [2, 1]
```
### _.uniqBy(array, [iteratee = _.identity])
这个方法类似_.uniq ，除了它接受一个 iteratee（迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 调用时会传入一个参数：(value)。
```js
_.uniqBy([2.1, 1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
### _.uniqWith(array, [comparator])
这个方法类似_.uniq， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： (arrVal, othVal)。
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```
### _.xor([arrays])
创建一个给定数组唯一值的数组，使用symmetric difference[^2]做等值比较。
返回一个值的顺序取决于他们数组的出现顺序。
```js
_.xor([2, 1], [2, 3]);
// => [1, 3]
```
### _.xorBy([arrays], [iteratee = _.identity])
:::more 参数
- [arrays] (...Array): 要检查的数组。
- [iteratee=_.identity] (Array|Function|Object|string): 调用每一个元素的迭代函数。

返回
- (Array): 返回过滤值后的新数组。
:::
这个方法类似`_.xor`，除了它接受 iteratee（迭代器），这个迭代器 调用每一个 arrays（数组）的每一个值，以生成比较的新值。iteratee 调用一个参数：(value).
```js
_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2, 3.4]
 
// The `_.property` iteratee shorthand.
_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
### _.xorWith([arrays], [comparator])
该方法是像`_.xor`，除了它接受一个`comparator`，以调用比较数组的元素。
`comparator`调用2个参数：`(arrVal, othVal)`.
```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.xorWith(objects, others, _.isEqual);
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
```



## 转换

### _.reverse(array)
反转`array`，使得第一个元素变为最后一个元素，第二个元素变为倒数第二个元素，依次类推。
:::warning 注意：
这个方法会改变原数组`array`，基于[Array#reverse](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse).
:::
```js
var array = [1, 2, 3];
 
_.reverse(array);
// => [3, 2, 1]
 
console.log(array);
// => [3, 2, 1]
```




### _.flatten(array)
减少一级array嵌套深度。
```js
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```

### _.flattenDeep(array)
将array递归为一维数组。
```js
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```

### _.flattenDepth(array, [depth=1])
根据 depth 递归减少`array`的嵌套层级。
```js
var array = [1, [2, [3, [4]], 5]];
 
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
 
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

### _.fromPairs(pairs)
与[_.toPairs](https://www.lodashjs.com/docs/lodash.toPairs)正好相反；这个方法返回一个由键值对pairs构成的对象。
```js
_.fromPairs([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }
```
### _.zipObject([props=[]], [values=[]])
这个方法类似`_.fromPairs`，除了它接受2个数组，第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。
```js
_.zipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }
```
### _.zipObjectDeep([props=[]], [values=[]])
这个方法类似`_.zipObject`，除了它支持属性路径。
```js
_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
```


[^1]:[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)

[^2]:[symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)

<hr/>
