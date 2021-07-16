# url 编解码

<div id="example">
<p>输入 </p>
<textarea v-model="text" style="width: 80%;height:100px"> </textarea>

<button>URL编码</button>  <button>URL解码</button> <button>清空</button> 

<p>输出</p>
<div v-html="value"></div>
</div>

<script>
new Vue({
    el: '#example',
    data: {
        text: "",
	value: "",
list: [],
    },
	methods:{
	 urlEncodeHandler() {
      this.value = encodeURIComponent(this.textInput);
      this.list = [];
    },
    urlDecodeHandler() {
      this.textOutput = decodeURIComponent(this.textInput);
      this.list = this.textOutput.split("&");
    },
    clean() {
      this.textInput = this.textOutput = null;
    }
}
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
