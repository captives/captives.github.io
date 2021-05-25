# Lodash 字符串处理


## 转换
### _.toLower([string=''])
转换整个string字符串的字符为小写，类似[String#toLowerCase](https://mdn.io/toLowerCase)。
```js
_.toLower('--Foo-Bar--');
// => '--foo-bar--'
 
_.toLower('fooBar');
// => 'foobar'
 
_.toLower('__FOO_BAR__');
// => '__foo_bar__'
```

### _.toUpper([string=''])
转换整个string字符串的字符为大写，类似[String#toUpperCase](https://mdn.io/toUpperCase)。

### _.lowerCase([string=''])
转换字符串string以空格分开单词，并转换为小写。
```js
_.lowerCase('--Foo-Bar--');
// => 'foo bar'
 
_.lowerCase('fooBar');
// => 'foo bar'
 
_.lowerCase('__FOO_BAR__');
// => 'foo bar'
```

### _.lowerFirst([string=''])
转换字符串string的首字母为小写, 其余不变。
```js
_.lowerFirst('Fred');
// => 'fred'
 
_.lowerFirst('FRED');
// => 'fRED'
```

### _.upperCase([string=''])
转换字符串string为 空格 分隔的大写单词。
```js
_.upperCase('--foo-bar');
// => 'FOO BAR'
 
_.upperCase('fooBar');
// => 'FOO BAR'
 
_.upperCase('__foo_bar__');
// => 'FOO BAR'
```
### _.upperFirst([string=''])
转换字符串string的首字母为大写，其余不变。
```js
_.upperFirst('fred');
// => 'Fred'
 
_.upperFirst('FRED');
// => 'FRED'
```
### _.capitalize([string=''])
字符串首字符大写，其余小写

```js
_.capitalize('FRED');
// => 'Fred'
```

### _.camelCase([string=''])
转换字符串string为驼峰写法。
```js
_.camelCase('Foo Bar');
// => 'fooBar'
 
_.camelCase('--foo-bar--');
// => 'fooBar'
 
_.camelCase('__FOO_BAR__');
// => 'fooBar'
```
### _.kebabCase([string=''])
转换字符串string为[kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
```js
_.kebabCase('Foo Bar');
// => 'foo-bar'
 
_.kebabCase('fooBar');
// => 'foo-bar'
 
_.kebabCase('__FOO_BAR__');
// => 'foo-bar'
```
### _.snakeCase([string=''])
转换字符串string为[snake case](https://en.wikipedia.org/wiki/Snake_case)。
```js
_.snakeCase('Foo Bar');
// => 'foo_bar'
 
_.snakeCase('fooBar');
// => 'foo_bar'
 
_.snakeCase('--FOO-BAR--');
// => 'foo_bar'
```

### _.startCase([string=''])
转换string字符串为[start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage)。
```js
_.startCase('--foo-bar--');
// => 'Foo Bar'
 
_.startCase('fooBar');
// => 'Foo Bar'
 
_.startCase('__FOO_BAR__');
// => 'FOO BAR'
```

## 转义
### _.escape([string=''])
转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。

::: warning 注意：
不会转义其他字符。如果需要，可以使用第三方库，例如he。
:::
虽然 ">" 是对称转义的，字符如 ">" 和 "/" 没有特殊的意义，所以不需要在 HTML 转义。 除非它们是标签的一部分，或者是不带引号的属性值。

当解析 HTML 时，总应该在[属性值上使用引号](http://wonko.com/post/html-escaping) 以减少 XSS 的可能性。
```js
_.escape('fred, barney, & pebbles');
// => 'fred, barney, & pebbles'
```
### _.escapeRegExp([string=''])
转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", ", ", 和 "|" in .
```js
_.escapeRegExp('[lodash](https://lodash.com/)');
// => '\[lodash\]\(https://lodash\.com/\)'
```

### _.unescape([string=''])
`_.escape`的反向版。 这个方法转换string字符串中的 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 和 &#96; 为对应的字符。
::: warning 注意：
不会转义其他字符。如果需要，可以使用第三方库，例如he。
:::
```js
_.unescape('fred, barney, & pebbles');
// => 'fred, barney, & pebbles'
```

## 分割
### _.split([string=''], separator, [limit])
根据`separator`拆分字符串`string`。
:::warning 注意：
这个方法基于[String#split](https://mdn.io/String/split)。
:::
```js
_.split('a-b-c', '-', 2);
// => ['a', 'b']
```
### _.words([string=''], [pattern])
拆分字符串string中的词为数组 。
```js
_.words('fred, barney, & pebbles');
// => ['fred', 'barney', 'pebbles']
 
_.words('fred, barney, & pebbles', /[^, ]+/g);
// => ['fred', 'barney', '&', 'pebbles']
```

## 检索
### _.startsWith([string=''], [target], [position=0])
检查字符串string是否以`target`开头。
```js
_.startsWith('abc', 'a');
// => true
 
_.startsWith('abc', 'b');
// => false
 
_.startsWith('abc', 'b', 1);
// => true
```

### _.endsWith([string=''], [target], [position=string.length])

检查字符串string是否以给定的target字符串结尾;如果字符串string以target字符串结尾，那么返回 true，否则返回 false

```js
_.endsWith('abc', 'c');
// => true
 
_.endsWith('abc', 'b');
// => false
 
_.endsWith('abc', 'b', 2);
// => true
```

## 替换
### _.replace([string=''], pattern, replacement)
替换string字符串中匹配的`pattern`为给定的`replacement`
:::warning 注意：
这个方法基于[String#replace](https://mdn.io/String/replace). 
:::
```js
_.replace('Hi Fred', 'Fred', 'Barney');
// => 'Hi Barney'
```



### _.trim([string=''], [chars=whitespace])
从string字符串中移除前面和后面的 空格 或 指定的字符。
```js
_.trim('  abc  ');
// => 'abc'
 
_.trim('-_-abc-_-', '_-');
// => 'abc'
 
_.map(['  foo  ', '  bar  '], _.trim);
// => ['foo', 'bar']
```

### _.trimStart([string=''], [chars=whitespace])
从string字符串中移除前面的 空格 或 指定的字符。

```js
_.trimStart('  abc  ');
// => 'abc  '
 
_.trimStart('-_-abc-_-', '_-');
// => 'abc-_-'
```

### _.trimEnd([string=''], [chars=whitespace])
从string字符串中移除后面的 空格 或 指定的字符。
```js
_.trimEnd('  abc  ');
// => '  abc'
 
_.trimEnd('-_-abc-_-', '_-');
// => '-_-abc'
```


### _.pad([string=''], [length=0], [chars=' '])
如果string字符串长度小于 length 则从左侧和右侧填充字符。 如果没法平均分配，则截断超出的长度。
:::more 参数：
- [string=''] (string): 要填充的字符串。
- [length=0] (number): 填充的长度。
- [chars=' '] (string): 填充字符。
:::
```js
_.pad('abc', 8);
// => '  abc   '
 
_.pad('abc', 8, '_-');
// => '_-abc_-_'
 
_.pad('abc', 3);
// => 'abc'
```
### _.padStart([string=''], [length=0], [chars=' '])
如果string字符串长度小于 length 则在左侧填充字符。 如果超出length长度则截断超出的部分。
```js
_.padStart('abc', 6);
// => '   abc'
 
_.padStart('abc', 6, '_-');
// => '_-_abc'
 
_.padStart('abc', 3);
// => 'abc'
```

### _.padEnd([string=''], [length=0], [chars=' '])
如果string字符串长度小于 length 则在右侧填充字符。 如果超出length长度则截断超出的部分。
```js
_.padEnd('abc', 6);
// => 'abc   '
 
_.padEnd('abc', 6, '_-');
// => 'abc_-_'
 
_.padEnd('abc', 3);
// => 'abc'
```

## 其它
### _.parseInt(string, [radix=10])
转换string字符串为指定基数的整数。 如果基数是 `undefined` 或者 `0`，则`radix`基数默认是10，如果`string`字符串是16进制，则`radix`基数为 16。
:::warning 注意：
注意: 这个方法与ES5 implementation 的 parseInt是一样的。
:::
```js
_.parseInt('08');
// => 8
 
_.map(['6', '08', '10'], _.parseInt);
// => [6, 8, 10]
```

### _.repeat([string=''], [n=1])
重复 N 次给定字符串
```js
_.repeat('*', 3);
// => '***'
 
_.repeat('abc', 2);
// => 'abcabc'
 
_.repeat('abc', 0);
// => ''
```

### _.truncate([string=''], [options=])
截断string字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以`omission`代替，`omission`默认是 "..."。
:::more 参数
[string=''] (string): 要截断的字符串。
[options=] (Object): 选项对象。
[options.length=30] (number): 允许的最大长度。
[options.omission='...'] (string): 超出后的代替字符。
[options.separator] (RegExp|string): 截断点。
:::
```js
_.truncate('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': ' '
});
// => 'hi-diddly-ho there,...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': /,? +/
});
// => 'hi-diddly-ho there...'
 
_.truncate('hi-diddly-ho there, neighborino', {
  'omission': ' [...]'
});
// => 'hi-diddly-ho there, neig [...]'
```



### _.template([string=''], [options=])
创建一个预编译模板方法，可以插入数据到模板中`"interpolate"`分隔符相应的位置。 HTML会在`"escape"`分隔符中转换为相应实体。 在`"evaluate"`分隔符中允许执行JavaScript代码。 在模板中可以自由访问变量。 如果设置了选项对象，则会优先覆盖[_.templateSettings](https://www.lodashjs.com/docs/lodash.template#templateSettings)的值。
:::warning 注意：
在开发过程中，构建[_.template](https://www.lodashjs.com/docs/lodash.template#template)可以使用[sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)， 便于调试。
了解更多预编译模板的信息查看[lodash的自定义构建文档](https://lodash.com/custom-builds)。
了解更多 Chrome 沙箱扩展的信息查看[Chrome的扩展文档](https://developer.chrome.com/extensions/sandboxingEval)。
:::

:::more 参数：
- [string=''] (string): 模板字符串.
- [options=] (Object): 选项对象.
- [options.escape=_.templateSettings.escape] (RegExp): "escape" 分隔符.
- [options.evaluate=_.templateSettings.evaluate] (RegExp): "evaluate" 分隔符.
- [options.imports=_.templateSettings.imports] (Object): 导入对象到模板中作为自由变量。
- [options.interpolate=_.templateSettings.interpolate] (RegExp): "interpolate" 分隔符。
- [options.sourceURL='lodash.templateSources[n]'] (string): 模板编译的来源URL。
- [options.variable='obj'] (string): 数据对象的变量名。
:::
```js
// 使用 "interpolate" 分隔符创建编译模板
var compiled = _.template('hello <%= user %>!');
compiled({ 'user': 'fred' });
// => 'hello fred!'
 
// 使用 HTML "escape" 转义数据的值
var compiled = _.template('<b><%- value %></b>');
compiled({ 'value': '<script>' });
// => '<b><script></b>'
 
// 使用 "evaluate" 分隔符执行 JavaScript 和 生成HTML代码
var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 在 "evaluate" 分隔符中使用内部的 `print` 函数
var compiled = _.template('<% print("hello " + user); %>!');
compiled({ 'user': 'barney' });
// => 'hello barney!'
 
// 使用 ES 分隔符代替默认的 "interpolate" 分隔符
var compiled = _.template('hello ${ user }!');
compiled({ 'user': 'pebbles' });
// => 'hello pebbles!'
 
// 使用自定义的模板分隔符
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var compiled = _.template('hello {{ user }}!');
compiled({ 'user': 'mustache' });
// => 'hello mustache!'
 
// 使用反斜杠符号作为纯文本处理
var compiled = _.template('<%= "\\<%- value %\\>" %>');
compiled({ 'value': 'ignored' });
// => '<%- value %>'
 
// 使用 `imports` 选项导入 `jq` 作为 `jQuery` 的别名
var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
compiled({ 'users': ['fred', 'barney'] });
// => '<li>fred</li><li>barney</li>'
 
// 使用 `sourceURL` 选项指定模板的来源URL
var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
compiled(data);
// => 在开发工具的 Sources 选项卡 或 Resources 面板中找到 "greeting.jst"
 
// 使用 `variable` 选项确保在编译模板中不声明变量
var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
compiled.source;
// => function(data) {
//   var __t, __p = '';
//   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
//   return __p;
// }
 
// 使用 `source` 特性内联编译模板
// 便以查看行号、错误信息、堆栈
fs.writeFileSync(path.join(cwd, 'jst.js'), '\
  var JST = {\
    "main": ' + _.template(mainText).source + '\
  };\
');
```