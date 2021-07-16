# Lodash 函数

### _.before(n, func)
:::more 参数
- n (number): 超过多少次不再调用func（注：限制调用func 的次数）。
- func (Function): 限制执行的函数。

返回
- (Function): 返回新的限定函数。
:::
创建一个调用`func`的函数，通过`this`绑定和创建函数的参数调用`func`，调用次数不超过 n 次。 
之后再调用这个函数，将返回最后一次调用`func`的结果。
```js
jQuery(element).on('click', _.before(5, addContactToList));
// => 允许将最多4个联系人添加到列表中
```
### _.after(n, func)
:::more 参数
- n (number): func 方法应该在调用多少次后才执行。
- func (Function): 用来限定的函数。

返回
- (Function): 返回新的限定函数。
:::
`_.before`的反向函数;
此方法创建一个函数，当他被调用至少`n`次时才会触发`func`。
```js
var saves = ['profile', 'settings'];
 
var done = _.after(saves.length, function() {
  console.log('done saving!');
});
 
_.forEach(saves, function(type) {
  asyncSave({ 'type': type, 'complete': done });
});
// => 两次异步日志保存完成后才会输出：'done saving!'
```

### _.ary(func, [n = func.length])
:::more 参数：
- func (Function): 需要被限制参数个数的函数。
- [n=func.length] (number): 限制的参数数量。

返回值：
- (Function): 返回新的覆盖函数。
:::
创建一个调用`func`的函数。调用`func`时最多接受`n`个参数，忽略多出的参数。
```js
_.map(['6', '8', '10'], _.ary(parseInt, 1));
// => [6, 8, 10]
```
等价于
```js
_.map(['6', '8', '10'], _.ary((a, b) => {
    console.log(a, b);
    return parseInt(a);
}, 1));
/**
 6 undefined
 8 undefined
 10 undefined 
=> [6, 8, 10]
*/
```
扩展==n = 2==时，将输出：
```js
 6 0
 8 1
 10 2
=> [6, 8, 10]
```

### _.bind(func, thisArg, [partials])
:::more 参数
- func (Function): 绑定的函数。
- thisArg (*): func 绑定的this对象。
- [partials] (...*): 附加的部分参数。

返回
- (Function): 返回新的绑定函数。
:::
创建一个调用`func`的函数，`thisArg`绑定`func`函数中的`this`(注：this的上下文为thisArg)，并且`func`函数会接收`partials`附加参数。

_.bind.placeholder 值，默认是以`_`作为附加部分参数的占位符。

:::warning 
不同于原生的 Function#bind，这个方法不会设置绑定函数的 `length` 属性。
:::
```js
var greet = function(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
};
 
var object = { 'user': 'fred' };
 
var bound = _.bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'
 
// 占位符绑定
var bound = _.bind(greet, object, _, '!');
bound('hi');
// => 'hi fred!'
```

### _.bindKey(object, key, [partials])
:::more 参数
- object (Object): 需要绑定函数的对象。
- key (string): 需要绑定函数对象的键。
- [partials] (...*): 附加的部分参数。

返回
- (Function): 返回新的绑定函数。
:::
创建一个函数,在`object[key]`上通过接收`partials`附加参数，调用这个方法。
这个方法与`_.bind`的不同之处在于允许重新定义绑定函数即使它还不存在。

_.bind.placeholder值，默认是以`_`作为附加部分参数的占位符。

:::info 
浏览[Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)了解更多详情。
:::

```js
var object = {
  'user': 'fred',
  'greet': function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
 
var bound = _.bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'
 
object.greet = function(greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};
 
bound('!');
// => 'hiya fred!'
 
// 占位符绑定
var bound = _.bindKey(object, 'greet', _, '!');
bound('hi');
// => 'hiya fred!'
```


### _.partial(func, [partials])
:::more 参数
- func (Function): 需要预设的函数
- [partials] (...*): 预设的参数

返回
- (Function): 返回预设参数的函数。
:::
创建一个函数。 该函数调用`func`，并传入预设的`partials`参数。 这个方法类似`_.bind`，除了它不会绑定 `this`。

这个 _.partial.placeholder 的值，默认是以`_`作为附加部分参数的占位符。

