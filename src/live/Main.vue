<template>
    <el-container class="fill" direction="vertical">
        <el-button v-if="!visible" type="text" style="position:fixed; right:10px; top:0;z-index:5" @click="toggleHeaderHandler(true)">开启</el-button>

        <div v-show="visible" class="header" :class="titleClass">
            <el-button type="text" style="float:right;" @click="toggleHeaderHandler(false)">关闭</el-button>
        </div>

        <el-container v-loading="loading">
            <router-view></router-view>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import Splash from '@/components/Splash.vue';
import DetectBrowser from './utils/detect-browser';

export type BrowserAstrict = {
    os: string;
    name: string;
    version: number;
    ignore: Array<number>;
    code?: number,
    desc?: string | null
}

/**
 * Agora Web SDK 支持的浏览器
 * See <code>https://docs.agora.io/cn/Video/faq/browser_support</code>
 * Mac系统 chrome 88不能发送视频流;
 * See https://docs.agora.io/cn/Video/faq/chrome_88_video_fail
 */
export let browserAstrict: Array<BrowserAstrict> = [
    //windows
    { os: "windows", name: "chrome", version: 58, ignore: [] },
    { os: "windows", name: "firefox", version: 56, ignore: [] },
    { os: "windows", name: "opera", version: 45, ignore: [] },
    //mac
    { os: "macos", name: "chrome", version: 58, ignore: [88] },
    { os: "macos", name: "firefox", version: 56, ignore: [] },
    { os: "macos", name: "opera", version: 45, ignore: [] },
];

const browser = new DetectBrowser().browserType();

@Component({
    name: "Main",
    components: { Splash }
})
export default class Main extends Vue {
    private visible: Boolean = true;
    private titleClass: string = '';
    private loading: boolean = false;

    private browser: any = null;
    created() {
        this.$router.onReady((to: any, from: any) => {
            this.titleClass = to.path.indexOf('login') >= 0 ? 'login' : '';
            console.log('$router.onReady', to);
        });

        this.$router.beforeEach((to: any, from: any, next: Function) => {
            this.loading = true;
            console.log('$router.beforeEach', to);
            setTimeout(() => next(), 2000);
            // next();
        });

        this.$router.afterEach((to: any, from: any) => {
            this.titleClass = to.path.indexOf('login') >= 0 ? 'login' : '';
            this.loading = false;
            console.log('$router.afterEach');
        });

        const astrict: BrowserAstrict = this.checkBrowser();
        const code = astrict.code || 0;
        console.log('浏览器检查', astrict);
        if (code == 2) {
            //TODO 进入教室
        } else {
            //提示下载
            this.$confirm(astrict.desc || "", {
                confirmButtonText: '去下载',
                cancelButtonText: '继续进入',
                center: true,
                dangerouslyUseHTMLString: true,
                iconClass: 'icon_warning',
                closeOnClickModal: false,
                closeOnPressEscape: false,
                closeOnHashChange: false,
                showCancelButton: code >= 0,
                cancelButtonClass: "el-button--warning",
                showClose: false,
            }).then(() => {
                window.open(process.env.VUE_APP_BROWSER_DOWNPAGE, '_self');
            }).catch(() => {
                //TODO 进入教室
            });
        }
    }

    beforeRouteEnter(to: any, from: any, next: Function) {
        console.log("进入路由");
        next();
    }

    beforeRouteUpdate(to: any, from: any, next: Function) {
        console.log("路由改变");
    }

    beforeRouteLeave(to: any, from: any, next: Function) {
        console.log("路由离开");
    }

    //广告弹条的显示和隐藏
    private toggleHeaderHandler(visible: boolean) {
        this.visible = visible;
        setTimeout(() => window.dispatchEvent(new Event('resize')), 20);
    }

    /**
   * @desc 检测浏览器
   * @return -2:系统不支持、-1:浏览器不支持、0: 版本过低、1:不建议的使用、 2:可以进入
   */
    private checkBrowser(): BrowserAstrict {
        document.title = "checking....";
        //主版本号
        const ver: number = Number(browser.supporterVs.substr(0, browser.supporterVs.indexOf('.')));
        //约束条件
        let astrict: BrowserAstrict | undefined = browserAstrict.find((item: any) => item.name == browser.supporter && item.os == browser.system);
        const currentText = `<p class="el-link">您当前使用的是 ${browser.supporter} ${ver} 浏览器</p>`;
        if (astrict) {
            //判断版本，并且版本是否在忽略版本内
            if (ver < astrict.version) {
                astrict.code = 0;
                astrict.desc = currentText + `<p class="el-link el-link--warning">浏览器版本较低, 建议您升级到最新版本</p>`;
            } else {
                const i = astrict.ignore.indexOf(ver);
                astrict.code = i >= 0 ? 1 : 2;
                if (i >= 0) {
                    astrict.desc = currentText + `<p class="el-link el-link--warning">兼容性较差, 建议您升级到最新版本</p>`;
                }
            }
        } else {
            const list: Array<BrowserAstrict> = browserAstrict.filter((item) => item.os == browser.system);
            let r = {
                name: browser.supporter, os: browser.system, code: -1, version: 0, ignore: [],
                desc: `<p class="el-link el-link--danger">您当前使用的是 ${browser.supporter} ${ver} 浏览器, 暂不支持!</p> <p>请使用以下浏览器: `
            };

            if (list.length) {
                r.desc += list.map((item: BrowserAstrict) => item.name + ": " + item.version).join("、");
                r.desc += "</p>";
            } else {
                r.code = -2;
                r.desc = `<p class="el-link el-link--danger">当前的系统和浏览器均不支持上课！</p>`;
            }
            return r;
        }
        return astrict;
    }
}
</script>
<style lang="stylus" scoped>
.fill {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    .header {
        height: 60px;
        background: rgb(132, 185, 203);
        color: rgb(0, 155, 158);

        // transition: transform 1s;
        &.login {
            height: 520px;
        }
    }

    .el-container {
        position: relative;
    }
}
</style>
