let list = [3, 5, 2, 15, 4, 0, 7, 56, 48, 14, 43, -10];
console.log("升序 ", [].concat(list).sort((a, b) => a - b));

function sort(list) {
    // 待排序数组
    for (let k = 0; k < list.length; k++) {
        console.log('\n\n第', k, "遍");
        // 已经排序序列
        for (let i = k; i >= 0; i--) {
            console.log(list[k], list[i], "排序序列", JSON.stringify(list.slice(0, i + 1)));
            if (list[k] > list[i]) {
                let temp = list[k]; //比较的值
                list.splice(i, 0, temp);
                list.splice(k + 1, 1);
            }
        }
    }
}

console.log(sort(list));
console.log(list);