:::warning 
这个方法不会设置 "length" 到函数上。
:::

```js
var greet = function(greeting, name) {
  return greeting + ' ' + name;
};
 
var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'
 
// 使用了占位符。
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'
```
### _.partialRight(func, [partials])
:::more 参数
- func (Function): 需要预设的函数
- [partials] (...*): 预设的参数

返回
- (Function): 返回预设参数的函数。
:::

这个函数类似`_.partial`，除了预设参数被附加到接受参数的后面。

这个_.partialRight.placeholder 的值，默认是以`_`作为附加部分参数的占位符。

:::warning 
这个方法不会设置 "length" 到函数上。
:::
```js
var greet = function(greeting, name) {
  return greeting + ' ' + name;
};
 
var greetFred = _.partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'
 
// 使用了占位符。
var sayHelloTo = _.partialRight(greet, 'hello', _);
sayHelloTo('fred');
// => 'hello fred'
```

### _.curry(func, [arity = func.length])
::: more 参数
- func (Function): 用来柯里化（curry）的函数。
- [arity=func.length] (number): 需要提供给 func 的参数数量。

返回
- (Function): 返回新的柯里化（curry）函数。
:::

创建一个函数，该函数接收`func`的参数，要么调用func返回的结果，如果 func 所需参数已经提供，则直接返回 func 所执行的结果。或返回一个函数，接受余下的func 参数的函数，可以使用 func.length 强制需要累积的参数个数。

_.curry.placeholder 值，默认是以`_`作为附加部分参数的占位符。

:::warning 
这个方法不会设置`curried`函数的`length`属性。
::::

```js
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curry(abc);
 
curried(1)(2)(3);
// => [1, 2, 3]
 
curried(1, 2)(3);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```

### _.curryRight(func, [arity = func.length])
::: more 参数
- func (Function): 用来柯里化（curry）的函数。
- [arity=func.length] (number): 需要提供给 func 的参数数量。

返回
- (Function): 返回新的柯里化（curry）函数。
:::

这个方法类似`_.curry`。 除了它接受参数的方式用`_.partialRight`代替`_.partial`。

_.curryRight.placeholder值，默认是以`_`作为附加部分参数的占位符。

:::warning 
这个方法不会设置 curried 函数的 "length" 属性。
:::
```js
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curryRight(abc);
 
curried(3)(2)(1);
// => [1, 2, 3]
 
curried(2, 3)(1);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(3)(1, _)(2);
// => [1, 2, 3]
```

### _.rearg(func, indexes)
:::more 参数
func (Function): 待调用的函数。
indexes (...(number|number[])): 排列参数的位置。
返回
(Function): 返回新的函数。
:::
创建一个函数,调用`func`时，根据指定的`indexes`调整对应位置参数。其中第一个索引值是对应第一个参数，第二个索引值是作为第二个参数，依此类推。
```js
var rearged = _.rearg(function(a, b, c) {
  return [a, b, c];
}, [2, 0, 1]);
 
rearged('b', 'c', 'a')
// => ['a', 'b', 'c']
```

### _.rest(func, [start=func.length-1])
:::more 参数
- func (Function): 要应用的函数。
- [start=func.length-1] (number): rest 参数的开始位置。

返回
- (Function): 返回新的函数。
:::
创建一个函数，调用`func`时，`this`绑定到创建的新函数，并且`start`之后的参数作为数组传入。
```js
var say = _.rest(function(what, names) {
  return what + ' ' + _.initial(names).join(', ') +
    (_.size(names) > 1 ? ', & ' : '') + _.last(names);
});
 
say('hello', 'fred', 'barney', 'pebbles');
// => 'hello fred, barney, & pebbles'
```
### _.spread(func, [start=0])
:::more 参数
- func (Function): 要应用传播参数的函数。
- [start=0] (number): spread 参数的开始位置.

