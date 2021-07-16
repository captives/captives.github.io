# 新建文档

使用心得测试

```js
v-slot:abc="scope" 
```
等价于
```js
slot="abc" slot-scope="scope"
```

<template v-slot:abc="scope">
    A： {{scope.data}}
</template>

<ul slot="abc" slot-scope="scope">
   <li>B：{{scope.data}}</li>
</ul>
<hr/>
