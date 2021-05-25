// test = async () => {

//     await (() => {
//         setTimeout(()=>{
//             console.log('1111');
//         }, 3000);
//     })()

//     await (() => {
//         setTimeout(()=>{
//             console.log('2222');
//         }, 3000);
//     })()

//     console.log('44444');
// }

// test();




const a = (delay) => {
    return 1;
    // return new Promise((resolve, reject) => {
    //     resolve('成功' + delay);
    // });
}

const b = (delay) => {
    setTimeout(() => {
        return 3;
    });
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         console.log('-----', delay);
    //         resolve('成功' + delay);
    //     }, delay);
    // });
}

const c =() => {
    console.log(' ===c');
}

const test = async () => {
    var count = 1000;
    await a(3000);
    console.log('----a over----');
    await b(2000);
    console.log('--- b over-----');
    console.log(count);
    c();
}
// test();

console.log(2222);
setTimeout(()=>{
    console.log(1111);
});

console.log(33333);

