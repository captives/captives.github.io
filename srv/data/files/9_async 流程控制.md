
:::more 目录导航
@[toc]
:::


# async

> 异步编程是指由于异步I/O等因素，无法同步获得执行结果时，在回调函数中进行下一步操作的代码编写风格,常见的如setTimeout函数、ajax请求等等。

### 内容
- 流程控制： 简化九种常见的流程的处理
- 集合处理：如何使用异步操作处理集中的数据
- 工具类：几个常用的工具类

### 安装
```sh
npm install async –-save
```
### 流程控制
#### series 串行执行
- series(tasks |Array | Object, callback)

多个函数依次执行，之间没有数据交换。仅仅需要保证其顺序执行,中间发生错误，后续不执行，直接报告结果。
tasks可以是一个数组也可以是一个JSON对象，参数类型不同，影响的是返回数据的格式。

> 注： 多个series调用之间是不分先后的，因为series本身也是异步调用。

示例1：
```js
const list = {
    one: (callback) => {
        console.log('start', '1');
        setTimeout(() => {
            console.log('end', '1');
            callback(null, 1);
        }, 2000);
    },
    two: (callback) => {
        console.log('start', '2');
        setTimeout(() => {
            console.log('end', '2');
            callback(null, 2);
        }, 1000);
    }
};

async.series(list, function (err, results) {
    console.log('series',err, results);
});
```

控制台输出:

```console
start 1
end 1
start 2
end 2
series null { one: 1, two: 2 }
```


示例2：
```js
const list = {
    one: function (callback) {
        callback('异常', 1);
    },
    two: function (callback) {
        callback(null, 2);
    }
};

async.series(list, function (err, results) {
    console.log('series',err, results);
});
```

控制台输出:
```console
series 异常 { one: 1 }
```

#### waterfall 串行传参
- waterfall(tasks|Array, callback)

多个函数依次执行，函数间可传值。

可以解决callback嵌套的问题。上一个流程的执行结果，会传给下一个流程的参数。如果其中一个流程出错，则会中止后续流程的执行，直接调用最终的callback。否则最后一个流程的结果，会传递给最终callback。

```js
async.waterfall([
    function(callback) {
        console.log('1');
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        console.log('2', arg1, arg2);
        callback(null, 'three');
    },
    function(arg1, callback) {
        console.log('3', arg1);
        callback(null, 'done');
    }
], function (err, results) {
    console.log('waterfall',err, results);
});
```

