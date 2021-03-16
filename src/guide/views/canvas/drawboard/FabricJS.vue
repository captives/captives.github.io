<template>
  <el-main>
    <h2>简介</h2>
    
    <p>
      Fabric.js是一个可以简化canvas程序编写的库。
      Fabric.js为canvas提供所缺少的对象模型, svg parser,
      交互和一整套其他不可或缺的工具。基于MIT协议开源，在github上有许多人贡献代码。<a href="https://github.com/Rookie-Birds/Fabric-Tutorial_zh-CN" target="_blank">中文教程</a>
    </p>

    <h3>配置参数</h3>

    <ul>
      <li>width宽：number</li>
      <li>height高：number</li>
      <li>fill填充颜色：string</li>
      <li>stroke描边颜色:string</li>
      <li>strokeWidth描边宽度：number</li>
      <li>angle角度:number</li>
      <li>left左边距:number</li>
      <li>top上边距:number</li>
      <li>originX横轴中心点:['center'|'left'|'right]</li>
      <li>originY纵轴中心点:['center|'top'|'bottom']</li>
      <li>flipX水平翻转:boolean</li>
      <li>flipY垂直翻转：boolean</li>
      <li>
        <p>
          更多配置参数请参考：<a href="http://fabricjs.com/docs/fabric.Object.html" rel="nofollow noreferrer" target="_blank">fabric.Object</a>，以及其子类
        </p>
      </li>
    </ul>

    <h3>对象</h3>
    <ul>
      <li>fabric.Circle 圆</li>
      <li>fabric.Ellipse 椭圆</li>
      <li>fabric.Line 直线</li>
      <li>fabric.Polygon</li>
      <li>fabric.Polyline</li>
      <li>fabric.Rect 矩形</li>
      <li>fabric.Triangle 三角形</li>
    </ul>

    <h3>方法</h3>
    <ul>
      <li>add(object) 添加</li>
      <li>insertAt(object,index) 添加</li>
      <li>remove(object) 移除</li>
      <li>forEachObject 循环遍历</li>
      <li>getObjects() 获取所有对象</li>
      <li>item(int) 获取子项</li>
      <li>isEmpty() 判断是否空画板</li>
      <li>size() 画板元素个数</li>
      <li>contains(object) 查询是否包含某个元素</li>
      <li>fabric.util.cos</li>
      <li>fabric.util.sin</li>
      <li>fabric.util.drawDashedLine 绘制虚线</li>
      <li>getWidth() setWidth()</li>
      <li>getHeight()</li>
      <li>clear() 清空</li>
      <li>renderAll() 重绘</li>
      <li>requestRenderAll() 请求重新渲染</li>
      <li>rendercanvas() 重绘画板</li>
      <li>getCenter().top/left 获取中心坐标</li>
      <li>toDatalessJSON() 画板信息序列化成最小的json</li>
      <li>toJSON() 画板信息序列化成json</li>
      <li>moveTo(object,index) 移动</li>
      <li>dispose() 释放</li>
      <li>setCursor() 设置手势图标</li>
      <li>getSelectionContext()获取选中的context</li>
      <li>getSelectionElement()获取选中的元素</li>
      <li>getActiveObject() 获取选中的对象</li>
      <li>getActiveObjects() 获取选中的多个对象</li>
      <li>discardActiveObject()取消当前选中对象</li>
      <li>isType() 图片的类型</li>
      <li>setColor(color) = canvas.set("full","");</li>
      <li>rotate() 设置旋转角度</li>
      <li>setCoords() 设置坐标</li>
    </ul>

    <h3>常用属性</h3>
    <ul>
      <li>canvas.isDrawingMode = true; 可以自由绘制</li>
      <li>canvas.selectable = false; 控件不能被选择，不会被操作</li>
      <li>canvas.selection = true; 画板显示选中</li>
      <li>canvas.skipTargetFind = true; 整个画板元素不能被选中</li>
      <li>canvas.freeDrawingBrush.color = "#E34F51" 设置自由绘画笔的颜色</li>
      <li>freeDrawingBrush.width 自由绘笔触宽度</li>
    </ul>

    <h3>IText的方法</h3>
    <ul>
      <li>selectAll() 选择全部</li>
      <li>getSelectedText() 获取选中的文本</li>
      <li>exitEditing() 退出编辑模式</li>
    </ul>

    <h3>样式修改</h3>
    <ul>
      <li>canvas.selectionLineWidth = 1; //拖曳区块边框</li>
      <li>
        canvas.selectionBorderColor = "rgb(121, 187, 255)";
        //设定拖曳区块边框颜色
      </li>
      <li>
        canvas.selectionColor = "rgba(236, 245, 255, 0.25)"; //拖曳区块背景顏色
      </li>
      <li>canvas.selectionDashArray = [5, 5]; //设定拖曳区块虚线样式</li>
    </ul>

    <h3>知识点</h3>
    <ul>
      <li>
        //1: 获得画布上的所有对象：<br />
        var items = canvas.getObjects();
      </li>

      <li>
        //2: 设置画布上的某个对象为活动对象。<br />
        canvas.setActiveObject(items[i]);
      </li>

      <li>
        //3：获得画布上的活动对象<br />
        canvas.getActiveObject()
      </li>

      <li>
        //4：取消画布中的所有对象的选中状态。<br />
        canvas.discardActiveObject();
      </li>

      <li>
        //5: 设置画布中的对象的某个属性值，比如第 0 个对象的 id<br />
        var items = canvas.getObjects();<br />
        tems[0].id ="items_id0" 或 items[0].set("id","items_id0")
      </li>

      <li>
        //6：获得画布中对象的某个属性，比如 第0 个对象的 id<br />
        var items = canvas.getObjects();<br />
        items[0].id;<br />
        //或<br />
        items[0].get("id");<br />
      </li>
      <li>
        //7:
        重新渲染一遍画布，当画布中的对象有变更，在最后显示的时候，需要执行一次该操作<br />
        canvas.renderAll()
      </li>

      <li>
        //8: 清除画布中所有对象：<br />
        canvas.clear();
      </li>

      <li>
        //9:清除画布中的活动对象：<br />
        var t = canvas.getActiveObject(); t && canvas.remove(t);
      </li>

      <li>
        //10: 设置活动对象在画布中的层级<br />
        var t = canvas.getActiveObject();<br />
        canvas.sendBackwards(t) //向下跳一层<br />
        canvas.sendToBack(t) //向下跳底层：<br />
        canvas.bringForward(t) //向上跳一层：<br />
        canvas.bringToFront(t) //向上跳顶层：<br />
        //或者：<br />
        t.sendBackwards();<br />
        t.sendToBack();<br />
        t.bringForward();<br />
        t.bringToFront();<br />
      </li>
      <li>
        //11：当选择画布中的对象时，该对象不出现在顶层。<br />
        canvas.preserveObjectStacking = true;
      </li>
    </ul>
  </el-main>
</template>
<script>
export default {
  name: "FabricJS",
};
</script>
