
module.exports = {
    //操作系统
    os: [
        { value: 310, name: 'WIN10' },
        { value: 234, name: 'WIN7' },
        { value: 135, name: 'XP' },
    ],
    //计算机
    computer: [
        { value: 12, name: '联想' },
        { value: 8, name: 'DELL' },
        { value: 15, name: 'HP' },
        { value: 48, name: '华硕' }
    ],
    //杀毒软件
    antivirus: [
        { value: 21, name: '360' },
        { value: 24, name: '金山' },
        { value: 15, name: '亚信' },
        { value: 18, name: '火绒' }
    ],
    //部门终端TOPN
    topn: {
        cpu: [
            { value: 18, name: "i3" },
            { value: 12, name: "i5" },
            { value: 21, name: "i7" },
            { value: 24, name: "其它" },
        ],
        memory: [
            { value: 18, name: "2G" },
            { value: 23, name: "4G" },
            { value: 15, name: "8G" },
            { value: 11, name: "16G" },
        ],
        disk: [
            { value: 18, name: "500G" },
            { value: 23, name: "1T" },
            { value: 15, name: "2T" },
            { value: 11, name: "3T" },
        ]
    },
    topnData: [
        { name: "U盘接入", value: 5 },
        { name: "漏洞告警", value: 21 },
        { name: "合规告警", value: 36 },
        { name: "资产告警", value: 3 },
    ],
    //终端统计
    online: {
        label: [12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 12.10, 12.12, 12.13],
        list: [
            { name: '终端总数', data: [34, 56, 75, 76, 43, 32, 97, 100, 32, 84, 76, 32] },
            { name: '在线数', data: [23, 25, 65, 76, 34, 12, 78, 89, 15, 12, 65, 21] },
        ]
    },
    //终端维保
    repair: [
        { value: 128, name: "1-3年" },
        { value: 98, name: "3-5年" },
        { value: 118, name: "5-8年" },
        { value: 78, name: "8-10年" },
        { value: 28, name: "10年以上" },
    ],
    srv: { cpu: 100, memory: 50 }, //百分比
    disk: { use: 2 * 1024 * 1024, total: 8 * 1024 * 1024 },//最小单位，字节
    healthData: [{
        name: '王小虎',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'danger'
    }, {
        name: '王二虎',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'success'
    }, {
        name: '王三虎',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'danger'
    }, {
        name: '马大狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'success'
    }, {
        name: '马二狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'danger'
    }, {
        name: '马三狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'success'
    }, {
        name: '雪山飞狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'danger'
    }, {
        name: '卧虎藏龙',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'warning'
    }],
    usbData: [{
        name: '王小虎',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
    }, {
        name: '王二虎',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
    }, {
        name: '王大虎',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
    }, {
        name: '马大狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'success'
    }, {
        name: '马二狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'danger'
    }, {
        name: '马三狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'success'
    }, {
        name: '雪山飞狐',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'danger'
    }, {
        name: '卧虎藏龙',
        ip: '192.168.1.100',
        date: '2016-05-04',
        desc: "登陆",
        status: 'warning'
    }]
}