控制台输出：
```console
```console
1
2 one two
3 three
waterfall null done
```
#### parallel 并行执行
- parallel(tasks|Array|Object, callback)

多个函数并行执行，每个函数都是立刻执行，不需要等待其他函数先执行。传给最终callback的数组中的数据按照tasks声明的顺序，而不是执行完成的顺序。
如果某个函数出错，则立刻将err和已经执行完的函数的结果值传给parallel最终的callback。其它为执行完的函数的值不会传到最终数据，但要占个位置。

> 同时支持json形式的tasks，其最终callback的结果也为json形式。

```js
const list = {
    one: (callback) => {
        console.log('start', '1');
        setTimeout(() => {
            console.log('end', '1');
            callback(null, 1);
        }, 2000);
    },
    two: (callback) => {
        console.log('start', '2');
        setTimeout(() => {
            console.log('end', '2');
            callback(null, 2);
        }, 1000);
    }
};
async.parallel(list, function (err, results) {
    console.log('parallel',err, results);
});
```
控制台输出:
```console
start 1
start 2
end 2
end 1
parallel null { two: 2, one: 1 }
```

#### whilst 循环
- whilst(test, iterator, callback)

相当于while，先判断的循环,test为true, 执行iterator; 
重复执行一个函数。当test函数为true时，重复调用iterator。直到test函数为false或者iterator函数有错误产生时候，调用最后的callback
```js
var count = 6;
async.whilst(()=> {
    return count > 1;
}, (callback) => {
    console.log('start', count);
    count--;
    setTimeout(() => {
        console.log('end', count);
        callback(null, count);
    }, 1000);
}, (err, results) => {
    console.log('whilst', err, results);
});
```

控制台输出：
```console
start 6
end 5
start 5
end 4
start 4
end 3
start 3
end 2
start 2
end 1
whilst null 1
```

#### doWhilst 循环
- doWhilst(iterator, test, callback)

相当于do…while，后判断的循环,先执行iterator，然后判断test，如果为true,则继续执行;
```js
var count = 6;
async.doWhilst((callback) => {
    console.log('start', count);
    count--;
    setTimeout(() => {
        console.log('end', count);
        callback(null, count);
    }, 1000);
}, ()=> {
    return count > 1;
}, (err, results) => {
    console.log('doWhilst', err, results);
});
```
控制台输出：
```console
start 6
end 5
start 5
end 4
start 4
end 3
start 3
end 2
start 2
end 1
doWhilst null 1
```
#### until
- until(test, iterator, callback)

无限循环函数，当test返回false, 执行iterator;test返回true, 则停止循环。
```js
var count = 6;
async.until(()=> {
    return count < 3;
}, (callback) => {
    console.log('start', count);
    count--;
    setTimeout(() => {
        console.log('end', count);
        callback(null, count);
    }, 1000);
}, (err, results) => {
    console.log('until', err, results);
});
```
控制台输出：
```console
start 6
end 5
start 5
end 4
start 4
end 3
start 3
end 2
until null 2
```
#### doUntil
- doUntil(iterator, test, callback)

相当于do…while，后判断的循环,先执行iterator，然后判断test，如果为false,继续执行;如果为true则停止。
```js
async.doUntil((callback) => {
    console.log('start', count);
    count--;
    setTimeout(() => {
        console.log('end', count);
        callback(null, count);
    }, 1000);
}, ()=> {
    return count > 1;
}, (err, results) => {
    console.log('doWhilst', err, results);
});
```
控制台输出：
```console
start 6
end 5
doWhilst null 5
```
#### during
- during(test, iterator, callback)
```js
var count = 6;
async.during((callback) => {
        console.log('start', count);
        callback(null, count > 1);
    },(callback) => {
        count--;
        console.log('change', count);
        setTimeout(callback, 1000);
    },(err) => {
        console.log('during', err);
    }
);
```
控制台输出：
```console
start 6
change 5
start 5
change 4
start 4
change 3
start 3
change 2
start 2
change 1
start 1
during null
```
#### doDuring
- doDuring(iterator, test, callback)

过程中的后检查版本。为了反映操作顺序的差异，是一个具有异步测试功能的doWhilst版本。
```js
var count = 6;
async.doDuring((callback) => {
    console.log('start', count);
    count--;
    setTimeout(() => {
        console.log('end', count);
        callback(null, count);
    }, 1000);
}, (args, callback) => {
    return callback(null, args > 3);
    // return callback('异常', args > 3);
}, (err) => {
    console.log('doDuring', err);
});
```
控制台输出：
```console
start 6
end 5
start 5
end 4
start 4
end 3
doDuring null
auto
auto(test, iterator, callback)
```

#### auto
- auto(tasks|Array|Object, [callback])

多个函数有依赖关系， 有的并行执行，有的一次执行
- until
- queue
- iterator
- nextTick

### Collections集合
#### each
- each(arr, iterator, callback)

- 1、 arr 想要循环的数组
- 2、 iterator(item, callback) 一个回调函数，循环到的每一项都会调用这个函数。
item 数组中的每一项。callback(err) 当完成的时候调用，应该不带参数执行，或者明确指定一个 null
- 3、callback(err) 一个回调函数，用于循环完成后 或 发生错误时调用
并行遍历集合元素。
```js
var data  = [
    {name:'Apple',price:6.8, delay:200},
    {name:'Litchi',price:2.5, delay:300},
    {name:'Orange',price:8.2, delay:400}
];

async.each(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback();
    }, item.delay);
}, (err) => {
    console.log('Error', err);
});
```
控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
Error null
```
遍历过程有异常时通过callback返回，进程不会中断，直到全部遍历完成后err在最后的回调函数返回。
```js
var arr = [1, 2, 3, 2, 4, 5];
async.each(arr, (item, callback) => {
    console.log('item', item);
    if(item == 3){
        callback('这是' + item);
    }else{
        callback();
    }
}, (err) => {
    console.log('each', err);
});
```
控制台输出：
```console
arr [ 1, 2, 3, 2, 4, 5 ]
item 1
item 2
item 3
each 这是3
item 2
item 4
item 5
````
#### eachLimit
- eachLimit(arr, limit, iterator, callback)

limit 限制并行的最大数量
批量遍历集合元素，同一时候限制执行limit个任务。
单个任务执行：
```js
async.eachLimit(data, 1, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() =>{
        console.log('end', item.name);
        callback();
    }, item.delay);
}, (err) => {
    console.log('eachLimit', err);
});
```
控制台输出：
```console
start Apple
start Litchi
end Apple
start Orange
end Litchi
end Orange
eachLimit null
```
多个任务执行：
```js
async.eachLimit(data, 3, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback();
    }, item.delay);
}, (err) => {
    console.log('eachLimit', err);
});
```
控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
eachLimit null
```
遍历过程有异常通过cb返回，进程不会中断，直到全部遍历完成后err在最后的回调函数返回。

