/**
 * xxjc.fun 自动登陆签到工具
 */
const puppeteer = require('puppeteer');
const async = require('async');

const host = "https://xxjc.fun";
const path = "/auth/login";
const options = { headless: false }

let browser = null;
const worker = (item) => {
    return new Promise(async(resolve, reject) => {

        const page = await browser.newPage();
        page.on('load', async() => {
            const location = await page.evaluate(() => {
                return window.location;
            });

            console.log('加载完成', location.href);

            if (location.pathname === '/auth/login') {
                console.log('进入登陆页，自动签到,账号', item.emil);
                await page.type("#email", item.emil);
                await page.type("#passwd", item.pwd);
                await page.click("#login");
                await page.waitForNavigation({ waitUntil: 'load' }, console.log("登陆成功跳转")); //加载完成后跳转
            }

            if (location.pathname === '/user') {
                console.log('进入用户中心');
                //签到
                const checkin = await page.$("#checkin");
                if (checkin) {
                    console.log('自动签到');
                    await page.click("#checkin");
                }

                const total = await page.$eval('body.page-orange', el => {
                    let data = { today: el.querySelector(".progressbar .tag-red").innerText, before: el.querySelector(".progressbar .tag-orange").innerText, total: el.querySelector('#remain').innerHTML };
                    el.querySelector("a[href='/user/logout']").click();
                    return data;
                })
                console.log('总量', total);

                if (!page.isClosed()) {
                    console.log('退出');
                    await page.close();
                    resolve(total);
                }
            }
        });
        await page.goto(host + path, { waitUntil: 'domcontentloaded' }, console.log("请求", host + path));
    })
}

const run = (list) => {
    return new Promise(async(resolve, reject) => {
        browser = await puppeteer.launch(options);
        async.mapSeries(list, (item, callback) => {
            worker(item).then(data => {
                data.emil = item.emil;
                callback(null, data);
            });
        }, (err, result) => {
            browser.close();
            err ? reject(err) : resolve(result);
        })
    })
}

module.exports = run;