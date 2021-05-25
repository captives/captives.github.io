const list = [3, 5, 2, 15, 4, 25, 19, 27, 56, 48, 14, 43, 34];
console.log(list);

/***************************************************************
 * 交换数据方式
 ***************************************************************/
function exchange(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return [a, b];
}
console.log("数据交换 %s-%s =>", 3, 6, exchange(3, 6));

/***************************************************************
 * 
 * 
 ***************************************************************/
function exchange2(a, b) {
    a = b - a + (b = a);

    //  等价于, 如：a = 6 - 3 + (b = 3)
    // let c = b - a;
    // b = a;
    // a = c - b;

    return [a, b];
}

console.log("数据交换 %s-%s =>", 3, 6, exchange2(3, 6));

/***************************************************************
 * 异或操作交换变量
 * 等价于 a = (b = (a ^= b) ^ b) ^ a;
 ***************************************************************/
function exchange3(a, b) {
    console.log(a, b);
    a ^= b;
    console.log(a, b);
    b ^= a;
    console.log(b, a);
    a ^= b;
    console.log(a, b);
    return [a, b];
}

console.log("数据交换 %s-%s =>", 3, 6, exchange3(3, 6));

/***************************************************************
 * 冒泡排序（Bubble Sort）
 * 冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两
 * 个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进
 * 行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来
 * 是因为越小的元素会经由交换慢慢“浮”到数列的顶端。 
 * 
 * 算法描述
 * -1、比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * -2、对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 * -3、针对所有的元素重复以上的步骤，除了最后一个；
 * -4、重复步骤1~3，直到排序完成。

 * 冒泡排序 -1- 需要中间变量交换数据
 * 每一位和后一位相比较，最后一位不需要比较
 ***************************************************************/
function sortA(array) {
    let list = [].concat(array);
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                let temp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = temp;
            }
        }
    }
    return list;
}

console.warn("源数据", list);
console.log("排序后", sortA(list));
/**
 * 冒泡排序 -1- 不需要中间变量交换数据
 * 每一位和后一位相比较，最后一位不需要比较
 */
function sortB(array) {
    let list = [].concat(array);
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
            if (list[j] > list[j + 1]) {
                list[j] = list[j] + list[j + 1];
                list[j + 1] = list[j] - list[j + 1];
                list[j] = list[j] - list[j + 1];
            }
        }
    }
    return list;
}

console.warn("源数据", list);
console.log("排序后", sortA(list));



init = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('-----', delay);
            resolve('成功' + delay);
        }, delay);
    });
},

async test() {
    var a = 1000;
    a = await this.init(3000);
    a = await this.init(2000);
    console.log(a);
}