返回
- (Function): 返回新的函数。
:::
创建一个函数，调用`func`时，`this`绑定到创建的新函数，把参数作为数组传入，类似于[Function#apply](http://www.ecma-international.org/ecma-262/6.0/#sec-function.prototype.apply).
```js
var say = _.spread(function(who, what) {
  return who + ' says ' + what;
});
 
say(['fred', 'hello']);
// => 'fred says hello'
 
var numbers = Promise.all([
  Promise.resolve(40),
  Promise.resolve(36)
]);
 
numbers.then(_.spread(function(x, y) {
  return x + y;
}));
// => a Promise of 76
```
### _.throttle(func, [wait = 0], [options = ])
:::more 参数
func (Function): 要节流的函数。
[wait=0] (number): 需要节流的毫秒。
[options=] (Object): 选项对象。
[options.leading=true] (boolean): 指定调用在节流开始前。
[options.trailing=true] (boolean): 指定调用在节流结束后。
返回
(Function): 返回节流的函数。
:::

创建一个节流函数，在`wait`毫秒内最多执行`func`一次的函数。 该函数提供一个`cancel`方法取消延迟的函数调用以及 `flush`方法立即调用。 可以提供一个`options`对象决定如何调用`func`方法，`options.leading`与`|`或 `options.trailing`决定`wait`前后如何触发。`func`会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次`func`调用的结果。

:::warning 注意: 
如果`leading`和`trailing`都设定为==true==则`func`允许`trailing`方式调用的条件为: 在`wait`期间多次调用。
:::

如果`wait`为==0==并且`leading`为==false==,`func`调用将被推迟到下一个点，类似`setTimeout`为==0==的超时。
:::info
查看 [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/) 了解[_.throttle](https://www.lodashjs.com/docs/lodash.debounce)与[_.debounce](https://www.lodashjs.com/docs/lodash.throttle)的区别。
:::
```js
// 避免在滚动时过分的更新定位
jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 
// 点击后就调用 `renewToken`，但5分钟内超过1次。
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
 
// 取消一个 trailing 的节流调用。
jQuery(window).on('popstate', throttled.cancel);
```

### _.unary(func)
创建一个最多接受一个参数的函数，忽略多余的参数。
```js
_.map(['6', '8', '10'], _.unary(parseInt));
// => [6, 8, 10]
```

### _.wrap(value, [wrapper=identity])
:::more 参数
- value (*): 要包装的值。
- [wrapper=identity] (Function): 包装函数。

返回
- (Function): 返回新的函数。
:::
创建一个函数。提供的`value`包装在`wrapper`函数的第一个参数里。 任何附加的参数都提供给`wrapper`函数。 被调用时`this`绑定在创建的函数上。
```js
var p = _.wrap(_.escape, function(func, text) {
  return '<p>' + func(text) + '</p>';
});
 
p('fred, barney, & pebbles');
// => '<p>fred, barney, & pebbles</p>'
```


## 延迟

### _.debounce(func, [wait = 0], [options = ])
:::more 参数
- func (Function): 要防抖动的函数。
- [wait=0] (number): 需要延迟的毫秒数。
- [options=] (Object): 选项对象。
- [options.leading=false] (boolean): 指定在延迟开始前调用。
- [options.maxWait] (number): 设置 func 允许被延迟的最大值。
- [options.trailing=true] (boolean): 指定在延迟结束后调用。

返回
- (Function): 返回新的 debounced（防抖动）函数。
:::

创建一个`debounced`（防抖动）函数，该函数会从上一次被调用后，延迟`wait`毫秒后调用`func`方法。`debounced`（防抖动）函数提供一个`cancel`方法取消延迟的函数调用以及`flush`方法立即调用。 可以提供一个 `options`（选项）对象决定如何调用`func`方法，`options.leading` 与`|` 或`options.trailing`决定延迟前后如何触发（注：是 ==先调用后等待==还是 ==先等待后调用==）。 `func`调用时会传入最后一次提供给`debounced`（防抖动）函数的参数。 后续调用的`debounced`（防抖动）函数返回是最后一次`func`调用的结果。
:::warning 注意: 
如果`leading`和`trailing`选项为==true==, 则`func`允许`trailing`方式调用的条件为: 在`wait`期间多次调用防抖方法。

如果`wait`为==0== 并且`leading`为==false==, `func`调用将被推迟到下一个点，类似`setTimeout`为==0==的超时。
:::
```js
// 避免窗口在变动时出现昂贵的计算开销。
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 
// 当点击时 `sendMail` 随后就被调用。
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// 确保 `batchLog` 调用1次之后，1秒内会被触发。
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// 取消一个 trailing 的防抖动调用
jQuery(window).on('popstate', debounced.cancel);
```
### _.defer(func, [args])
:::more 参数
- func (Function): 要延迟的函数。
- [args] (...*): 会在调用时传给 func 的参数。

返回
- (number):返回计时器 id。
:::
推迟调用`func`，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给`func`。
```js
_.defer(function(text) {
  console.log(text);
}, 'deferred');
// => 一毫秒或更久一些输出 'deferred'。
```
### _.delay(func, wait, [args])
:::more 参数
- func (Function): 要延迟的函数。
- wait (number): 要延迟的毫秒数。
- [args] (...*): 会在调用时传入到 func 的参数。

返回
- (number): 返回计时器 id
:::
延迟`wait`毫秒后调用`func`。 调用时，任何附加的参数会传给`func`。
```js
_.delay(function(text) {
  console.log(text);
}, 1000, 'later');
// => 一秒后输出 'later'。
```

## 转换
### _.flip(func)
:::more 参数
- func (Function): 要翻转参数的函数。

返回
- (Function): 返回新的函数。
:::
创建一个函数，调用`func`时候接收翻转的参数。
```js
var flipped = _.flip(function() {
  return _.toArray(arguments);
});
 
flipped('a', 'b', 'c', 'd');
// => ['d', 'c', 'b', 'a']
```


### _.memoize(func, [resolver])
:::more 参数
- func (Function): 需要缓存化的函数.
- [resolver] (Function): 这个函数的返回值作为缓存的 key。

返回
- (Function): 返回缓存化后的函数。
:::
创建一个会缓存`func`结果的函数。 如果提供了`resolver`，就用`resolver`的返回值作为`key`缓存函数的结果。 默认情况下用第一个参数作为缓存的`key`。 `func`在调用时`this`会绑定在缓存函数上。

:::warning 注意: 
缓存会暴露在缓存函数的`cache`上。 它是可以定制的，只要替换了`_.memoize.Cache`构造函数，或实现了Map的 `delete`, `get`, `has`, 和`set`方法。
:::
```js
var object = { 'a': 1, 'b': 2 };
var other = { 'c': 3, 'd': 4 };
 
var values = _.memoize(_.values);
values(object);
// => [1, 2]
 
values(other);
// => [3, 4]
 
object.a = 2;
values(object);
// => [1, 2]
 
// 修改结果缓存。
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']
 
// 替换 `_.memoize.Cache`。
_.memoize.Cache = WeakMap;
```

### _.negate(predicate:Function)
:::more 参数
- predicate (Function): 需要对结果取反的函数。

返回
- (Function): 返回一个新的取反函数。
:::
创建一个针对断言函数`func`结果取反的函数。 `func`断言函数被调用的时候, `this`绑定到创建的函数，并传入对应参数。
```js
function isEven(n) {
  return n % 2 == 0;
}
 
_.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
// => [1, 3, 5]
```

### _.once(func)
:::more 参数
- func (Function): 指定的触发的函数。

返回
- (Function): 返回新的受限函数。
:::
创建一个只能调用`func`一次的函数。重复调用返回第一次调用的结果。`func`调用时，`this`绑定到创建的函数，并传入对应参数。
```js
var initialize = _.once(createApplication);
initializ	e();
initialize();
// `initialize` 只能调用 `createApplication` 一次。
```
### _.overArgs(func, [transforms = [ _.identity ]])
:::more 参数
- func (Function):要包裹的函数。

返回
- (Function): 返回新函数。
:::
创建一个函数，调用func时参数为相对应的`transforms`的返回值。
:::info 
执行func函数之前，需要通过`transforms` 处理参数；
:::
```js
function doubled(n) {
  return n * 2;
}
 
function square(n) {
  return n * n;
}
 
var func = _.overArgs(function(x, y) {
  return [x, y];
}, [square, doubled]);
 
func(9, 3);
// => [81, 6]
 
func(10, 5);
// => [100, 10]
```
或
```js
var func = _.overArgs(function(x, y) {
  return x + y;
}, [square, doubled]);

func(9, 3);
// => 87
```

<hr/>
