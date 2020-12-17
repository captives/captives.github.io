<template>
  <el-main id="content" class="article text-content">
    <article id="wikiArticle">
      <p>
        CanvasRenderingContext2D 接口提供的 2D 渲染背景用来绘制
        <span style="line-height: inherit">
          <a
            href="/zh-CN/docs/Web/HTML/Element/canvas"
            title="<canvas>元素可被用来通过脚本（通常是JavaScript）绘制图形。比如,它可以被用来绘制图形,制作图片集合,甚至用来实现动画效果。你可以(也应该)在元素标签内写入可提供替代的的代码内容，这些内容将会在在旧的、不支持<canvas>元素的浏览器或是禁用了JavaScript的浏览器内渲染并展现。"
          >
            <code>&lt;canvas&gt;</code> </a
          >元素，为了获得这个接口的对象，需要在 &lt;canvas&gt; 上调用
        </span>
        <a
          href="/zh-CN/docs/Web/API/HTMLCanvasElement/getContext"
          title="HTMLCanvasElement.getContext()&nbsp;方法返回canvas 的上下文，如果上下文没有定义则返回 null ."
        >
          <code>getContext()</code> </a
        >&nbsp;
        <span style="line-height: inherit">，并提供一个 "2d" 的参数：</span>
      </p>

      <vue-code>
        <pre lang="javascript">
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
</pre
        >
      </vue-code>

      <p>一旦你得到 2D 渲染背景后，你可以像下面一样绘制：</p>

      <vue-code>
        <pre lang="javascript">