#### eachSeries
- eachSeries(arr, iterator, callback) 

arr 想要循环的数组
iterator(item, callback) 一个回调函数，循环到的每一项都会调用这个函数。
item 数组中的每一项。
callback(err) 当完成的时候调用，应该不带参数执行，或者明确指定一个 null
callback(err) 一个回调函数，用于循环完成后 或 发生错误时调用
顺序遍历集合元素。
```js
async.eachSeries(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback();
    }, item.delay);
}, (err) => {
    console.log('Error', err);
});
```
控制台输出：
```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
Error null
```
一个元素遍历完成及后续的操作完成后，才会进入下一个元素遍历。遍历过程出现err中断循环并在最后的回调函数返回err。
```js
var arr = [1, 2, 3, 2, 4, 5];
async.eachSeries(arr, (item, callback) => {
    console.log('item', item);
    if(item == 3){
        callback('这是' + item);
    }else{
        callback();
    }
}, (err) => {
    console.log('eachSeries', err);
});
```
控制台输出：
```console
arr [ 1, 2, 3, 2, 4, 5 ]
item 1
item 2
item 3
eachSeries 这是3
```
#### map
- map(arr, iterator, callback)

并行执行集合中的元素

参数：
arr 想要循环的数组
iterator(item, callback) 一个回调函数，循环到得每一项都会调用这个函数
item 数组中的每一项。
callback(err, transformed) 当程序执行完时，调用此参数(必须调用此参数)
callback(err, results) 一个回调函数，当所有数组执行完成，或发生错误的时候，被调用。
map 通俗点说，就是通过一个转换函数（iterator），把数组中的每个值映射到一个新的数组中。（产生一个新的数组）。
```js
async.map(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.name + "!");
    }, item.delay);
},function (err, result) {
    console.log('map', err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
map null [ 'Apple!', 'Litchi!', 'Orange!' ]
```

#### mapLimit
- mapLimit(arr, limit, iterator, callback)
- 
limit 限制并行的最大数量
批量执行集合元素，同一时候限制执行limit个任务。
单个任务执行：
```js
async.mapLimit(data, 1, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.name + "!");
    }, item.delay);
},function (err, result) {
    console.log('mapLimit', err, result);
});
```
控制台输出：
```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
mapLimit null [ 'Apple!', 'Litchi!', 'Orange!' ]
```

多个任务执行：
```
async.mapLimit(data, 3, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.name + "!");
    }, item.delay);
},function (err, result) {
    console.log('mapLimit', err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
mapLimit null [ 'Apple!', 'Litchi!', 'Orange!' ]
```


#### mapSeries
- mapSeries(arr, iterator, callback)

顺序执行集合中的元素
```js
async.mapSeries(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.name + "!");
    }, item.delay);
},function (err, result) {
    console.log('mapSeries', err, result);
});
```
控制台输出：
```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
mapSeries null [ 'Apple!', 'Litchi!', 'Orange!' ]
```

### mapValues
- mapValues(arr, iterator, callback)

