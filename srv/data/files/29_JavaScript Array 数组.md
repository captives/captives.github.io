# Array 数组

## 数组去重 - indexOf()

```js
const list = [2, 1, 3, 45, 5, 4, 3, 2, 4, 5];

function distinct(list) {
    for (let i = 0; i < list.length; i++) {
        //如果有相同的值,不同的索引,删除当前数据
        if (list.indexOf(list[i]) != i) {
            list.splice(i, 1); 
            i--; //删除后索引回退
        }
    }
    return list;
}

console.log('before', list);
console.log('after', distinct(list));
```