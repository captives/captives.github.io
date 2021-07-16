# 集合

## 创建

### _.sample(collection)
从`collection`（集合）中获得一个随机元素。
```js
_.sample([1, 2, 3, 4]);
// => 2
```
### _.sampleSize(collection, [n = 1])
:::more 参数
- collection (Array|Object): 要取样的集合。
- [n=1] (number): 取样的元素个数。

返回
- (Array): 返回随机元素。
:::
从`collection`中获得`n`个随机元素。
```js
_.sampleSize([1, 2, 3], 2);
// => [3, 1]
 
_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```

### _.shuffle(collection)
:::more 参数
- collection (Array|Object): 要打乱的集合。

返回
- (Array): 返回打乱的新数组。
:::
创建一个被打乱值的集合。 使用[Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle)版本。
```js
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

### _.countBy(collection, [iteratee = _.identity])
创建一个组成对象；
key（键）是经过 iteratee（迭代函数）执行处理`collection`中每个元素后返回的结果；
每个key（键）对应的`value`值：是`iteratee(value)`（迭代函数）返回该key（键）的迭代次数。
```js
_.countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }
 
// The `_.property` iteratee shorthand.
_.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```

### _.sortBy(collection, [iteratees = [ _.identity ] ])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [iteratees=[_.identity]] (...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])): 这个函数决定排序。

返回
- (Array): 返回排序后的数组。
:::
创建一个元素数组。
以`iteratee(value)`处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。
```js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];
 
_.sortBy(users, item => item.user);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 
_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 
_.sortBy(users, 'user', item => Math.floor(item.age / 10));
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

### _.orderBy(collection, [iteratees=[ _.identity ] ], [ orders ])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [iteratees=[_.identity]] (Array[]|Function[]|Object[]|string[]): 排序的迭代函数。
- [orders] (string[]): iteratees迭代函数的排序顺序。

返回
- (Array): 排序排序后的新数组。
:::
此方法类似于`_.sortBy`，除了它允许指定`iteratee`（迭代函数）结果如何排序。 如果没指定orders，以默认值"asc" 升序；否则为"desc" 降序排序对应值。
```js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// 以 `user` 升序排序 再  `age` 以降序排序。
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => [{"user":"barney","age":36},{"user":"barney","age":34},{"user":"fred","age":48},{"user":"fred","age":40}]
```
### _.groupBy(collection, [iteratee = _.identity])
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。

返回
- (Object): 返回一个组成聚合的对象。
:::
创建一个对象;
`key`是`iteratee(value)`遍历`collectio`中的每个元素返回的结果。 分组值的顺序是由他们出现在`collection`中的顺序确定的。每个键对应的值负责生成`key`的元素组成的数组。
```js
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
 
// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

### _.keyBy(collection, [iteratee = _.identity])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。

返回
- (Object): 返回一个组成聚合的对象。
:::

创建一个对象; 组成`key`是`collection`中的每个元素经过`iteratee(value)`处理后返回的结果。 每个`key`对应的值是生成`key`的最后一个元素。
```js
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];
 