```js
async.mapValues(data, (item, key, callback) => {
    console.log('start', key, item);
    setTimeout(() => {
        console.log('end', key, item);
        callback(null, item.name);
    }, item.delay);
}, (err, result) => {
    console.log('mapValues', err, result);
});

控制台输出：
```console
start 0 { name: 'Apple', price: 6.8, delay: 200 }
start 1 { name: 'Litchi', price: 2.5, delay: 300 }
start 2 { name: 'Orange', price: 8.2, delay: 400 }
end 0 { name: 'Apple', price: 6.8, delay: 200 }
end 1 { name: 'Litchi', price: 2.5, delay: 300 }
end 2 { name: 'Orange', price: 8.2, delay: 400 }
mapValues null { '0': 'Apple', '1': 'Litchi', '2': 'Orange' }
```

#### mapValuesLimit
- mapValuesLimit(arr, limit, iterator, callback)
```js
async.mapValuesLimit(data, 2, (item, key, callback) => {
    console.log('start', key, item);
    setTimeout(() => {
        console.log('end', key, item);
        callback(null, item.name);
    }, item.delay);
}, (err, result) => {
    console.log('mapValuesLimit', err, result);
});
```
控制台输出：
```console
start 0 { name: 'Apple', price: 6.8, delay: 200 }
start 1 { name: 'Litchi', price: 2.5, delay: 300 }
end 0 { name: 'Apple', price: 6.8, delay: 200 }
start 2 { name: 'Orange', price: 8.2, delay: 400 }
end 1 { name: 'Litchi', price: 2.5, delay: 300 }
end 2 { name: 'Orange', price: 8.2, delay: 400 }
mapValuesLimit null { '0': 'Apple', '1': 'Litchi', '2': 'Orange' }
```

#### mapValuesSeries
- mapValuesSeries(arr, iterator, callback)

```js
async.mapValuesSeries(data, (item, key, callback) => {
    console.log('start', key, item);
    setTimeout(() => {
        console.log('end', key, item);
        callback(null, item.name);
    }, item.delay);
}, (err, result) => {
    console.log('mapValuesSeries', err, result);
});
```

控制台输出：
```console
start 0 { name: 'Apple', price: 6.8, delay: 200 }
end 0 { name: 'Apple', price: 6.8, delay: 200 }
start 1 { name: 'Litchi', price: 2.5, delay: 300 }
end 1 { name: 'Litchi', price: 2.5, delay: 300 }
start 2 { name: 'Orange', price: 8.2, delay: 400 }
end 2 { name: 'Orange', price: 8.2, delay: 400 }
mapValuesSeries null { '0': 'Apple', '1': 'Litchi', '2': 'Orange' }
```

#### filter 条件过滤
- filter(arr, iterator, callback)

这个操作是并行的，但返回的结果是顺序的。
参数：
arr 一个数组，用于遍历
iterator(item, callback) 一个函数，用于真值检测
item 数组中的每一项
callback(err, truthValue) 完成时调用，必须带一个布尔参数
callback 一个回调函数，用于执行完成后，或发生错误时调用。
过滤array中的元素，iterator中的cb是一个表达式，只有两个结果false和true，结果为true汇总在最后的callback。

```js
async.filter(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
},function (err, result) {
    console.log('filter',err, result);
});
```

控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
filter null [ { name: 'Apple', price: 6.8, delay: 200 },{ name: 'Orange', price: 8.2, delay: 400 } ]
```

#### filterLimit条件过滤
- filterLimit (arr, limit, iterator, callback)
```js
async.filterLimit(data, 2, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() =>{
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
},function (err, result) {
    console.log('filter',err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
end Apple
start Orange
end Litchi
end Orange
filter null [ { name: 'Apple', price: 6.8, delay: 200 },  { name: 'Orange', price: 8.2, delay: 400 } ]
```

#### filterSeries 条件过滤
- filterSeries(arr, iterator, callback);

这个操作是顺序执行的。

```js
async.filterSeries(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
},function (err, result) {
    console.log('filterSeries',err, result);
});
```

控制台输出：
```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
filterSeries null [ { name: 'Apple', price: 6.8, delay: 200 }, { name: 'Orange', price: 8.2, delay: 400 } ]
```

#### reject 过滤例外
- reject(arr, iterator, callback)

和filter相反，filter是保留t的表达式为true的item，而reject是表达式值为false的item;
```js
async.reject(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
},function (err, result) {
    console.log('reject',err, result);
});
```

