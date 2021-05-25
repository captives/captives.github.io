/**
 * xxjc.fun 自动登陆签到工具
 */
const puppeteer = require('puppeteer');

const path = "/auth/login";
const options = { headless: true }

const run = async(host) => {
    host = host || "https://xxjc.fun";

    const browser = await puppeteer.launch(options);
    const pages = await browser.pages();
    const page = pages[0];
    page.on('load', async() => {
        const location = await page.evaluate(() => {
            return window.location;
        });
        console.log('加载完成', location.href);

        if (location.pathname === '/auth/login') {
            console.log('进入登陆页，自动登陆');
            await page.type("#email", "593278382@qq.com");
            await page.type("#passwd", "zhao123456");
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

            //总量查看
            const total = await page.$eval('#remain', el => el.innerHTML);
            console.log('总量', total);
        }

        setTimeout(() => {
            //退出执行下次任务
            if (!page.isClosed()) {
                page.close();
                browser.close();
                console.log('退出');
            }
        }, 1000);
    });

    await page.goto(host + path, { waitUntil: 'domcontentloaded' }, console.log("请求", host + path));
}

module.exports = run;