ctx.fillStyle = "rgb(200,0,0)";  
ctx.fillRect(10, 10, 55, 50); 
</pre
        >
      </vue-code>

      <p>
        在侧边栏和下面查看属性和方法。 Canvas 教程提供了更多的信息，例子和资源。
      </p>

      <h2
        id="绘制矩形"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        绘制矩形
      </h2>

      <p>以下是3个绘制矩形位图的方法。</p>

      <p>
        <a
          href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect"
          title="The CanvasRenderingContext2D.clearRect() 是 Canvas 2D API 设置指定矩形区域内（以 点&nbsp;(x, y)&nbsp;为起点，范围是(width, height)&nbsp;）所有像素变成透明，并擦除之前绘制的所有内容的方法。"
        >
          <code>CanvasRenderingContext2D.clearRect()</code>
        </a>
      </p>

      <dl>
        <dd>
          设置指定矩形区域内（以 点&nbsp;
          <em>(x, y)</em>&nbsp;为起点，范围是
          <em>(width, height)</em
          >&nbsp;）所有像素变成透明，并擦除之前绘制的所有内容。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect"
            title="CanvasRenderingContext2D.fillRect()&nbsp;是Canvas 2D API 绘制填充矩形的方法。矩形的起点在&nbsp;(x, y) 位置，矩形的尺寸是&nbsp;width 和&nbsp;height ，fillStyle 属性决定矩形的样式。"
          >
            <code>CanvasRenderingContext2D.fillRect()</code>
          </a>
        </dt>
        <dd>
          绘制填充矩形，矩形的起点在&nbsp;
          <em>(x, y)&nbsp;</em>位置，矩形的尺寸是&nbsp;
          <em>width</em>&nbsp;和&nbsp; <em>height&nbsp;</em>。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect"
            title="CanvasRenderingContext2D.strokeRect() 是 Canvas 2D API 在 canvas 中，使用当前的绘画样式，描绘一个起点在&nbsp;(x, y)&nbsp;、宽度为&nbsp;w&nbsp;、高度为&nbsp;h 的矩形的方法。"
          >
            <code>CanvasRenderingContext2D.strokeRect()</code>
          </a>
        </dt>
        <dd>
          在 canvas 中，使用当前的绘画样式，描绘一个起点在&nbsp;
          <em>(x, y)</em>&nbsp;、宽度为 <em>&nbsp;w</em>&nbsp;、高度为&nbsp;
          <em>h</em>&nbsp;的矩形。
        </dd>
      </dl>

      <h2
        id="绘制文本"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        绘制文本
      </h2>

      <p>
        下面是绘制文本的方法。 参见
        <a
          href="/zh-CN/docs/Web/API/TextMetrics"
          title="在 canvas 中，TextMetrics 接口表示文本的尺寸，通过&nbsp;CanvasRenderingContext2D.measureText() 方法创建。"
        >
          <code>TextMetrics</code>
        </a>
        对象获取文本属性。
      </p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText"
            title="CanvasRenderingContext2D.fillText()&nbsp;是&nbsp;Canvas 2D API 在&nbsp;(x, y)位置填充文本的方法。如果选项的第四个参数提供了最大宽度，文本会进行缩放以适应最大宽度。"
          >
            <code>CanvasRenderingContext2D.fillText()</code>
          </a>
        </dt>
        <dd>在(x,y)位置绘制（填充）文本。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeText"
            title="CanvasRenderingContext2D.strokeText() 是 Canvas 2D API 在给定的&nbsp;(x, y) 位置绘制文本的方法。如果提供了表示最大值的第四个参数，文本将会缩放适应宽度。"
          >
            <code>CanvasRenderingContext2D.strokeText()</code>
          </a>
        </dt>
        <dd>在(x,y)位置绘制（描边）文本。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText"
            title="CanvasRenderingContext2D.measureText()&nbsp;方法返回一个 TextMetrics 对象，包含关于文本尺寸的信息（例如文本的宽度）。"
          >
            <code>CanvasRenderingContext2D.measureText()</code>
          </a>
        </dt>
        <dd>
          返回
          <a
            href="/zh-CN/docs/Web/API/TextMetrics"
            title="在 canvas 中，TextMetrics 接口表示文本的尺寸，通过&nbsp;CanvasRenderingContext2D.measureText() 方法创建。"
          >
            <code>TextMetrics</code>
          </a>
          对象。
        </dd>
      </dl>

      <h2 id="线型" style="margin-bottom: 20px; font-size: 2.14285714285714rem">
        线型
      </h2>

      <p>下面的方法和属性控制如何绘制线。</p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth"
            title="The CanvasRenderingContext2D.lineWidth&nbsp;是&nbsp;Canvas 2D API 设置线段厚度的属性（即线段的宽度）。"
          >
            <code>CanvasRenderingContext2D.lineWidth</code>
          </a>
        </dt>
        <dd>
          线的宽度。默认&nbsp;
          <code>1.0</code>
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap"
            title="CanvasRenderingContext2D.lineCap 是 Canvas 2D API 指定如何绘制每一条线段末端的属性。有3个可能的值，分别是：butt, round and square。默认值是&nbsp;butt。"
          >
            <code>CanvasRenderingContext2D.lineCap</code>
          </a>
        </dt>
        <dd>
          线末端的类型。 允许的值：&nbsp;
          <code>butt</code>&nbsp;(默认),&nbsp; <code>round</code>,&nbsp;
          <code>square</code>.
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin"
            title="CanvasRenderingContext2D.lineJoin 是 Canvas 2D API 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。"
          >
            <code>CanvasRenderingContext2D.lineJoin</code>
          </a>
        </dt>
        <dd>
          定义两线相交拐点的类型。允许的值：
          <code style="font-style: normal">round</code>,&nbsp;
          <code style="font-style: normal">bevel</code>,&nbsp;
          <code style="font-style: normal">miter</code>(默认)。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit"
            title="The CanvasRenderingContext2D.miterLimit 是 Canvas 2D API 设置斜接面限制比例的属性。 当获取属性值时， 会返回当前的值（默认值是10.0 ）。当给属性赋值时， 0、负数、 Infinity 和 NaN 都会被忽略；除此之外都会被赋予一个新值。"
          >
            <code>CanvasRenderingContext2D.miterLimit</code>
          </a>
        </dt>
        <dd>
          斜接面限制比例。默认&nbsp;
          <code>10。</code>
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/getLineDash"
            title="CanvasRenderingContext2D.getLineDash()&nbsp;是 Canvas 2D API 获取当前线段样式的方法。"
          >
            <code>CanvasRenderingContext2D.getLineDash()</code>
          </a>
        </dt>
        <dd>返回当前线段样式的数组，数组包含一组数量为偶数的非负数数字。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash"
            title="Canvas 2D API的CanvasRenderingContext2D接口的setLineDash()方法在填充线时使用虚线模式。 它使用一组值来指定描述模式的线和间隙的交替长度。"
          >
            <code>CanvasRenderingContext2D.setLineDash()</code>
          </a>
        </dt>
        <dd>设置当前的线段样式。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset"
            title="CanvasRenderingContext2D.lineDashOffset&nbsp;是&nbsp;Canvas 2D API 设置虚线偏移量的属性，例如可以实现 “蚂蚁线“&nbsp;的效果。"
          >
            <code>CanvasRenderingContext2D.lineDashOffset</code>
          </a>
        </dt>
        <dd>描述在哪里开始绘制线段。</dd>
      </dl>

      <h2
        id="文本样式"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        文本样式
      </h2>

      <p>下面的属性控制如何设计文本。</p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/font"
            title="CanvasRenderingContext2D.font 是 Canvas 2D API 描述绘制文字时，当前字体样式的属性。 使用和&nbsp;CSS font 规范相同的字符串值。 默认字体是 10px sans-serif."
          >
            <code>CanvasRenderingContext2D.font</code>
          </a>
        </dt>
        <dd>
          字体设置。 默认值&nbsp;
          <code>10px sans-serif。</code>
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/textAlign"
            title="CanvasRenderingContext2D.textAlign 是 Canvas 2D API 描述绘制文本时，文本的对齐方式的属性。注意，该对齐是基于CanvasRenderingContext2D.fillText方法的x的值。所以如果textAlign=&quot;center&quot;，那么该文本将画在 x-50%*width。"
          >
            <code>CanvasRenderingContext2D.textAlign</code>
          </a>
        </dt>
        <dd>
          文本对齐设置。 允许的值：&nbsp;
          <code>start</code>&nbsp;(默认),&nbsp; <code>end</code>,&nbsp;
          <code>left</code>,&nbsp; <code>right</code>&nbsp;或&nbsp;
          <code>center</code>.
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/textBaseline"
            title="CanvasRenderingContext2D.textBaseline 是 Canvas 2D API 描述绘制文本时，当前文本基线的属性。"
          >
            <code>CanvasRenderingContext2D.textBaseline</code>
          </a>
        </dt>
        <dd>
          基线对齐设置。 允许的值：&nbsp;
          <code>top</code>,&nbsp; <code>hanging</code>,&nbsp;
          <code>middle</code>,&nbsp; <code>alphabetic</code>&nbsp;(默认),
          <code>ideographic</code>,&nbsp; <code>bottom</code>.
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/direction"
            title="CanvasRenderingContext2D.direction 是Canvas 2D API 用来在绘制文本时，描述当前文本方向的属性。"
          >
            <code>CanvasRenderingContext2D.direction</code>
          </a>
        </dt>
        <dd>
          文本的方向。&nbsp;允许的值：&nbsp;
          <code>ltr, rtl</code>,&nbsp; <code>inherit</code>&nbsp;(默认).
        </dd>
      </dl>

      <h2
        id="填充和描边样式"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        填充和描边样式
      </h2>

      <p>填充设计用于图形内部的颜色和样式，描边设计用于图形的边线。</p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle"
            title="CanvasRenderingContext2D.fillStyle 是Canvas 2D API 使用内部方式描述颜色和样式的属性。默认值是&nbsp;#000&nbsp;（黑色）。"
          >
            <code>CanvasRenderingContext2D.fillStyle</code>
          </a>
        </dt>
        <dd>
          图形内部的颜色和样式。 默认&nbsp;
          <code>#000</code>&nbsp;(黑色).
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle"
            title="CanvasRenderingContext2D.strokeStyle&nbsp;是&nbsp;Canvas 2D API 描述画笔（绘制图形）颜色或者样式的属性。默认值是&nbsp;#000 (black)。"
          >
            <code>CanvasRenderingContext2D.strokeStyle</code>
          </a>
        </dt>
        <dd>
          图形边线的颜色和样式。&nbsp;默认&nbsp;
          <code>#000</code>&nbsp;(黑色).
        </dd>
      </dl>

      <h2
        id="渐变和图案"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        渐变和图案
      </h2>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient"
            title="CanvasRenderingContext2D.createLinearGradient()方法创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性 CanvasGradient对象。"
          >
            <code>CanvasRenderingContext2D.createLinearGradient()</code>
          </a>
        </dt>
        <dd>创建一个沿着参数坐标指定的线的线性渐变。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/createRadialGradient"
            title="CanvasRenderingContext2D.createRadialGradient()&nbsp;是&nbsp;Canvas 2D API 根据参数确定两个圆的坐标，绘制放射性渐变的方法。这个方法返回 CanvasGradient。"
          >
            <code>CanvasRenderingContext2D.createRadialGradient()</code>
          </a>
        </dt>
        <dd>创建一个沿着参数坐标指定的线的放射性性渐变。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/createPattern"
            title="CanvasRenderingContext2D.createPattern()&nbsp;是&nbsp;Canvas 2D API&nbsp;使用指定的图像&nbsp;(CanvasImageSource)创建模式的方法。 它通过repetition参数在指定的方向上重复元图像。此方法返回一个CanvasPattern对象。"
          >
            <code>CanvasRenderingContext2D.createPattern()</code>
          </a>
        </dt>
        <dd>
          使用指定的图片 (a
          <a
            href="/zh-CN/docs/Web/API/CanvasImageSource"
            title="CanvasImageSource&nbsp;是一个辅助类型，描述下面类型的任何一个对象：HTMLImageElement, HTMLVideoElement, HTMLCanvasElement, CanvasRenderingContext2D, 或&nbsp;ImageBitmap."
          >
            <code>CanvasImageSource</code> </a
          >)创建图案。通过 repetition 变量指定的方向上重复源图片。此方法返回
          <a
            href="/zh-CN/docs/Web/API/CanvasPattern"
            title="CanvasPattern 接口表示描述一个模板（基于image, canvas或video）的不透明对象，通过 CanvasRenderingContext2D.createPattern() 方法创建."
          >
            <code>CanvasPattern</code> </a
          >对象。
        </dd>
      </dl>

      <h2 id="阴影" style="margin-bottom: 20px; font-size: 2.14285714285714rem">
        阴影
      </h2>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur"
            title="CanvasRenderingContext2D.shadowBlur 是 Canvas 2D API 描述模糊效果程度的属性；&nbsp;它既不对应像素值也不受当前转换矩阵的影响。&nbsp;默认值是 0。"
          >
            <code>CanvasRenderingContext2D.shadowBlur</code>
          </a>
        </dt>
        <dd>
          描述模糊效果。 默认&nbsp;
          <code>0</code>
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor"
            title="CanvasRenderingContext2D.shadowColor 是 Canvas 2D API 描述阴影颜色的属性。"
          >
            <code>CanvasRenderingContext2D.shadowColor</code>
          </a>
        </dt>
        <dd>阴影的颜色。&nbsp;默认fully-transparent black.</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX"
            title="CanvasRenderingContext2D.shadowOffsetX 是 Canvas 2D API 描述阴影水平偏移距离的属性。"
          >
            <code>CanvasRenderingContext2D.shadowOffsetX</code>
          </a>
        </dt>
        <dd>阴影水平方向的偏移量。 默认&nbsp;0.</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY"
            title="CanvasRenderingContext2D.shadowOffsetY 是 Canvas 2D API 描述阴影垂直偏移距离的属性。"
          >
            <code>CanvasRenderingContext2D.shadowOffsetY</code>
          </a>
        </dt>
        <dd>阴影垂直方向的偏移量。 默认&nbsp;0.</dd>
      </dl>

      <h2 id="路径" style="margin-bottom: 20px; font-size: 2.14285714285714rem">
        路径
      </h2>

      <p>下面的方法用来操作对象的路径。</p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/beginPath"
            title="CanvasRenderingContext2D.beginPath() 是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法。&nbsp;当你想创建一个新的路径时，调用此方法。"
          >
            <code>CanvasRenderingContext2D.beginPath()</code>
          </a>
        </dt>
        <dd>
          清空子路径列表开始一个新的路径。当你想创建一个新的路径时，调用此方法。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/closePath"
            title="CanvasRenderingContext2D.closePath() 是 Canvas 2D API 将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。 如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。"
          >
            <code>CanvasRenderingContext2D.closePath()</code>
          </a>
        </dt>
        <dd>
          使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/moveTo"
            title="CanvasRenderingContext2D.moveTo() 是 Canvas 2D API 将一个新的子路径的起始点移动到(x，y)坐标的方法。"
          >
            <code>CanvasRenderingContext2D.moveTo()</code>
          </a>
        </dt>
        <dd>将一个新的子路径的起始点移动到(x，y)坐标。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineTo"
            title="CanvasRenderingContext2D.lineTo() 是 Canvas 2D API 使用直线连接子路径的终点到x，y坐标的方法（并不会真正地绘制）。"
          >
            <code>CanvasRenderingContext2D.lineTo()</code>
          </a>
        </dt>
        <dd>使用直线连接子路径的最后的点到x,y坐标。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo"
            title="CanvasRenderingContext2D.bezierCurveTo() 是 Canvas 2D API 绘制三次贝赛尔曲线路径的方法。 该方法需要三个点。&nbsp;第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用&nbsp;moveTo() 进行修改。"
          >
            <code>CanvasRenderingContext2D.bezierCurveTo()</code>
          </a>
        </dt>
        <dd>
          添加一个3次贝赛尔曲线路径。该方法需要三个点。&nbsp;第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用&nbsp;
          <code style="font-style: normal">moveTo()</code>&nbsp;进行修改。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo"
            title="CanvasRenderingContext2D.quadraticCurveTo() 是 Canvas 2D API 新增二次贝塞尔曲线路径的方法。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用&nbsp;moveTo() 方法进行改变。"
          >
            <code>CanvasRenderingContext2D.quadraticCurveTo()</code>
          </a>
        </dt>
        <dd>添加一个2次贝赛尔曲线路径。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc"
            title="CanvasRenderingContext2D.arc() 是 Canvas 2D API 绘制圆弧路径的方法。 圆弧路径的圆心在&nbsp;(x, y) 位置，半径为 r&nbsp;，根据anticlockwise&nbsp;（默认为顺时针）指定的方向从&nbsp;startAngle 开始绘制，到&nbsp;endAngle&nbsp;结束。"
          >
            <code>CanvasRenderingContext2D.arc()</code>
          </a>
        </dt>
        <dd>
          绘制一段圆弧路径，&nbsp;圆弧路径的圆心在&nbsp;
          <em>(x, y)</em>&nbsp;位置，半径为 <em>&nbsp;r</em>&nbsp;，根据
          <em>anticlockwise</em>&nbsp;（默认为顺时针）指定的方向从&nbsp;
          <em>startAngle</em>&nbsp;开始绘制，到&nbsp;
          <em>endAngle</em>&nbsp;结束。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/arcTo"
            title="CanvasRenderingContext2D.arcTo()&nbsp;是&nbsp;Canvas 2D API&nbsp;根据控制点和半径绘制圆弧路径，使用当前的描点(前一个moveTo或lineTo等函数的止点)。根据当前描点与给定的控制点1连接的直线，和控制点1与控制点2连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。"
          >
            <code>CanvasRenderingContext2D.arcTo()</code>
          </a>
        </dt>
        <dd>
          根据控制点和半径绘制圆弧路径，使用当前的描点(前一个moveTo或lineTo等函数的止点)。根据当前描点与给定的控制点1连接的直线，和控制点1与控制点2连接的直线，作为使用指定半径的圆的
          <strong>切线</strong>，画出两条切线之间的弧线路径。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/ellipse"
            title="CanvasRenderingContext2D.ellipse() 是 Canvas 2D API 添加椭圆路径的方法。椭圆的圆心在（x,y）位置，半径分别是radiusX&nbsp;和&nbsp;radiusY&nbsp;，按照anticlockwise（默认顺时针）指定的方向，从&nbsp;startAngle &nbsp;开始绘制，到&nbsp;endAngle&nbsp;结束。"
          >
            <code>CanvasRenderingContext2D.ellipse()</code>
          </a>
          <span title="这是一个实验性的 API，请尽量不要在生产环境中使用它。">
            <i class="icon-beaker"></i>
          </span>
        </dt>
        <dd>
          添加一个椭圆路径，椭圆的圆心在（x,y）位置，半径分别是
          <em>radiusX</em>&nbsp;和&nbsp; <em>radiusY</em>&nbsp;，按照
          <em>anticlockwise</em>&nbsp;（默认顺时针）指定的方向，从&nbsp;
          <em>startAngle&nbsp;</em>&nbsp;开始绘制，到&nbsp;
          <em>endAngle</em>&nbsp;结束。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/rect"
            title="CanvasRenderingContext2D.rect() 是 Canvas 2D API 创建矩形路径的方法，矩形的起点位置是&nbsp;(x, y) ，尺寸为&nbsp;width 和&nbsp;height。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。"
          >
            <code>CanvasRenderingContext2D.rect()</code>
          </a>
        </dt>
        <dd>
          创建一个矩形路径，矩形的起点位置是&nbsp;
          <em>(x, y)&nbsp;</em>，尺寸为&nbsp; <em>width</em>&nbsp;和&nbsp;
          <em>height</em>。
        </dd>
      </dl>

      <h2
        id="绘制路径"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        绘制路径
      </h2>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill"
            title="CanvasRenderingContext2D.fill() 是 Canvas 2D API 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。"
          >
            <code>CanvasRenderingContext2D.fill()</code>
          </a>
        </dt>
        <dd>使用当前的样式填充子路径。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/stroke"
            title="CanvasRenderingContext2D.stroke() 是 Canvas 2D API 使用非零环绕规则，根据当前的画线样式，绘制当前或已经存在的路径的方法。"
          >
            <code>CanvasRenderingContext2D.stroke()</code>
          </a>
        </dt>
        <dd>使用当前的样式描边子路径。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawFocusIfNeeded"
            title="CanvasRenderingContext2D.drawFocusIfNeeded() 是 Canvas 2D API 用来给当前路径或特定路径绘制焦点的方法，如果给定的元素获取了焦点。"
          >
            <code>CanvasRenderingContext2D.drawFocusIfNeeded()</code>
          </a>
        </dt>
        <dd>
          如果给定的元素获取了焦点，那么此方法会在当前的路径绘制一个焦点。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/scrollPathIntoView"
            title="CanvasRenderingContext2D.scrollPathIntoView() 是 Canvas 2D API 将当前或给定的路径滚动到窗口的方法。类似于 Element.scrollIntoView()。"
          >
            <code>CanvasRenderingContext2D.scrollPathIntoView()</code>
          </a>
        </dt>
        <dd>将当前或给定的路径滚动到窗口。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/clip"
            title="CanvasRenderingContext2D.clip() 是 Canvas 2D API 将当前创建的路径设置为当前剪切路径的方法。"
          >
            <code>CanvasRenderingContext2D.clip()</code>
          </a>
        </dt>
        <dd>
          从当前路径创建一个剪切路径。在 &nbsp;
          <strong
            style="
              font-family: courier new, andale mono, monospace;
              font-weight: bold;
            "
            >clip()&nbsp;</strong
          >调用之后，绘制的所有信息只会出现在剪切路径内部。例如： 参见
          Canvas教程中的&nbsp;
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing"
            title="Clipping paths"
            >剪切路径</a
          >&nbsp;。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/isPointInPath"
            title="CanvasRenderingContext2D.isPointInPath()是 Canvas 2D API 用于判断在当前路径中是否包含检测点的方法。"
          >
            <code>CanvasRenderingContext2D.isPointInPath()</code>
          </a>
        </dt>
        <dd>判断当前路径是否包含检测点。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/isPointInStroke"
            title="CanvasRenderingContext2D.isPointInStroke()是&nbsp;Canvas 2D API 用于检测某点是否在路径的描边线上的方法。"
          >
            <code>CanvasRenderingContext2D.isPointInStroke()</code>
          </a>
        </dt>
        <dd>判断检测点是否在路径的描边线上。</dd>
      </dl>

      <h2 id="变换" style="margin-bottom: 20px; font-size: 2.14285714285714rem">
        变换
      </h2>

      <p>
        在
        <strong
          style="
            font-family: courier new, andale mono, monospace;
            font-weight: bold;
          "
          >CanvasRenderingContext2D&nbsp;</strong
        >渲染背景中的对象会有一个当前的变换矩阵，一些方法可以对其进行控制。当创建当前的默认路径，绘制文本、图形和
        <a
          href="/zh-CN/docs/Web/API/Path2D"
          title="Canvas 2D API 的接口 Path2D&nbsp;用来声明路径，此路径稍后会被CanvasRenderingContext2D 对象使用。CanvasRenderingContext2D&nbsp;接口的 路径方法&nbsp;也存在于 Path2D 这个接口中，允许你在 canvas 中根据需要创建可以保留并重用的路径。"
        >
          <code>Path2D</code> </a
        >对象的时候，会应用此变换矩阵。下面列出的方法保持历史和兼容性的原因，是为了
        <a rel="nofollow" class="new" title="此页面仍未被本地化, 期待您的翻译!">
          <code>SVGMatrix</code> </a
        >对象现在能够应用于大部分 API&nbsp;，将来会被替换。
      </p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/currentTransform"
            title="CanvasRenderingContext2D.currentTransform&nbsp;属性，表示当前变换的矩阵。可以通过Canvas2D API 返回或者赋值为SVGMatrix对象。"
          >
            <code>CanvasRenderingContext2D.currentTransform</code>
          </a>
        </dt>
        <dd>
          当前的变换矩阵 (
          <a
            rel="nofollow"
            class="new"
            title="此页面仍未被本地化, 期待您的翻译!"
          >
            <code>SVGMatrix</code>
          </a>
          对象)。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/rotate"
            title="CanvasRenderingContext2D.rotate() 是 Canvas 2D API 在变换矩阵中增加旋转的方法。角度变量表示一个顺时针旋转角度并且用弧度表示。"
          >
            <code>CanvasRenderingContext2D.rotate()</code>
          </a>
        </dt>
        <dd>
          在变换矩阵中增加旋转，角度变量表示一个顺时针旋转角度并且用弧度表示。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/scale"
            title="CanvasRenderingContext2D.scale() 是 Canvas 2D API 根据 x 水平方向和 y 垂直方向，为canvas 单位添加缩放变换的方法。"
          >
            <code>CanvasRenderingContext2D.scale()</code>
          </a>
        </dt>
        <dd>根据 x 水平方向和 y 垂直方向，为canvas 单位添加缩放变换。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate"
            title="CanvasRenderingContext2D.translate() 是 Canvas 2D API 通过在网格中移动 canvas 和 canvas&nbsp;原点&nbsp;x 水平方向、原点&nbsp;y 垂直方向，添加平移变换的方法。"
          >
            <code>CanvasRenderingContext2D.translate()</code>
          </a>
        </dt>
        <dd>
          通过在网格中移动 canvas 和 canvas&nbsp;原点&nbsp;x
          水平方向、原点&nbsp;y 垂直方向，添加平移变换
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/transform"
            title="CanvasRenderingContext2D.transform() 是 Canvas 2D API 使用矩阵多次叠加当前变换的方法，矩阵由方法的参数进行描述。你可以缩放、旋转、移动和倾斜上下文。"
          >
            <code>CanvasRenderingContext2D.transform()</code>
          </a>
        </dt>
        <dd>使用方法参数描述的矩阵多次叠加当前的变换矩阵。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/setTransform"
            title="CanvasRenderingContext2D.setTransform() 是 Canvas 2D API 使用单位矩阵重新设置（覆盖）当前的变换并调用变换的方法，此变换由方法的变量进行描述。"
          >
            <code>CanvasRenderingContext2D.setTransform()</code>
          </a>
        </dt>
        <dd>
          重新设置当前的变换为单位矩阵，并使用同样的变量调用
          <strong
            style="
              font-family: courier new, andale mono, monospace;
              font-weight: bold;
            "
            >transform()&nbsp;</strong
          >方法。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/resetTransform"
            title="CanvasRenderingContext2D.resetTransform() 是 Canvas 2D API 使用单位矩阵重新设置当前变形的方法。"
          >
            <code>CanvasRenderingContext2D.resetTransform()</code>
          </a>
          <span title="这是一个实验性的 API，请尽量不要在生产环境中使用它。">
            <i class="icon-beaker"></i>
          </span>
        </dt>
        <dd>使用单位矩阵重新设置当前的变换。</dd>
      </dl>

      <h2 id="合成" style="margin-bottom: 20px; font-size: 2.14285714285714rem">
        合成
      </h2>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalAlpha"
            title="CanvasRenderingContext2D.globalAlpha 是 Canvas 2D API 用来描述在canvas上绘图之前，设置图形和图片透明度的属性。&nbsp;数值的范围从 0.0 （完全透明）到1.0 （完全不透明）。"
          >
            <code>CanvasRenderingContext2D.globalAlpha</code>
          </a>
        </dt>
        <dd>
          在合成到 canvas 之前，设置图形和图像透明度的值。默认&nbsp;
          <code style="font-style: normal">1.0</code>&nbsp;(不透明)。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation"
            title="Canvas 2D API的 CanvasRenderingContext2D.globalCompositeOperation &nbsp;属性设置要在绘制新形状时应用的合成操作的类型，其中type是用于标识要使用的合成或混合模式操作的字符串。"
          >
            <code>CanvasRenderingContext2D.globalCompositeOperation</code>
          </a>
        </dt>
        <dd>
          通过&nbsp;
          <code>globalAlpha</code
          >&nbsp;应用，设置如何在已经存在的位图上绘制图形和图像。
        </dd>
      </dl>

      <h2
        id="绘制图像"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        绘制图像
      </h2>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage"
            title="Canvas 2D API 中的&nbsp;CanvasRenderingContext2D.drawImage() 方法提供了多种方式在Canvas上绘制图像。"
          >
            <code>CanvasRenderingContext2D.drawImage()</code>
          </a>
        </dt>
        <dd>绘制指定的图片。该方法有多种格式，提供了很大的使用灵活性。</dd>
      </dl>

      <h2
        id="像素控制"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        像素控制
      </h2>

      <p>
        参见
        <a
          href="/zh-CN/docs/Web/API/ImageData"
          title="ImageData&nbsp;接口描述 <canvas> 元素的一个隐含像素数据的区域。使用&nbsp;ImageData() 构造函数创建或者使用和 canvas 在一起的 CanvasRenderingContext2D 对象的创建方法：&nbsp;createImageData() 和 getImageData()。也可以使用&nbsp;putImageData() 设置 canvas 的一部分。"
        >
          <code>ImageData</code>
        </a>
        对象。
      </p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/createImageData"
            title="CanvasRenderingContext2D.createImageData() 是 Canvas 2D API 创建一个新的、空白的、指定大小的 ImageData 对象。 所有的像素在新对象中都是透明的。"
          >
            <code>CanvasRenderingContext2D.createImageData()</code>
          </a>
        </dt>
        <dd>
          使用指定的尺寸，创建一个新的、空白的
          <a
            href="/zh-CN/docs/Web/API/ImageData"
            title="ImageData&nbsp;接口描述 <canvas> 元素的一个隐含像素数据的区域。使用&nbsp;ImageData() 构造函数创建或者使用和 canvas 在一起的 CanvasRenderingContext2D 对象的创建方法：&nbsp;createImageData() 和 getImageData()。也可以使用&nbsp;putImageData() 设置 canvas 的一部分。"
          >
            <code>ImageData</code>
          </a>
          对象。所有的像素在新对象中都是透明的。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData"
            title="CanvasRenderingContext2D.getImageData() 返回一个ImageData对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。"
          >
            <code>CanvasRenderingContext2D.getImageData()</code>
          </a>
        </dt>
        <dd>
          返回一个
          <a
            href="/zh-CN/docs/Web/API/ImageData"
            title="ImageData&nbsp;接口描述 <canvas> 元素的一个隐含像素数据的区域。使用&nbsp;ImageData() 构造函数创建或者使用和 canvas 在一起的 CanvasRenderingContext2D 对象的创建方法：&nbsp;createImageData() 和 getImageData()。也可以使用&nbsp;putImageData() 设置 canvas 的一部分。"
          >
            <code>ImageData</code>
          </a>
          对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为
          <em>(sx, sy)、</em>宽为 <em>sw、</em>高为 <em>sh</em>。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData"
            title="CanvasRenderingContext2D.putImageData()&nbsp;是 Canvas 2D API 将数据从已有的&nbsp;ImageData 对象绘制到位图的方法。 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。"
          >
            <code>CanvasRenderingContext2D.putImageData()</code>
          </a>
        </dt>
        <dd>
          将数据从已有的
          <a
            href="/zh-CN/docs/Web/API/ImageData"
            title="ImageData&nbsp;接口描述 <canvas> 元素的一个隐含像素数据的区域。使用&nbsp;ImageData() 构造函数创建或者使用和 canvas 在一起的 CanvasRenderingContext2D 对象的创建方法：&nbsp;createImageData() 和 getImageData()。也可以使用&nbsp;putImageData() 设置 canvas 的一部分。"
          >
            <code>ImageData</code>
          </a>
          绘制到位图上。&nbsp;如果提供了脏矩形，只能绘制矩形的像素。&nbsp;
        </dd>
      </dl>

      <h2
        id="图像平滑"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        图像平滑
      </h2>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled"
            title="CanvasRenderingContext2D.imageSmoothingEnabled 是 Canvas 2D API 用来设置图片是否平滑的属性，true表示图片平滑（默认值），false表示图片不平滑。当我们获取&nbsp;imageSmoothingEnabled 属性值时，&nbsp;它会返回最新设置的值。"
          >
            <code>CanvasRenderingContext2D.imageSmoothingEnabled</code>
          </a>
          <span title="这是一个实验性的 API，请尽量不要在生产环境中使用它。">
            <i class="icon-beaker"></i>
          </span>
        </dt>
        <dd>图像平滑的方式；如果禁用，缩放时，图像不会被平滑处理。</dd>
      </dl>

      <h2
        id="canvas_状态"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        canvas 状态
      </h2>

      <p>
        <strong
          style="
            font-family: courier new, andale mono, monospace;
            font-weight: bold;
          "
          >C</strong
        >
        <strong
          style="
            font-family: courier new, andale mono, monospace;
            font-weight: bold;
          "
          >anvasRenderingContext2D</strong
        >渲染环境包含了多种绘图的样式状态（属性有线的样式、填充样式、阴影样式、文本样式）。下面的方法会帮助你使用这些状态：
      </p>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/save"
            title="CanvasRenderingContext2D.save() 是 Canvas 2D API 通过将当前状态放入栈中，保存 canvas 全部状态的方法。"
          >
            <code>CanvasRenderingContext2D.save()</code>
          </a>
        </dt>
        <dd>
          使用栈保存当前的绘画样式状态，你可以使用
          <strong
            style="
              font-family: courier new, andale mono, monospace;
              font-weight: bold;
            "
            >restore()</strong
          >&nbsp;恢复任何改变。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/restore"
            title="CanvasRenderingContext2D.restore() 是 Canvas 2D API 通过在绘图状态栈中弹出顶端的状态，将 canvas&nbsp;恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。"
          >
            <code>CanvasRenderingContext2D.restore()</code>
          </a>
        </dt>
        <dd>
          恢复到最近的绘制样式状态，此状态是通过
          <strong
            style="
              font-family: courier new, andale mono, monospace;
              font-weight: bold;
            "
            >save()</strong
          >&nbsp;保存到”状态栈“中最新的元素。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/canvas"
            title="CanvasRenderingContext2D.canvas&nbsp;属性是&nbsp;Canvas API&nbsp;的一部分，是对与给定上下文关联的HTMLCanvasElement对象的只读引用。如果没有&nbsp;<canvas> 元素与之对应，对象值为null 。"
          >
            <code>CanvasRenderingContext2D.canvas</code>
          </a>
        </dt>
        <dd>
          对
          <a
            href="/zh-CN/docs/Web/API/HTMLCanvasElement"
            title="DOM canvas元素暴露了HTMLCanvasElement接口,该接口提供了用来操作一个canvas元素布局和呈现的属性和方法.HTMLCanvasElement接口继承了element接口的属性和方法."
          >
            <code>HTMLCanvasElement</code>
          </a>
          只读的反向引用。如果和
          <a
            href="/zh-CN/docs/Web/HTML/Element/canvas"
            title="<canvas>元素可被用来通过脚本（通常是JavaScript）绘制图形。比如,它可以被用来绘制图形,制作图片集合,甚至用来实现动画效果。你可以(也应该)在元素标签内写入可提供替代的的代码内容，这些内容将会在在旧的、不支持<canvas>元素的浏览器或是禁用了JavaScript的浏览器内渲染并展现。"
          >
            <code>&lt;canvas&gt;</code> </a
          >&nbsp;元素没有联系，可能为
          <a
            href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null"
            title="值&nbsp;null&nbsp;特指对象的值未设置。它是 JavaScript 基本类型 之一。"
          >
            <code>null</code> </a
          >。
        </dd>
      </dl>

      <h2
        id="点击区域"
        style="margin-bottom: 20px; font-size: 2.14285714285714rem"
      >
        点击区域
      </h2>

      <dl>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/addHitRegion"
            title="CanvasRenderingContext2D.addHitRegion()&nbsp;是&nbsp;Canvas 2D API 给位图添加点击区域的方法。 它允许你很容易地实现一个点击区域， 让你触发 DOM 元素的事件，&nbsp;去探索看不见的画布。"
          >
            <code>CanvasRenderingContext2D.addHitRegion()</code>
          </a>
          <span title="这是一个实验性的 API，请尽量不要在生产环境中使用它。">
            <i class="icon-beaker"></i>
          </span>
        </dt>
        <dd>给 canvas 添加点击区域。</dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/removeHitRegion"
            title="CanvasRenderingContext2D.removeHitRegion() 是 Canvas 2D API 删除canvas中已存在的碰撞区域的方法。"
          >
            <code>CanvasRenderingContext2D.removeHitRegion()</code>
          </a>
          <span title="这是一个实验性的 API，请尽量不要在生产环境中使用它。">
            <i class="icon-beaker"></i>
          </span>
        </dt>
        <dd>
          从 canvas 中删除指定
          <code style="font-style: normal">id</code>&nbsp;&nbsp;的点击区域。
        </dd>
        <dt>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearHitRegions"
            title="CanvasRenderingContext2D.clearHitRegions()&nbsp;是&nbsp;Canvas 2D API 在画布中删除所有点击区域的方法。"
          >
            <code>CanvasRenderingContext2D.clearHitRegions()</code>
          </a>
          <span title="这是一个实验性的 API，请尽量不要在生产环境中使用它。">
            <i class="icon-beaker"></i>
          </span>
        </dt>
        <dd>从 canvas 中删除所有的点击区域。</dd>
      </dl>

      <h4
        id="内部的_APIs_(chrome-context_特有的)"
        style="font-size: 1.28571428571429rem"
      >
        内部的 APIs (chrome-context 特有的)
      </h4>

      <dl>
        <dt>
          <span
            class="icon-only-inline"
            title="This API has not been standardized."
          >
            <i class="icon-warning-sign"></i>
          </span>
          <a
            rel="nofollow"
            class="new"
            title="此页面仍未被本地化, 期待您的翻译!"
          >
            <code>CanvasRenderingContext2D.asyncDrawXULElement()</code>
          </a>
        </dt>
        <dd>
          在
          <strong
            style="
              font-family: courier new, andale mono, monospace;
              font-weight: bold;
            "
            >canvas</strong
          >&nbsp;内渲染一个 XUL 元素的区域。
        </dd>
        <dt>
          <span
            class="icon-only-inline"
            title="This API has not been standardized."
          >
            <i class="icon-warning-sign"></i>
          </span>
          <a
            href="/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawWindow"
            title="CanvasRenderingContext2D.drawWindow() 是Canvas 2D API 在&nbsp;canvas&nbsp;内部渲染一个窗体区域的非标准的、内部使用的&nbsp;方法。&nbsp;窗口可视区的内容被渲染，忽略窗口的剪切和滚动。"
          >
            <code>CanvasRenderingContext2D.drawWindow()</code>
          </a>
        </dt>
        <dd>
          在&nbsp;
          <strong style="font-family: courier new, andale mono, monospace"
            >canvas</strong
          >&nbsp;内渲染一个窗口的区域。窗口可视区的内容被渲染，忽略窗口的剪切和滚动。
        </dd>
        <dt>
          <span
            class="icon-only-inline"
            title="This API has not been standardized."
          >
            <i class="icon-warning-sign"></i> </span
          >&nbsp;
          <code>CanvasRenderingContext2D.demote()</code>
        </dt>
        <dd>
          这个方法会引起当前的上下文使用后端的硬件加速作为软件的备选方案。所有的状态都会被保留。
        </dd>
      </dl>
    </article>
  </el-main>
</template>
<style lang="stylus" scoped>
h2{
    position: relative;
    margin-top: 60px;
    padding-top: 40px;
    border-top: 3px solid #3d7e9a;
    margin-bottom: 20px;
    font-size: 2.14285714285714rem;
}
a {
  color: #3d7e9a;
  text-decoration: none;
  font-size: 16px;
}
dt{
    margin-top: 20px;
}
</style>