控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
reject null [ { name: 'Litchi', price: 2.5, delay: 300 } ]
```
#### rejectLimit 
- rejectLimit (arr, limit, iterator, callback);
```js
async.rejectLimit(data, 2, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() =>{
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
}, (err, result) => {
    console.log('rejectLimit',err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
end Apple
start Orange
end Litchi
end Orange
reject null [ { name: 'Litchi', price: 2.5, delay: 300 } ]
```

#### rejectSeries 
- rejectSeries(arr, iterator, callback);

这个操作是顺序执行的。
```js
async.rejectSeries(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
},function (err, result) {
    console.log('rejectSeries',err, result);
});
```

控制台输出：
```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
rejectSeries null [ { name: 'Litchi', price: 2.5, delay: 300 } ]
```

#### reduce 串行累加
- reduce(arr, memo, iterator, callback)

逐渐累加,只支持 series 模式，不支持并行。
Reduce可以让我们给定一个初始值，用它与集合中的每一个元素做运算（前一次的运算结果与下一个值做运算），最后得到一个值。reduce从左向右来遍历元素，如果想从右向左，可使用reduceRight。
```js
async.reduce(data, 0, (memo, item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price + memo);
    }, item.delay);
},function (err, result) {
    console.log('reduce',err, result);
});
```

控制台输出：
```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
reduce null 17.5
```
| 参看：Array.prototype.reduce

#### reduceRight 元素计算
- reduceRight(arr, memo, iterator, callback)

与 reduce 一样，不同的是，reduceRight 是从右向左计算。
```js
async.reduceRight(data, 0, (memo, item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price + memo);
    }, item.delay);
},function (err, result) {
    console.log('reduceRight',err, result);
});
```
控制台输出：
```console
start Orange
end Orange
start Litchi
end Litchi
start Apple
end Apple
reduceRight null 17.5
```
#### detect
- detect(arr, iterator, callback)

用于取得集合中满足条件的第一个元素（并行执行）。
参数：
arr 一个数组
iterator(item, callback) 回调函数，用于处理逻辑（迭代器）
item 数组中的每一项
callback(truthValue) 程序完成后执行。必须传入布尔值。
callback(result) 回调函数， iterator 第一次返回 true，或 循环完成后执行。
```js
async.detect(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
}, (err, result) => {
    console.log('detect',err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
detect null { name: 'Apple', price: 6.8, delay: 200 }
end Litchi
end Orange
参看：Array.prototype.reduceRight
```

#### detectLimit
- detectLimit(arr, limit, iterator, callback)

```js
async.detectLimit(data, 2, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
}, (err, result) => {
    console.log('detectLimit', err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
end Apple
detectLimit null { name: 'Apple', price: 6.8, delay: 200 }
end Litchi
```

#### detectSeries
- detectSeries(arr, iterator, callback)

用于取得集合中满足条件的第一个元素（顺序执行）。
```js
async.detectSeries(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() =>{
        console.log('end', item.name);
        callback(null, item.price > 7 || item.delay < 300);
    }, item.delay);
}, (err, result) => {
    console.log('detectSeries',err, result);
});
```
控制台输出：
```console
start Apple
end Apple
detectSeries null { name: 'Apple', price: 6.8, delay: 200 }
```

#### sortBy 排序
- sortBy(arr, iterator, callback)

参数：
arr 一个数组
iterator(item, callback) 一个回调函数，循环到得每一项都会执行。
item 数组中的每一项
callback(err, sortValue) 完成时调用。sortValue排序字段
callback(err, results) 一个回调函数，所有 iterator 完成后或发生错误时执行。
对集合内的元素进行排序，根据每个元素进行某异步操作后产生的值，从小到大排序。
```js
var data = [2, 0, 5, 8, 4, 9, 1, 6, 7];
async.sortBy(data, (item, callback) => {
    callback(null, item);
}, (err, result) => {
    console.log('sortBy',err, result);
});
```
控制台输出
```console
sortBy null [ 0, 1, 2, 4, 5, 6, 7, 8, 9 ]
```

例2：
```js
async.sortBy(data, (item, callback) => {
    callback(null, item.price); //item.price 排序字段
},(err, result) => {
    console.log('sortBy',err, result);
});
```
控制台输出:
```console
sortBy null [ { name: 'Litchi', price: 2.5, delay: 300 },{ name: 'Apple', price: 6.8, delay: 200 },  { name: 'Orange', price: 8.2, delay: 400 } ]
```

#### some
- some(arr, iterator, callback)

判断集合中是否有至少一个元素满足条件，如果是最终callback得到的值为true，否则为false.
参数：
arr 一个数组
iterator(item, callback) 一个回调函数，循环到得每一项都会执行。
callback(truthValue) 必须传递一个布尔值。
callback(result) 回调函数 result为 true 或 false 取决于iterator 的运行结果。
```js
async.some(data, (item, callback) => {
    callback(null, item.price > 7);
},(err, result) => {
    console.log('some',err, result);
});
```
控制台输出：
```console
some null true
```
#### someLimit
- someLimit(arr, limit, iterator, callback)

#### someSeries
- someSeries(arr, iterator, callback)

#### every
- every(arr, iterator, callback)

参数：
arr 一个数组
iterator(item, callback) 一个回调函数，循环到得每一项都会执行。
callback(truthValue) 必须传递一个布尔值。
callback(result) 回调函数 result为 true 或 false 取决于iterator 的运行结果。
如果集合里每一个元素都满足条件，则传给最终回调的result为true，否则为false。
```js
async.every(data, (item, callback) => {
    callback(null, item.price > 7);
}, (err, result) => {
    console.log('every',err, result);
});
```
控制台输出：
```console
every null false
```

例子2：
```js
async.every(data, (item, callback) => {
    callback(null, item.price > 2);
}, (err, result) => {
    console.log('every',err, result);
});
```

控制台输出：
```console
every null true
```

#### everyLimit
- everyLimit (arr, limit, iterator, callback)

#### everySeries
- everySeries(arr, iterator, callback)

#### concat 合并
- concat(arr, iterator, callback)

将多个异步操作的结果并行合并为一个数组。合并之后的顺序是不固定的。
```js
async.concat(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price * 2);
    }, item.delay);
}, (err, result) => {
    console.log('concat', err, result);
});
```

控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
concat null [ 13.6, 5, 16.4 ]
```

