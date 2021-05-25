## 浏览器选项卡获取焦点和失去焦点
<div id="example1">
  监听 <input type="checkbox" v-model="listened">
</div>

<script>
new Vue({
    el: '#example1',
    data: {
        listened: false
    },
    methods: {
        changeHandler() {
            if (this.listened) {
                if (document.visibilityState == "hidden") {
                    document.title = "选项卡被隐藏";
                } else {
                    document.title = "选项卡被激活";
                }
            }
        }
    },
    created() {
        document.addEventListener("visibilitychange", this.changeHandler);
    }
})
</script>

```js
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        document.title = "选项卡被隐藏";
    }else{
        document.title = "选项卡被激活";
    }
});
```

## 浏览器选项卡关闭 
<div id="example2">
   监听  <input type="checkbox" v-model="listened">
</div>

<script>
new Vue({
    el: '#example2',
    data: {
        listened: false
    },
    methods: {
        changeHandler(e) {
            if (this.listened) {
                var confirmationMessage = "要记得保存！你确定要离开我吗？";
                (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
                return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
            }
        }
    },
    created() {
        window.addEventListener("beforeunload", this.changeHandler);
    }
})
</script>

```js
window.addEventListener("beforeunload", (e) => {
    if (this.listened) {
        var confirmationMessage = "要记得保存！你确定要离开我吗？";
        (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
        return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
    }
});
```

## 页面开始打印/打印结束后事件

<div id="example3">
   监听 <input type="checkbox" v-model="listened">
</div>

<script>
new Vue({
    el: '#example3',
    data: {
        listened: false
    },
    created() {
        window.addEventListener("beforeprint", (event) => {
            if (this.listened) {
                document.title = "打印开始，准备点什么";
            }
            console.log('beforeprint', event);
        });

        window.addEventListener("afterprint", (event) => {
            if (this.listened) {
                document.title = "打印完成，做点什么";
            }
            console.log('打印完成', event);
        });
    }
})
</script>

```js
window.addEventListener("beforeprint", function (event) {
    console.log('准备打印', event);
});

window.addEventListener("afterprint", function (event) {
    console.log('打印完成/取消', event);
});
```


## 其它页面更改存储触发

<div id="example4">
    监听 <input type="checkbox" v-model="listened">
    <ul>
        <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
</div>

<script>
new Vue({
    el: '#example4',
    data: {
        listened: false,
	list: []
    },
    created() {
        window.addEventListener("storage", (event) => {
            if (this.listened) {
                this.list.push(event.key + ' 键已经从 ' + event.oldValue + ' 改变为 ' + event.newValue + '.');
                console.log("其它页面更新存储", event.key + ' 键已经从 ' + event.oldValue + ' 改变为 ' + event.newValue + '.');
            }
        });
    }
})
</script>

```js
window.addEventListener("storage", function (event) {
    console.log("其它页面更新存储", event.key + ' 键已经从 ' + event.oldValue + ' 改变为 ' + event.newValue + '.');
});
```

---
- script 
- //cn.vuejs.org/js/vue.min.js