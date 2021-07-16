# \n 和 \<br/\> 互转

<div id="example">
<p>输入</p>
<textarea v-model="text"> </textarea>
<p>text输出</p>
<div>{{ text }}</div>
<p>html输出</p>
<div v-html="html"></div>
</div>

<script>
new Vue({
    el: '#example',
    data: {
        text: "",
    },
   computed: {
    html() {
      let lines = this.text.split("\n");
      //去除空行
      return lines.filter((item) => item.trim() != "").join("<br/>");
    },
  },
})
</script>

```js
//回车换行符转换成HTML格式
formatTextToHtml(value) {
    if (!value) {
        return "";
    }
    let lines = value.split("\n");
    lines = lines.map((item) => item.trim());
    //去除空行
    return lines.filter((item) => item != "").join("<br/>");
},

//HTML格式转换成回车换行符
formatHtmlToText(value) {
    if (!value) {
        return "";
    }
    let lines = value.split("<br/>");
    lines = lines.map((item) => item.trim());
    //去除空行
    return lines.filter((item) => item != "").join("\n");
},
```
<hr/>
<script type="text/javascript" src="//cn.vuejs.org/js/vue.min.js"></script>