#### concatLimit 合并
- concatLimit(arr, limit, iterator, callback)

将异步操作的结果，限制数量并行合并为一个数组。合并之后的顺序是不固定的。
```js
async.concatLimit(data, 2, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price * 2);
    }, item.delay);
}, (err, result) => {
    console.log('concatLimit', err, result);
});
```

控制台输出：
```console
start Apple
start Litchi
end Apple
start Orange
end Litchi
end Orange
concatLimit null [ 13.6, 5, 16.4 ]
```

#### concatSeries 合并
- concatSeries(arr, iterator, callback)

将多个异步操作的结果顺序合并为一个数组。合并之后的顺序是不固定的。
```js
async.concatSeries(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.price * 2);
    }, item.delay);
}, (err, result) => {
    console.log('concatSeries', err, result);
});
```

控制台输出：
```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
concatSeries null [ 13.6, 5, 16.4 ]
```

#### groupBy
- groupBy(arr, iterator, callback)

传入一系列对象，并根据设置的 key 并发进行分组。
```js
var data = [
    { name: 'Apple', price: 6.8, delay: 200, origin:'A'},
    { name: 'Litchi', price: 2.5, delay: 300, origin:'B' },
    { name: 'Orange', price: 8.2, delay: 400, origin:'A' }
];
async.groupBy(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.origin);
    }, item.delay);
}, (err, result) => {
    console.log('groupBy', err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
start Orange
end Apple
end Litchi
end Orange
groupBy null { A: [ { name: 'Apple', price: 6.8, delay: 200, origin: 'A' }, { name: 'Orange', price: 8.2, delay: 400, origin: 'A' } ],B: [ { name: 'Litchi', price: 2.5, delay: 300, origin: 'B' } ] }
```

#### groupByLimit
- groupByLimit(arr, limit, iterator, callback)
```js
async.groupByLimit(data, 2, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.origin);
    }, item.delay);
}, (err, result) => {
    console.log('groupByLimit', err, result);
});
```
控制台输出：
```console
start Apple
start Litchi
end Apple
start Orange
end Litchi
end Orange
groupByLimit null { A: 
   [ { name: 'Apple', price: 6.8, delay: 200, origin: 'A' }, { name: 'Orange', price: 8.2, delay: 400, origin: 'A' } ], B: [ { name: 'Litchi', price: 2.5, delay: 300, origin: 'B' } ] }
```

#### groupBySeries
- groupBySeries(arr, iterator, callback)

传入一系列对象，并根据设置的 key 顺序进行分组。
```js
async.groupBySeries(data, (item, callback) => {
    console.log('start', item.name);
    setTimeout(() => {
        console.log('end', item.name);
        callback(null, item.origin);
    }, item.delay);
}, (err, result) => {
    console.log('groupBySeries', err, result);
});
```
控制台输出：

```console
start Apple
end Apple
start Litchi
end Litchi
start Orange
end Orange
groupBySeries null { A: [ { name: 'Apple', price: 6.8, delay: 200, origin: 'A' },{ name: 'Orange', price: 8.2, delay: 400, origin: 'A' } ],B: [ { name: 'Litchi', price: 2.5, delay: 300, origin: 'B' } ] }
```

</div>
</div>

<hr/>
