# url 编解码

<div id="example">
  <p>输入 </p>
  <textarea v-model="textInput" style="width: 80%;height:100px"> </textarea>
  <br />
  <button @click="urlEncodeHandler">URL编码</button>
   <button @click="urlDecodeHandler">URL解码</button>
  <button @click="clean">清空</button>
  <br />
  <div>
      <p>输出</p>
      <p>{{textOutput}}</p>
  </div>
  <div>
      <p>参数解析</p>
      <ol>
          <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ol>
  </div>
</div>

<script>
new Vue({
    el: "#example",
    data: {
        textInput: "",
        textOutput: "",
        list: [],
    },
    methods: {
        urlEncodeHandler() {
            this.value = encodeURIComponent(this.textInput);
            this.list = [];
        },
        urlDecodeHandler() {
            this.textOutput = decodeURIComponent(this.textInput);
            this.list = this.textOutput.match(/(\w+):\/\/([^/:]+):(\d*)([^?]*)([^&].*)(#[^#]*)/);
        },
        clean() {
            this.textInput = this.textOutput = null;
        },
    },
});
</script>

:::more 正则说明
- 实例中的数组包含 7 个元素，索引 0 对应的是整个字符串，索引 1 对应第一个匹配符（括号内），以此类推。
- 第一个括号子表达式捕获 Web 地址的协议部分。该子表达式匹配在冒号和两个正斜杠前面的任何单词。
- 第二个括号子表达式捕获地址的域地址部分。子表达式匹配非 : 和 / 之后的一个或多个字符。
- 第三个括号子表达式捕获端口号（如果指定了的话）。该子表达式匹配冒号后面的零个或多个数字。只能重复一次该子表达式。
- 第四个括号子表达式捕获 Web 地址指定的路径和 / 或页信息。该子表达式能匹配不包括 # 或空格字符的任何字符序列。
- 第五个括号表达式捕获query参数
第六个括号表达式捕获hash参数
:::

```js
encodeURIComponent(this.textInput);

decodeURIComponent(this.textInput);
```
<hr/>
<script type="text/javascript" src="//cn.vuejs.org/js/vue.min.js"></script>
