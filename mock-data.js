
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
        { value: 18, name: '火绒' },
        { value: 18, name: '火绒2' },
        { value: 18, name: '火绒3' },
        { value: 24, name: '电脑管家' },
        { value: 24, name: '电脑管家e' },
        { value: 15, name: '瑞虎' },
        { value: 18, name: '鲁大师' }
    ],
    //用户类型
    userTypeData: [
        { value: 12, name: '临时用户' },
        { value: 8, name: '普通用户' },
        { value: 7, name: '白名单用户' },
        { value: 7, name: '黑名单用户' },
    ],
    //部门终端TOPN
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
        { value: 11, name: "32G" },
        { value: 11, name: "64G" },
    ],
    disk: [
        { value: 18, name: "500G" },
        { value: 23, name: "1T" },
        { value: 15, name: "2T" },
        { value: 11, name: "3T" },
        { value: 23, name: "4T" },
        { value: 23, name: "5T" },
        { value: 23, name: "6T" },
        { value: 23, name: "7T" },
        { value: 23, name: "8T" },
    ],
    topnData: [
        { name: "U盘接入", value: 5 },
        { name: "漏洞告警", value: 21 },
        { name: "合规告警", value: 36 },
        { name: "资产告警", value: 3 },
    ],
    //终端统计
    online: {
        label: ['12.1', '12.2', '12.3', '12.4', '12.5', '12.6', '12.7', '12.8'],
        list: [
            { name: '终端总数', value: [15, 12, 24, 20, 25, 20, 35, 45] },
            // { name: '在线数', value: [23, 25, 65, 76, 34, 12, 78, 89, 15, 12, 65, 21] },
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
    srv: [{ value: 62, name: "memory" }, { value: 20, name: "cpu" }], //百分比
    useDisk: [{ value: 1, name: "use" }, { value: 50, name: "total" }],//最小单位，字节
    deviceData: [{
        ip: '192.168.1.100',
        label: '联想',
        desc: "PC",
        icon: 'win',
        date: '2016-05-04'
    }, {
        ip: '192.168.1.100',
        label: 'DELL',
        desc: "服务器",
        icon: 'linux',
        date: '2016-05-04'
    }, {
        ip: '192.168.1.100',
        label: 'Apple',
        desc: "笔记本",
        icon: 'mac',
        date: '2016-05-04'
    }, {
        ip: '192.168.1.100',
        label: 'Android',
        desc: "手机",
        icon: 'android',
        date: '2016-05-04'
    }, {
        ip: '192.168.1.100',
        label: 'ViVO',
        desc: "手机",
        icon: 'android',
        date: '2016-05-04'
    }, {
        ip: '192.168.1.100',
        label: 'iPhone',
        desc: "手机",
        icon: 'iphone',
        date: '2016-05-04'
    }]
}