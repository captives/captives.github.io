# Moment.js

<style>
.hero-circle {
    width: 180px;
    height: 180px;
    margin: 20px auto;
    position: relative;
    border: 8px solid #fff;
    border-radius: 50%;
    box-shadow: 0 1px 8px rgba(34,34,34,0.3),inset 0 1px 8px rgba(34,34,34,0.3);
    background: #61b2a7;
}

.hero-face {
    width: 100%;
    height: 100%
}

.hero-face:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    background: #fff;
    border-radius: 6px;
    content: "";
    display: block
}

.hero-hour {
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -4px 0 -4px -25%;
    padding: 4px 0 4px 25%;
    background: #fff;
    -ms-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
    border-radius: 4px 0 0 4px
}

.hero-minute {
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -40% -3px 0;
    padding: 40% 3px 0;
    background: #fff;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    border-radius: 3px 3px 0 0
}

.hero-second {
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -40% -1px 0 0;
    padding: 40% 1px 0;
    background: #fff;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%
}
</style>
<div class="hero-circle">
    <div class="hero-face">
        <div id="hour" class="hero-hour"></div>
        <div id="minute" class="hero-minute"></div>
        <div id="second" class="hero-second"></div>
    </div>
</div>
<script type="text/javascript" src="http://cdn.staticfile.org/moment.js/2.24.0/moment.min.js"></script>
<script>
function updateClock(){
    var now = moment(),
        second = now.seconds() * 6,
        minute = now.minutes() * 6 + second / 60,
        hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;
    document.getElementById('hour').style.transform = "rotate(" + hour + "deg)";
    document.getElementById('minute').style.transform = "rotate(" + minute + "deg)";
    document.getElementById('second').style.transform = "rotate(" + second + "deg)";
    setTimeout(updateClock, 1000);
}
updateClock();
</script>

[官网](http://momentjs.cn/)、[文档](http://momentjs.cn/docs/)
## 日期格式化
```js
moment().format('MMMM Do YYYY, h:mm:ss a'); // 四月 4日 2018, 1:35:14 下午
moment().format('dddd');                    // 星期三
moment().format("MMM Do YY");               // 4月 4日 18
moment().format('YYYY [escaped] YYYY');     // 2018 escaped 2018
moment().format();                          // 2018-04-04T13:35:14+08:00
```
## 相对时间
```js
moment("20111031", "YYYYMMDD").fromNow(); // 6 年前
moment("20120620", "YYYYMMDD").fromNow(); // 6 年前
moment().startOf('day').fromNow();        // 14 小时前
moment().endOf('day').fromNow();          // 10 小时内
moment().startOf('hour').fromNow();       // 35 分钟前
```
## 日历时间
```js
moment().subtract(10, 'days').calendar(); // 2018年3月25日
moment().subtract(6, 'days').calendar();  // 上周四下午1点35
moment().subtract(3, 'days').calendar();  // 上周日下午1点35
moment().subtract(1, 'days').calendar();  // 昨天下午1点35分
moment().calendar();                      // 今天下午1点35分
moment().add(1, 'days').calendar();       // 明天下午1点35分
moment().add(3, 'days').calendar();       // 本周六下午1点35
moment().add(10, 'days').calendar();      // 2018年4月14日
```
## 多语言支持
```js
moment().format('L');    // 2018-04-04
moment().format('l');    // 2018-04-04
moment().format('LL');   // 2018年4月4日
moment().format('ll');   // 2018年4月4日
moment().format('LLL');  // 2018年4月4日下午1点36分
moment().format('lll');  // 2018年4月4日下午1点36分
moment().format('LLLL'); // 2018年4月4日星期三下午1点36分
moment().format('llll'); // 2018年4月4日星期三下午1点36分
```
<hr/>
