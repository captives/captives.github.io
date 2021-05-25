
const event = require('events');
const Datastore = require('nedb');

const subject = require('./../data/subject');
const RoleType = { PUBLISHER: 1, SUBSCRIBER: 2, 1: "PUBLISHER", 2: "SUBSCRIBER" };

class HomeClient extends event.EventEmitter {
    constructor(td) {
        super();

        //通道标识
        this.td = td;
        //是否在进行中
        this.starting = false;
        //答题的页面
        this.page = 0;
        //当前答题数据
        this.subject = null;
        //user list
        this.list = [];

        //答题结果
        this.questions = {};

        // 实例化连接对象（不带参数默认为内存数据库）
        this.db = new Datastore({
            filename: './data/' + td + '_db.db',
            autoload: true
        });

        this.startTime = null;
        this.intervalId = 0;

        this.db.loadDatabase(function (err) {    // 回调函数(可选)
            // Now commands will be executed
        });
    }

    listen(user) {
        for (let i in this.list) {
            if (this.list[i].id === user.id && this.list[i].role === user.role) {
                this.list.splice(i, 1);
            }
        }

        this.db.find({ id: user.id, role: user.role }, (err, res) => {
            if (!res.length) {
                this.db.insert(user);
            }
        });

        this.list.push(user);
        return this.list.sort((a, b) => a.time - b.time);
    }

    //获取指定页面等试卷
    searchSubject(page) {
        let data = Object.assign({}, subject['page' + page])
        data.done = this.questions[page] && this.questions[page].length > 0;
        return data;
    }

    //开始答题
    startSubject(user, page, callback) {
        if (user.role === RoleType.PUBLISHER) {
            this.page = page;
            this.starting = true;
            //拿到试卷
            this.subject = this.searchSubject(this.page);


            this.startTime = Date.now();
            this.intervalId && clearInterval(this.intervalId);

            this.intervalId = setInterval(() => {
                callback && callback(Date.now() - this.startTime);
            }, 1000)
        }

        return user.role === RoleType.PUBLISHER;
    }

    //发送答题, 根据角色派发题目，
    //根据是否答过题，派发题目状态，答过题的不能再答题
    getSubject(user) {
        const subject = Object.assign({}, this.subject);
        if (user.role == RoleType.PUBLISHER) {
            return subject;
        } else {
            delete subject.correct;
            return this.searchResult(user, subject);
        }
    }

    //查询结果
    searchResult(user, subject) {
        let data = { select: null, value: null, result: false };
        if (this.questions[this.page]) {
            let item = this.questions[this.page].find(item => item.id == user.id);
            if (item) { //已经答题
                data.select = item.select;
                data.value = item.value;
                data.result = item.result
            }
        }

        return Object.assign(subject, data);
    }

    //保存结果
    saveResult(user, select) {
        const subject = Object.assign({}, this.subject);
        this.questions[this.page] = this.questions[this.page] || [];
        let item = this.questions[this.page].find(item => item.id == user.id);
        if (item) { //已经答题，更改答案
            item.select = select || '-';
            item.result = subject.correct === select;
            item.value = 0;
            item.time = Date.now() - this.startTime;
        } else {
            item = { id: user.id, select: select, result: subject.correct === select, value: 0, time: Date.now() - this.startTime };
            this.questions[this.page].push(item);
        }

        this.db.update({ id: item.id }, { $set: item });
        return item;
    }

    stopSubject(user, page) {
        //停止答题
        if (user.role == RoleType.PUBLISHER) {
            page = this.page;
            this.starting = false;
            this.subject = null;

            this.startTime = null;
            this.intervalId && clearInterval(this.intervalId);
        }

        //查询答题正确的人
        if (this.questions[page] && this.questions[page].length > 0) {
            let list = this.questions[page].filter(item => item.result == true);
            let luckyIndex = Math.floor(Math.random() * list.length);
            console.log('总人数', list.length, '幸运索引', luckyIndex);
            //分数统计
            list.forEach((item, index) => {
                item.score = 5 - index > 0 ? 5 - index : 0;
                item.luckyScore = index == luckyIndex ? 2 : 0;
                item.total = item.score + item.luckyScore;

                this.db.update({ id: item.id }, {
                    $inc: { score: item.score, total: item.total }
                }, () => {
                    console.log('记录已经更新', item);
                });
            });

            const lucky = JSON.parse(JSON.stringify(list[luckyIndex]));

            list.sort((a, b) => {
                if (b.total == a.total) {
                    return b.score > a.score;
                } else {
                    return b.total > a.total;
                }
            });

            return { list: list, lucky: lucky };
        } else {
            return { list: null, lucky: null };
        }
    }
}

module.exports = HomeClient;