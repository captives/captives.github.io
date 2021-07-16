# Lodash 数学

## 逻辑运算
### _.add(augend, addend)
两个数相加。
```js
_.add(6, 4);
// => 10
```

### _.subtract(minuend, subtrahend)
两个数相减。
```js
_.subtract(6, 4);
// => 2
```

### _.multiply(multiplier, multiplicand)
两个数相乘。
```js
_.multiply(6, 4);
// => 24
```

### _.divide(dividend, divisor)
两个数相除。
```js
_.divide(6, 4);
// => 1.5
```

### _.sum(array)
计算`array`中所有值的总和
_.sum([4, 2, 8, 6]);
// => 20

### _.sumBy(array, [iteratee = _.identity])
这个方法类似[_.summin](https://www.lodashjs.com/docs/lodash.summin)除了它接受`iteratee(value)`来调用`array中`的每一个元素，来生成其值排序的标准。
```js
var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 
_.sumBy(objects, function(o) { return o.n; });
// => 20
 
// The `_.property` iteratee shorthand.
_.sumBy(objects, 'n');
// => 20
```

### _.mean(array)
计算`array`的平均值。
```js
_.mean([4, 2, 8, 6]);
// => 5
```
### _.meanBy(array, [iteratee = _.identity])
这个方法类似`_.mean`，除了它接受`iteratee(value) `来调用`array`中的每一个元素，来生成其值排序的标准。
```js
var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 
_.meanBy(objects, function(o) { return o.n; });
// => 5
 
// The `_.property` iteratee shorthand.
_.meanBy(objects, 'n');
// => 5
```



## 格式化
### _.round(number, [precision=0])
根据`precision`四舍五入 number。
```js
_.round(4.006);
// => 4
 
_.round(4.006, 2);
// => 4.01
 
_.round(4060, -2);
// => 4100
```

### _.ceil(number, [precision = 0])
根据`precision`（精度）向上舍入`number`。（注：`precision`（精度）可以理解为保留几位小数。）
```js
_.ceil(4.006);
// => 5
 
_.ceil(6.004, 2);
// => 6.01
 
_.ceil(6040, -2);
// => 6100
```

### _.floor(number, [precision=0])
根据`precision`（精度）向下舍入`number`。（注：`precision`（精度）可以理解为保留几位小数。）
```js
_.floor(4.006);
// => 4
 
_.floor(0.046, 2);
// => 0.04
 
_.floor(4060, -2);
// => 4000
```

## 比较

### _.min(array)
计算`array`中的最小值。 如果`array`是[]或者假值将会返回 undefined。
```js
_.min([4, 2, 8, 6]);
// => 2
 
_.min([]);
// => undefined
```
### _.minBy(array, [iteratee = _.identity])
这个方法类似`_.min`除了它接受`iteratee(value)`来调用`array`中的每一个元素，来生成其值排序的标准。 
```js
var objects = [{ 'n': 1 }, { 'n': 2 }];
 
_.minBy(objects, function(o) { return o.n; });
// => { 'n': 1 }
 
// The `_.property` iteratee shorthand.
_.minBy(objects, 'n');
// => { 'n': 1 }
```

### _.max(array)
计算`array`中的最大值。 如果`array`是[]或者假值将会返回 undefined。
```js
_.max([4, 2, 8, 6]);
// => 8
 
_.max([]);
// => undefined
```

### _.maxBy(array, [iteratee = _.identity])
这个方法类似`_.max`除了它接受`iteratee(value)`来调用`array`中的每一个元素，来生成其值排序的标准。 
```js
var objects = [{ 'n': 1 }, { 'n': 2 }];
 
_.maxBy(objects, function(o) { return o.n; });
// => { 'n': 2 }
 
// The `_.property` iteratee shorthand.
_.maxBy(objects, 'n');
// => { 'n': 2 }
```


<hr/>
