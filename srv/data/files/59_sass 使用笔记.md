# Sass 使用笔记

Sass 是世界上最成熟、稳定、强大的专业级 CSS 扩展语言。
![](https://sass.bootcss.com/assets/img/illustrations/glasses-2087d741.svg)

## 快速开始
Sass 是一种 CSS 的预编译语言。Sass还提供了CSS中还不存在的特性：变量(Variables)、嵌套(Nesting)、片段(Partials)、 混合(Mixins)、 扩展(Extend)、函数（functions）等功能，并且完全兼容 CSS 语法，让编写CSS 代码变得再次有趣。

Sass 能够帮助复杂的样式表更有条理， 并且易于在项目内部或跨项目共享设计。 

[视频学习](https://ninghao.net/video/2096)

### 安装(Install)
node环境安装
```sh
npm install -g sass
```
:::warning
这种方式安装的 Sass 是纯 JavaScript 实现的，运行的速度比这里列出的其它安装方式安装的Sass要稍微慢一些。
但是接口是完全一致的，所以，如果你需要 更快的执行速度，请使用其他方式重新安装Sass ！
:::
Mac OS X（通过Homebrew安装）
可以按照如下命令安装 Dart Sass：
```sh
brew install sass/sass/sass
```
### 注释(Annotation)
正常编译后，多行注释会保留；压缩编译`--style compressed`，所有注释都会移除
```scss
//这是单行注释
/** 这是多行块注释 **/
/*!
　　重要注释！版权声明
*/
```
多行注释后增加`!`为重要注视，即使压缩编译也会被保留；

### 预处理(Preprocessing)
最直接的方式就是在命令行中调用`sass`命令。安装Sass之后，你就可以用`sass`命令将Sass编译为CSS了。
首先你需要告诉Sass从哪个文件开始构建，以及将生成的 CSS 输出到哪里。
```sh
sass input.scss output.css
```
还可以利用`--watch`参数来监视单个文件或目录;`--watch`参数告诉Sass监听源文件的变化，并在每次保存Sass文件时重新编译为CSS。
```sh
sass --watch input.scss output.css
```
可以使用文件夹路径作为输入和输出， 并使用冒号分隔它们，来监听文件并输出到目录。
```sh
sass --watch app/sass:public/css
```
`--style` 参数提供输出风格：
- `expanded`：默认格式，没有缩进、扩展的css代码。
- `compressed`：压缩后的css代码,移除所有注释(强制注释除外)。
```sh
sass --watch sass:css --style compressed
```

### 变量(Variables)
Sass 使用`$`符号作为变量的标志。
变量是存储信息并在将来重复利用的一种方式，在整个样式表中都可访问。 
在样式表顶层声明的变量是全局的,在块中声明的变量，只能在它们声明的块内访问；

你可以在变量中存储颜色、字体 或任何 CSS 值，并在将来重复利用。例如：
scss
```css
$font-size:22px;
$font-color:#FFF;
$primary-color:teal;
body {
    $font-color:red;

    width: 100%;
    color: $font-color;
    font-size: $font-size;
}
```
css
```css
body {
  width: 100%;
  color: red;
  font-size: 22px;
}
```
如果需要在局部范围内（例如在`mixin`中）设置全局变量的值，则可以使用`!global`标志,标记`!global`的变量将始终分配给全局；
scss
```css
$variable: first global value;

.content {
  $variable: second global value !global;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```
css
```css
.content {
  value: second global value;
}

.sidebar {
  value: second global value;
}
```


Sass核心库提供了一组用于处理变量的高级函数：
- `meta.variable-exists` 该函数返回具有给定名称的变量是否存在于当前作用域中；
- `meta.global-variable-exists` 该函数执行相同的操作但仅针对全局作用域。

### 嵌套(Nesting)
在编写HTML时，您可能已经注意到它有一个清晰的嵌套和可视化层次结构，而CSS则没有。
Sass 允许您嵌套 CSS 选择器，嵌套方式 与 HTML 的视觉层次结构相同。
scss
```css
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
css 
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```
:::warning 注意
过度嵌套的规则 将导致过度限定的CSS，这些CSS可能很难维护，并且通常被认为是不好的做法。
:::

属性也可以嵌套，比如`border-color`属性，可以写成：
scss
```css
p {
    border: {
        color: red;
    }
    &:hover {
        background: blue;
    }
}
```
css
```
p {
  border-color: red;
}

p:hover {
  background: blue;
}
```
:::warning 注意
border后面必须加上冒号;
在嵌套的代码块内，可以使用`&`引用父元素。
:::

#### @at-root
Sass 3.3.0中新增的功能，用来跳出选择器嵌套, 摆脱样式规则。
默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器。
:::more 示例
scss
```css
//没有跳出
.parent-1 {
    color:#f00;
    .child {
        width:100px;
    }
}

//单个选择器跳出
.parent-2 {
    color:#f00;
    @at-root .child {
        width:200px;
    }
}

//多个选择器跳出
.parent-3 {
    background:#f00;
    @at-root {
        .child1 {
            width:300px;
        }
        .child2 {
            width:400px;
        }
    }
}
```
css
```css
.parent-1 {
  color: #f00;
}

.parent-1 .child {
  width: 100px;
}

.parent-2 {
  color: #f00;
}

.child {
  width: 200px;
}

.parent-3 {
  background: #f00;
}

.child1 {
  width: 300px;
}

.child2 {
  width: 400px;
}
```
:::
#### @at-root(without:…)和@at-root(with:…)
默认`@at-root`只会跳出选择器嵌套，而不能跳出`@media`或`@support`，如果要跳出这两种，则需使用`@at-root(without:media)`，`@at-root(without:support)`。这个语法的关键词有四个：
- 1、all（表示所有）
- 2、rule（默认值，表示常规css）
- 3、media（表示media）
- 4、support（表示support，因为@support目前还无法广泛使用，所以在此不表）。
:::more 示例
scss
```css
/*跳出父级元素嵌套*/
@media print {
    .parent1{
        color:#f00;
        @at-root .child1 {
            width:200px;
        }
    }
}

/*跳出media嵌套，父级有效*/
@media print {
    .parent2{
        color:#f00;
        @at-root (without: media) {
            .child2 {
                width:200px;
            }
        }
    }
}

/*跳出media和父级*/
@media print {
    .parent3{
        color:#f00;
        @at-root (without: all) {
            .child3 {
                width:200px;
            }
        }
    }
}
```
css
```css
@charset "UTF-8";
/*跳出父级元素嵌套*/
@media print {
  .parent1 {
    color: #f00;
  }
  .child1 {
    width: 200px;
  }
}

/*跳出media嵌套，父级有效*/
@media print {
  .parent2 {
    color: #f00;
  }
}

.child2 {
  width: 200px;
}

/*跳出media和父级*/
@media print {
  .parent3 {
    color: #f00;
  }
}

.child3 {
  width: 200px;
}
:::

#### @at-root与&
scss
```css
.child{
    @at-root .parent &{
        color:#f00;
    }
}
```
css
```css
.parent .child {
  color: #f00;
}
```

### 片段(Partials)
你可以创建部分Sass文件，其中可以包含在其他Sass文件中的CSS片段，这是一个很好的方法来帮助你模块化CSS， 并保持css更容易维护。片段代码需要`_`开头命名文件名，sass会认为这是片段，不会生成对应的css文件；


### 模块(Modules)
你不必把所有的Sass都写在一个文件中。你可以用`@use`规则任意分割。此规则将另一个Sass文件作为模块加载，这意味着可以使用基于文件名的命名空间在Sass文件中引用其变量、mixin和函数。

该`@use`规则是主要代替`@import`, 它使 CSS、变量、mixin 和来自另一个样式表的函数可在当前样式表中访问。默认情况下，变量、mixin 和函数在基于URL基本名称的命名空间中可用 。

除了命名空间之外，`@use`和 之间还有一些重要的区别`@import`：
- `@use`只执行一个样式表并包含它的CSS一次，无论该样式表被使用多少次。
- `@use`仅使名称在当前样式表中可用，而不是全局可用。
- 名称以`-`or`_`开头的成员对于带有`@use`的当前样式表是私有的
- 如果样式表包含`@extend`，则该扩展只应用于它导入的样式表，而不应用于导入它的样式表。

请注意，占位符选择器没有命名空间，但它们确实认为是私有的。参考：[The Module System is Launched](https://sass.bootcss.com/blog/the-module-system-is-launched)

_footer.scss
```css
$font-size:30px;
.footer {
    font-size: 20px;
    color: $primary-color; //错误，$primary-color访问不到
}
```
scss
```css
$font-size:22px;
$font-color:#FFF;
$primary-color:teal;
@use 'base';
@use '_footer' as footer;
body {
    width: base.$width;
    color: $font-color;
    font-size: footer.$font-size;
}
```

:::warning 注意
在`@use 'base';`中没有扩展名，这是不需要的，sass很聪明，它会帮我们解决
:::


### 混合(Mixins)
Mixins是Sass中的一个强大的功能。使用`@mixin`根据功能定义一个模块，然后在需要使用的地方通过`@include`来调用声明的mixins。

scss
```css
@mixin css3($property, $value) {
    @each $prefix in -webkit-, -moz-, -ms-, -o-, '' {
        #{$prefix}#{$property}: $value;
    }
}

.border_radius {
    @include css3(transition, 0.5s);
}
```
css
```css
.border_radius {
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -ms-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
}
```

要创建mixin，请使用`@mixin`指令为其命名。我们还在括号内使用变量`$property`，这样我们就可以传递任何我们想要的转换。创建mixin之后，可以将其用作CSS声明，以`@include`开头，后跟mixin的名称。

> [Compass](http://compass-style.org/)是一个Sass的`mixins`库，里面包括了很多有用的功能模块，比如说`border-radius`和`box-shadow`等;
参考：SASS基础 [10个常见的Mixins](https://www.w3cplus.com/preprocessor/ten-best-common-mixins.html)、[10个有用的Sass Mixins](https://www.w3cplus.com/preprocessor/css-shapes-reference-boxes.html)

### 扩展(Extend)和继承(Inheritance)
`@extend`是Sass的一项功能，它允许类彼此共享一组属性。 在Sass中`@extend`类的选择器将在其扩展的类旁边添加选择器，从而产生一个逗号分隔的列表。
scss
```css
.block {
    color: black;
    border: 1px solid black;
}

.block a {
    font-weight: bold;
}

.card {
    @extend .block;
    background-color: red;
}
```
css
```css
.block, .card {
  color: black;
  border: 1px solid black;
}

.block a, .card a {
  font-weight: bold;
}

.card {
  background-color: red;
}

```
`@extend`优点:
- 更干净HTML类
- 减少CSS重复
- 节省时间和精力
:::error 注意：
`@extend`会大大增加CSS文件的大小，并且在不加保护的情况下影响CSS的性能。
:::

### 操作符(Operators)
在CSS中经常需要做数学计算。Sass 支持一些标准的**数学运算符**，例如`+`、`-`、`*`、`/`和`%`。在下面的例子中，我们将做一些简单的数学运算来计算出`aside`&`article`的宽度。
scss
```css
@use 'sass:math';
article[role="main"] {
    float: left;
    width: math.div(600rpx, 960rpx) * 100%;
}

aside[role="complementary"] {
    float: right;
    width: math.div(330px, 960px) * 100%;
}
```
css
```css
article[role=main] {
  float: left;
  width: 62.5%;
}

aside[role=complementary] {
  float: right;
  width: 34.375%;
}
```
上述代码创建了一个非常简单的流式网格，以**960px**作为基准。Sass中的内置模块和操作符让我们可以做一些比如将像素值转换为百分比的操作，并且使用起来非常简单。



## 内置
### 模块(Modules)
- `sass:math`模块提供对[数字](https://sass.bootcss.com/documentation/values/numbers)进行操作的函数。
- `sass:string` 模块提供对[字符串](https://sass.bootcss.com/documentation/values/strings)进行操作的函数。
- `sass:color`模块基于现有[颜色](https://sass.bootcss.com/documentation/values/colors)生成新颜色，从而轻松构建颜色主题。
- `sass:list`模块允许您访问和修改[列表](https://sass.bootcss.com/documentation/values/lists)中的值。
- `sass:map`模块可以在[map](https://sass.bootcss.com/documentation/values/maps)中查找与键关联的值，等等。
- `sass:selector`模块提供对Sass强大的[选择器引擎](https://sass.bootcss.com/documentation/modules/selector)的访问。
- `sass:meta`模块公开了 Sass[内部工作](https://sass.bootcss.com/documentation/modules/meta)的细节。

### 全局函数(Function)
### HSL/HSLA
色相Hue、饱和度Saturation、亮度Lightness、透明度Alpha；
- hsl($hue $saturation $lightness)
- hsl($hue $saturation $lightness / $alpha)
- hsl($hue, $saturation, $lightness, $alpha: 1)
- hsla($hue $saturation $lightness)
- hsla($hue $saturation $lightness / $alpha)
- hsla($hue, $saturation, $lightness, $alpha: 1) //alpha (0-1/0%-100%)

色相(H)是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。


色环上的0度、120度、240度位置，分别对应了RGB模型的红、绿、蓝三原色。原色两两混合形成了二次色。比如黄色（60度）就是由红色和绿色混合而成；蓝色和绿色则相加形成青色（180度）；品红（300度）则由红蓝两色组成。


饱和度(S)是指色彩的纯度，饱和度越高色彩越纯越浓，饱和度越低则色彩变灰变淡，取0-100%的数值。
**图略**

亮度（Lightness）指的是色彩的明暗程度，亮度值越高，色彩越白，亮度越低，色彩越黑,取0-100%的数值。
**图略**

把色相（Hue）、饱和度（Saturation）和亮度（Lightness）三个属性整合到一个圆柱中，就形成了HSL色彩空间模型:

**图略**

HSL圆柱中的任意一个点，都对应了一种颜色。圆环上的度数代表了颜色的色相，离中轴的距离代表了颜色的饱和度，点的高度则对应了颜色的亮度。

示例：
scss
```css
div {
    border-top: 5px solid hsl(210deg 100% 20%);
    border-right: 5px solid hsl(210 100% 20%);
    border-bottom: 5px solid hsla(210deg 100% 20% / 60%);
    border-left: 5px solid hsla(210deg, 100%, 20%, 60%);
}
```
css
```css
div {
  border-top: 5px solid #003366;
  border-right: 5px solid #003366;
  border-bottom: 5px solid rgba(0, 51, 102, 0.6);
  border-left: 5px solid rgba(0, 51, 102, 0.6);
}
```

### RGB/RGBA
- rgb($red $green $blue)
- rgb($red $green $blue / $alpha)
- rgb($red, $green, $blue, $alpha: 1)
- rgb($color, $alpha)
- rgba($red $green $blue)
- rgba($red $green $blue / $alpha)
- rgba($red, $green, $blue, $alpha: 1)
- rgba($color, $alpha) //=> color 

scss
```css
div {
    border-top: 5px solid rgb(210 21 210);
    border-right: 5px solid rgb(210 21 210);
    border-bottom: 5px solid rgba(210 21 210 / 60%);
    border-left: 5px solid rgba(210, 21, 210, 60%);
}
```
css
```css
div {
  border-top: 5px solid #d215d2;
  border-right: 5px solid #d215d2;
  border-bottom: 5px solid rgba(210, 21, 210, 0.6);
  border-left: 5px solid rgba(210, 21, 210, 0.6);
}

```
### 内置颜色函数
```css
　　lighten(#cc3, 10%) // #d6d65c
　　darken(#cc3, 10%) // #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c
```

### IF
- if($condition, $if-true, $if-false) 

如果`$condition`为==truthy==，则返回`$if(true)`，否则返回`$if(false)`。
此函数的特殊之处在于它甚至不计算未返回的参数，因此即使未使用的参数会引发错误，也可以安全地调用。
scss
```css
font-size: if(true, 20px, 30px);	//20px
font-size: if(false, 20px, 30px);	//30px
font-size: if(null, 20px, 30px);	//30px
font-size: if(2, 20px, 30px);		//20px
```

## 控制指令
### 条件语句`if`、`if-else`
```css
　　p {
　　　　@if 1 + 1 == 2 { border: 1px solid; }
　　　　@if 5 < 3 { border: 2px dotted; }
　　}
```
```css
p {
    @if lightness($color) {
        border: 1px solid;
    } @else {
        border: 2px dotted;
    }
}
```

### 循环语句`for`、`while`、`each`
```css
p {
    @for $i from 1 to 10 {
        .border-#{$i} {
            border: #{$i}px solid blue;
        }
    }
}
```
```css
p {
    $i: 6;
    @while $i>0 {
        .item-#{$i} {
            width: 2em * $i;
        }
        $i: $i - 2;
    }
}
```
```css
@mixin css3($property, $value) {
    @each $prefix in -webkit-, -moz-, -ms-, -o-, '' {
        #{$prefix}#{$property}: $value;
    }
}
```

### 自定义函数`function`
SASS允许用户编写自己的函数:
```css
@function double($n) {
    @return $n * 2;
}

#sidebar {
    width: double(5px);
}
```