_.keyBy(array, function(o) {
  return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 
_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
```


## 遍历
### _.forEach(collection, [iteratee = _.identity])
> 别名 _.each
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [iteratee=_.identity] (Function): 每次迭代调用的函数。

返回
- (*): 返回集合 collection。
:::

调用`iteratee`遍历`collection`(集合)中的每个元素，`iteratee`调用3个参数： `(value, index|key, collection)`。 如果迭代函数`iteratee`显式的返回false，迭代会提前退出。

:::warning 注意: 
与其他"集合"方法一样，类似于数组，对象的 "length" 属性也会被遍历。
想避免这种情况，可以用[_.forIn](https://www.lodashjs.com/docs/lodash.forIn)或者[_.forOwn](https://www.lodashjs.com/docs/lodash.forOwn)代替。
:::
```js
_([1, 2]).forEach(function(value) {
  console.log(value);
});
// => 顺序输出1、2.
 
_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => 随机输出 a、b，不保证顺序
```

### _.forEachRight(collection, [iteratee = _.identity])
> 别名：_.eachRight
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [iteratee=_.identity] (Function): 每次迭代调用的函数。

返回
- (*): 返回集合 collection。
:::

这个方法类似`_.forEach`，不同之处在于`_.forEachRight`是从右到左遍历集合中每一个元素的。
```js
_.forEachRight([1, 2], function(value) {
  console.log(value);
});
// => 顺序输出1、2.
```
### _.map(collection, [iteratee = _.identity])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (Array): 返回新的映射后数组。
:::
创建一个数组，`value` 是`iteratee(value, index|key, collection)`遍历`collection`中的每个元素后返回的结果。

:::warning 
lodash 中有许多方法是防止作为其他方法的迭代函数。
例如：
_.every, _.filter, _.map, _.mapValues, _.reject和 _.some

注：即不能作为iteratee参数传递给其他方法

受保护的方法有：
ary, chunk, curry, curryRight, drop, dropRight, every,fill, invert, parseInt, random, range, rangeRight, repeat,sampleSize, slice, some, sortBy, split, take, takeRight,template, trim, trimEnd, trimStart, and words

注：即这些方法不能使用 _.every, _.filter, _.map, _.mapValues, _.reject, 和 _.some作为iteratee迭代函数参数
:::
```js
function square(n) {
  return n * n;
}
 
_.map([4, 8], square);
// => [16, 64]
 
_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (iteration order is not guaranteed)
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
// The `_.property` iteratee shorthand.
_.map(users, 'user');
// => ['barney', 'fred']
```

## 检索
### _.includes(collection, value, [fromIndex = 0])
:::more 参数
- collection (Array|Object|string): 要检索的集合。
- value (*): 要检索的值。
- [fromIndex=0] (number): 要检索的 索引位置。

返回
- (boolean): 如果找到 value 返回 true， 否则返回 false。
:::
检查`value`是否在`collection`中。如果`collection`是一个字符串，那么检查`value`(子字符串）是否在字符串中，否则使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)做等值比较。 如果指定`fromIndex`是负数，那么从`collection`的结尾开始检索。
```js
_.includes([1, 2, 3], 1);
// => true
 
_.includes([1, 2, 3], 1, 2);
// => false
 
_.includes({ 'user': 'fred', 'age': 40 }, 'fred');
// => true
 
_.includes('pebbles', 'eb');
// => true
```

### _.every(collection, [predicate = _.identity])
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (boolean): 如果所有元素经 predicate（断言函数） 检查后都都返回真值，那么就返回true，否则返回 false 。
:::
通过`predicate`（断言函数）检查`collection`（集合）中的所有元素是否都返回true。一旦`predicate`（断言函数）返回false，迭代就马上停止。

`predicate(value, index | key, collection)`。

:::warning 注意:
这个方法对于对于[空集合](https://en.wikipedia.org/wiki/Empty_set)返回 true，因为空集合的[任何元素都是true](https://en.wikipedia.org/wiki/Vacuous_truth) 。
:::
```js
_.every([true, 1, null, 'yes'], Boolean);
// => false
 
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false
```

### _.some(collection, [predicate = _.identity])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (boolean): 如果任意元素经 predicate 检查都为 truthy（真值），返回 true ，否则返回 false 。
:::

通过`predicate`（断言函数）检查`collection`（集合）中的元素是否存在**任意** truthy（真值）的元素，一旦`predicate`（断言函数）返回 truthy（真值），遍历就停止。 

`predicate(value, index | key, collection)`。
```js
_.some([null, 0, 'yes', false], Boolean);
// => true
 
var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.some(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.some(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.some(users, 'active');
// => true
```

### _.find(collection, [predicate = _.identity], [fromIndex = 0])
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [predicate = _.identity] (Array|Function|Object|string): 每次迭代调用的函数。
- [fromIndex = 0] (number): 开始搜索的索引位置。

返回
- (*): 返回匹配元素，否则返回 undefined。
:::

遍历`collection`（集合）元素，返回`predicate`（断言函数）第一个返回true的第一个元素。

`predicate(value, index | key, collection)`
```js
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
_.find(users, item => item.age < 40);
// => object for 'barney'
 
// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]);
// => object for 'fred'
 
// The `_.property` iteratee shorthand.
_.find(users, 'active');
// => object for 'barney'
```
### _.findLast(collection, [predicate = _.identity], [fromIndex = collection.length - 1])
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
- [fromIndex=collection.length-1] (number): 开始搜索的索引位置。

返回
- (*): 返回匹配元素，否则返回 undefined。
:::
这个方法类似`_.find`，不同之处在于，`_.findLast`是从右至左遍历`collection`元素的。

```js
_.findLast([1, 2, 3, 4], n => n % 2 == 1);
// => 3
```




## 过滤
### _.filter(collection, [predicate = _.identity])
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (Array): 返回一个新的过滤后的数组。
:::
遍历`collection`（集合）元素，返回`predicate`（断言函数）返回true的所有元素的数组。 

`predicate(value, index | key, collection)`
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']
 
// The `_.property` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']
```

### _.reject(collection, [predicate = _.identity])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (Array): 返回过滤后的新数组
:::
`_.filter`的反向方法;
此方法通过`predicate`（断言函数）不返回 `truthy`（真值）的`collection`元素（注释：非真）。
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];
 
_.reject(users, item => item.active);
// => objects for ['fred']
 
// `_.matches` 迭代简写
_.reject(users, { 'age': 40, 'active': true });
// => objects for ['barney']
 
// `_.matchesProperty` 迭代简写
_.reject(users, ['active', false]);
// => objects for ['fred']
 
// `_.property` 迭代简写
_.reject(users, 'active');
// => objects for ['barney']
```

### _.partition(collection, [predicate = _.identity])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (Array): 返回元素分组后的数组。
:::
创建一个分成两组的元素数组，第一组包含`predicate(value)`（断言函数）返回为 `truthy`（真值）的元素，第二组包含`predicate`返回为`falsey`的元素。
```js
var users = [
  { 'user': 'barney',  'age': 36, 'active': false },
  { 'user': 'fred',    'age': 40, 'active': true },
  { 'user': 'pebbles', 'age': 1,  'active': false }
];
 
_.partition(users, item => item.active);
// => objects for [['fred'], ['barney', 'pebbles']]
 
// The `_.matches` iteratee shorthand.
_.partition(users, { 'age': 1, 'active': false });
// => objects for [['pebbles'], ['barney', 'fred']]
 
// The `_.matchesProperty` iteratee shorthand.
_.partition(users, ['active', false]);
// => objects for [['barney', 'pebbles'], ['fred']]
 
// The `_.property` iteratee shorthand.
_.partition(users, 'active');
// => objects for [['fred'], ['barney', 'pebbles']]
```

## 转换
### _.flatMap(collection, [iteratee = _.identity])
:::more 参数
- collection (Array|Object): 一个用来迭代遍历的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (Array): 返回新扁平化数组。
:::
创建一个**扁平化**（同阶数组）的数组，这个数组的值来自`collection`中每一个值经过`iteratee(value, index | key, collection)`处理后返回的结果，并且扁平化合并。 
```js
function duplicate(n) {
  return [n, n];
}
 
_.flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]
```

### _.flatMapDeep(collection, [iteratee = _.identity])
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
- (Array): 返回新扁平化数组。
:::
这个方法类似`_.flatMap`不同之处在于，`_.flatMapDeep`会继续扁平化递归映射的结果。
```js
function duplicate(n) {
  return [[[n, n]]];
}
 
_.flatMapDeep([1, 2], duplicate);
// => [1, 1, 2, 2]
```
### _.flatMapDepth(collection, [iteratee = _.identity], [depth = 1])
:::more 参数
- collection (Array|Object): 一个用来迭代的集合。
- [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
- [depth=1] (number): 最大递归深度。

返回
- (Array): 返回新扁平化数组。
:::
该方法类似`_.flatMap`，不同之处在于`_.flatMapDepth`会根据指定的 `depth`（递归深度）继续扁平化递归映射结果。
```js
function duplicate(n) {
  return [[[n, n]]];
}
 
_.flatMapDepth([1, 2], duplicate, 2);
// => [[1, 1], [2, 2]]
```

## 其它
### _.invokeMap(collection, path, [args])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- path (Array|Function|string): 用来调用方法的路径 或 者每次迭代调用的函数。
- [args] (...*): 调用每个方法的参数。

返回
- (Array): 返回的结果数组。
:::
调用`path`（路径）上的方法处理`collection`中的每个元素，返回一个数组, 包含每次调用方法得到的结果。
任何附加的参数提供给每个被调用的方法。如果`methodName`（方法名）是一个函数，每次调用函数时，内部的`this`指向集合中的每个元素。
```js
_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]
 
_.invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```


### _.reduce(collection, [iteratee = _.identity], [ accumulator ])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [iteratee=_.identity] (Function): 每次迭代调用的函数。
- [accumulator] (*): 初始值。

返回
- (*): 返回累加后的值。
:::
压缩`collection`为一个值，通过`iteratee(accumulator, value, index|key, collection)`遍历`collection`中的每个元素，每次返回的值会作为下一次迭代使用(作为`iteratee`的第一个参数使用)。 如果没有提供`accumulator`，则`collection`中的第一个元素作为初始值。(`accumulator`参数在第一次迭代的时候作为`iteratee`第一个参数使用。)

:::warning 
lodash 中有许多方法是防止作为其他方法的迭代函数，例如：
_.reduce, _.reduceRight 和 _.transform。
注：即不能作为iteratee参数传递给其他方法

受保护的方法有：
`assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`和 `sortBy`
注：即这些方法不能使用 `_.reduce`, `_.reduceRight` 和 `_.transform`作为`iteratee`迭代函数参数
:::
```js
_.reduce([1, 2], function(sum, n) {
  return sum + n;
}, 0);
// => 3
 
_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
  return result;
}, {});
// => { '1': ['a', 'c'], '2': ['b'] } (无法保证遍历的顺序)
```

### _.reduceRight(collection, [iteratee = _.identity], [accumulator])
:::more 参数
- collection (Array|Object): 用来迭代的集合。
- [iteratee=_.identity] (Function): 每次迭代调用的函数。
- [accumulator] (*): 初始值。

返回
- (*): 返回累加后的值。
:::
这个方法类似`_.reduce`，除了它是从右到左遍历`collection`中的元素的。
```js
var array = [[0, 1], [2, 3], [4, 5]];
 
_.reduceRight(array, function(flattened, other) {
  return flattened.concat(other);
}, []);
// => [4, 5, 2, 3, 0, 1]
```

### _.size(collection)
返回`collection`的长度，如果集合是类数组或字符串，返回其`length`；如果集合是对象，返回其可枚举属性的个数。
```js
_.size([1, 2, 3]);
// => 3
 
_.size({ 'a': 1, 'b': 2 });
// => 2
 
_.size('pebbles');
// => 7
```
<hr/>
