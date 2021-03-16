/**
 * @desc 检测浏览器版本信息
 * @warn 因为node环境内没有navigator，所以请在页面加载完成后使用
 */
export default class DetectBrowser {
    ua: string;// 浏览器 user-agent

    constructor() {
        this.ua = navigator.userAgent.toLowerCase() || '';
    }

    /**
     * @desc 正则验证是否符合
     */
    testUa(regexp: any) {
        return regexp.test(this.ua)
    }

    /**
     * @desc 正则转化格式
     */
    testVs(regexp: any) {
        return (this.ua as any).match(regexp).toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".");
    }

    /**
     * @desc 系统
     */
    system() {
        let system: string = "";
        if (this.testUa(/windows|win32|win64|wow32|wow64/g)) {
            system = "windows"; // windows系统
        } else if (this.testUa(/macintosh|macintel/g)) {
            system = "macos"; // macos系统
        } else if (this.testUa(/x11/g)) {
            system = "linux"; // linux系统
        } else if (this.testUa(/android|adr/g)) {
            system = "android"; // android系统
        } else if (this.testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
            system = "ios"; // ios系统
        }
        return system;
    }

    /**
     * @desc 系统版本
     */
    systemVs() {
        let system = this.system();
        let systemVs: string = "";
        if (system === "windows") {
            if (this.testUa(/windows nt 5.0|windows 2000/g)) {
                systemVs = "2000";
            } else if (this.testUa(/windows nt 5.1|windows xp/g)) {
                systemVs = "xp";
            } else if (this.testUa(/windows nt 5.2|windows 2003/g)) {
                systemVs = "2003";
            } else if (this.testUa(/windows nt 6.0|windows vista/g)) {
                systemVs = "vista";
            } else if (this.testUa(/windows nt 6.1|windows 7/g)) {
                systemVs = "7";
            } else if (this.testUa(/windows nt 6.2|windows 8/g)) {
                systemVs = "8";
            } else if (this.testUa(/windows nt 6.3|windows 8.1/g)) {
                systemVs = "8.1";
            } else if (this.testUa(/windows nt 10.0|windows 10/g)) {
                systemVs = "10";
            }
        } else if (system === "macos") {
            systemVs = this.testVs(/os x [\d._]+/g);
        } else if (system === "android") {
            systemVs = this.testVs(/android [\d._]+/g);
        } else if (system === "ios") {
            systemVs = this.testVs(/os [\d._]+/g);
        }
        return systemVs;
    }

    /**
     * @desc 平台
     */
    platform() {
        let system = this.system();
        let platform = "";
        if (system === "windows" || system === "macos" || system === "linux") {
            platform = "desktop"; // 桌面端
        } else if (system === "android" || system === "ios" || this.testUa(/mobile/g)) {
            platform = "mobile"; // 移动端
        }
        return platform;
    }

    /**
     * @desc 内核
     */
    engine() {
        let engine = "";
        if (this.testUa(/applewebkit/g)) {
            engine = "webkit"; // webkit内核
        } else if (this.testUa(/gecko/g) && this.testUa(/firefox/g)) {
            engine = "gecko"; // gecko内核
        } else if (this.testUa(/presto/g)) {
            engine = "presto"; // presto内核
        } else if (this.testUa(/trident|compatible|msie/g)) {
            engine = "trident"; // trident内核
        }
        return engine
    }

    /**
     * @desc 内核版本
     */
    engineVs() {
        let engine = this.engine()
        let engineVs = "";
        if (engine === "webkit") {
            engineVs = this.testVs(/applewebkit\/[\d._]+/g);
        } else if (engine === "gecko") {
            engineVs = this.testVs(/gecko\/[\d._]+/g);
        } else if (engine === "presto") {
            engineVs = this.testVs(/presto\/[\d._]+/g);
        } else if (engine === "trident") {
            engineVs = this.testVs(/trident\/[\d._]+/g);
        }
        return engineVs;
    }

    /**
     * @desc 载体
     */
    supporter() {
        let supporter = "";
        if (this.testUa(/applewebkit/g)) {
            if (this.testUa(/edge/g)) {
                supporter = "edge"; // edge浏览器
            } else if (this.testUa(/opr/g)) {
                supporter = "opera"; // opera浏览器
            } else if (this.testUa(/chrome/g)) {
                supporter = "chrome"; // chrome浏览器
            } else if (this.testUa(/safari/g)) {
                supporter = "safari"; // safari浏览器
            }
        } else if (this.testUa(/gecko/g) && this.testUa(/firefox/g)) {
            supporter = "firefox"; // firefox浏览器
        } else if (this.testUa(/presto/g)) {
            supporter = "opera"; // opera浏览器
        } else if (this.testUa(/trident|compatible|msie/g)) {
            supporter = "iexplore"; // iexplore浏览器
        }
        return supporter;
    }

    /**
     * @desc 载体版本
     */
    supporterVs() {
        let supporter = this.supporter();
        let supporterVs = "";
        if (supporter === "chrome") {
            supporterVs = this.testVs(/chrome\/[\d._]+/g);
        } else if (supporter === "safari") {
            supporterVs = this.testVs(/version\/[\d._]+/g);
        } else if (supporter === "firefox") {
            supporterVs = this.testVs(/firefox\/[\d._]+/g);
        } else if (supporter === "opera") {
            supporterVs = this.testVs(/opr\/[\d._]+/g);
        } else if (supporter === "iexplore") {
            supporterVs = this.testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
        } else if (supporter === "edge") {
            supporterVs = this.testVs(/edge\/[\d._]+/g);
        }
        return supporterVs;
    }

    /**
     * @desc 外壳
     */
    shell() {
        let shell = "";
        if (this.testUa(/micromessenger/g)) {
            shell = "wechat"; // 微信浏览器
        } else if (this.testUa(/qqbrowser/g)) {
            shell = "qq"; // QQ浏览器
        } else if (this.testUa(/ucbrowser/g)) {
            shell = "uc"; // UC浏览器
        } else if (this.testUa(/qihu 360se/g)) {
            shell = "360"; // 360浏览器(无版本)
        } else if (this.testUa(/2345explorer/g)) {
            shell = "2345"; // 2345浏览器
        } else if (this.testUa(/metasr/g)) {
            shell = "sougou"; // 搜狗浏览器(无版本)
        } else if (this.testUa(/lbbrowser/g)) {
            shell = "liebao"; // 猎豹浏览器(无版本)
        } else if (this.testUa(/maxthon/g)) {
            shell = "maxthon"; // 遨游浏览器
        }
        return shell;
    }

    /**
     * @desc 外壳版本
     */
    shellVs() {
        let shellVs = "";
        if (this.testUa(/micromessenger/g)) {
            shellVs = this.testVs(/micromessenger\/[\d._]+/g);
        } else if (this.testUa(/qqbrowser/g)) {
            shellVs = this.testVs(/qqbrowser\/[\d._]+/g);
        } else if (this.testUa(/ucbrowser/g)) {
            shellVs = this.testVs(/ucbrowser\/[\d._]+/g);
        } else if (this.testUa(/2345explorer/g)) {
            shellVs = this.testVs(/2345explorer\/[\d._]+/g);
        } else if (this.testUa(/metasr/g)) {
        } else if (this.testUa(/maxthon/g)) {
            shellVs = this.testVs(/maxthon\/[\d._]+/g);
        }
        return shellVs
    }

    /**
     * @desc 版本之间的比较-只比较前两位
     * @param curr 当前版本
     * @param target 比较版本
     * @return [number]===0 当前版本等于比较版本
     * @return [number]===1 当前版本大于比较版本
     * @return [number]===2 当前版本小于比较版本
     */
    compareVersion(curr: any, target: any) {
        if (curr === target) {
            return 0
        }
        return parseFloat(curr) === parseFloat(target) ? 0 :
            parseFloat(curr) > parseFloat(target) ? 1 : 2;
    }

    /**
     * @desc 综合信息
     */
    browserType() {
        return {
            system: this.system(),//系统
            systemVs: this.systemVs(),//系统版本
            platform: this.platform(),//平台
            engine: this.engine(),//内核
            engineVs: this.engineVs(),//内核版本
            supporter: this.supporter(),//载体
            supporterVs: this.supporterVs(),//载体版本
            shell: this.shell(),//外壳
            shellVs: this.shellVs(),//外壳版本
        }
    }
}