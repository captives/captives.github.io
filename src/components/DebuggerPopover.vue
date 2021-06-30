<template>
    <el-popover popper-class="vue-popove" trigger="click">
        <el-divider content-position="left">
            <i class="el-icon-mobile-phone">&nbsp;&nbsp;&nbsp;&nbsp;设备</i>
        </el-divider>
        <ul>
            <li v-for="(item, index) in browser" :key="index">
                <template v-if="((item instanceof Object))">
                    {{ index }} :
                    <span v-for="(child, idx) in item" :key="idx" class="li-child">{{ idx }} : {{ child }}</span>
                </template>
                <template v-else>{{ index }} : {{ item }}</template>
            </li>
        </ul>

        <el-divider content-position="left">环境变量</el-divider>
        <ul>
            <li v-for="(item, index) in env" :key="index">
                <template v-if="(item instanceof Object)">
                    {{ index }} :
                    <span v-for="(child, idx) in item" :key="idx" class="li-child">{{ idx }} : {{ child }}</span>
                </template>
                <template v-else>{{ index }} : {{ item }}</template>
            </li>
        </ul>

        <el-divider content-position="left">页面响应</el-divider>
        <ul>
            <li v-for="(item, index) in loadInfo" :key="index">
                <template v-if="(item instanceof Object)">
                    {{ index }} :
                    <span v-for="(child, idx) in item" :key="idx" class="li-child">{{ idx }} : {{ child }}</span>
                </template>
                <template v-else>{{ index }} : {{ item }}</template>
            </li>
        </ul>

        <el-button slot="reference" :type="browser['online'] ? '' : 'danger'" icon="el-icon-s-platform">环境({{ env.NODE_ENV }})</el-button>
    </el-popover>
</template>

<script>
export default {
    name: "DebuggerPopover",
    props: {
        value: { type: Boolean, default: false },
    },
    data() {
        return {
            env: {},
            browser: {},
            loadInfo: {},
        };
    },
    created() {
        this.initEnvData();
    },
    mounted() {
        const { browser, loadInfo } = this.getBrowserInfo();
        this.browser = browser;
        this.loadInfo = loadInfo;
        this.animate();
    },
    methods: {
        initEnvData() {
            this.env = process.env || {};
            console.log(process.cwd());
            console.log(process.argv);
        },
        getBrowserInfo() {
            var Sys = {};
            var ua = navigator.userAgent.toLowerCase();
            var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
            var m = ua.match(re);
            Sys.name = m[1].replace(/version/, "safari");
            Sys.version = m[2];
            Sys.mainVersion = Number(m[2].split(".")[0]);

            var e = window.performance || window.msPerformance || window.webkitPerformance;
            // e.getEntries("paint") //获取fp/fcp来感知渲染
            let info = {};
            if (e && e.timing) {
                var t = e.timing;
                if (t.navigationStart) {
                    info["navigationStart"] = t.navigationStart;
                }

                if (t.redirectEnd && t.redirectStart) {
                    info["redirect"] = t.redirectEnd - t.redirectStart + "ms";
                }

                if (t.navigationStart && t.domainLookupStart) {
                    info["navigation"] = t.domainLookupStart - t.navigationStart + "ms";
                }
                if (t.domainLookupEnd && t.domainLookupStart) {
                    info["dns"] = t.domainLookupEnd - t.domainLookupStart + "ms";
                }

                if (t.connectEnd && t.connectStart) {
                    info["tcp"] = t.connectEnd - t.connectStart + "ms";
                    if (t.connectEnd && t.secureConnectionStart) {
                        info["tcp/SSL"] = t.connectEnd - t.secureConnectionStart + "ms";
                    }
                }

                if (t.responseStart && t.requestStart) {
                    info["request"] = t.responseStart - t.requestStart + "ms";
                }

                if (t.responseEnd && t.responseStart) {
                    info["response"] = t.responseEnd - t.responseStart + "ms";
                }

                if (t.responseEnd && t.responseStart) {
                    info["response"] = t.responseEnd - t.responseStart + "ms";
                }

                if (t.domComplete && t.domLoading) {
                    if (t.domContentLoadedEventStart && t.domLoading) {
                        info["domComplete(domLoaded)"] = t.domContentLoadedEventStart - t.domLoading + "ms";
                    } else {
                        info["domComplete"] = t.domComplete - t.domLoading + "ms";
                    }
                }

                if (t.loadEventEnd && t.loadEventStart) {
                    info["loadEvent"] = t.loadEventEnd - t.loadEventStart + "ms";
                }

                if (t.loadEventEnd && t.loadEventStart) {
                    info["total(DOM)"] = t.loadEventEnd - t.navigationStart + "ms (" + (t.domComplete - t.navigationStart) + "ms)";
                }
            }

            if (e.eventCounts) {
                info["eventCounts"] = e.eventCounts.size;
            }

            if (e.memory) {
                info["(内存)使用的JS堆"] = ((e.memory.usedJSHeapSize / e.memory.totalJSHeapSize) * 100).toFixed(2) + "%";
                info["(内存)限制的JS堆"] = ((e.memory.usedJSHeapSize / e.memory.jsHeapSizeLimit) * 100).toFixed(2) + "%";
            }

            Sys["online"] = window.navigator.onLine;

            return { browser: Sys, loadInfo: info };
        },
        animate() {
            var e = window.performance || window.msPerformance || window.webkitPerformance;
            if (e.memory) {
                this.loadInfo["(内存)使用的JS堆"] = ((e.memory.usedJSHeapSize / e.memory.totalJSHeapSize) * 100).toFixed(2) + "%";
                this.loadInfo["(内存)限制的JS堆"] = ((e.memory.usedJSHeapSize / e.memory.jsHeapSizeLimit) * 100).toFixed(2) + "%";
                this.browser["online"] = window.navigator.onLine;
            }
            if ("requestAnimationFrame" in window) {
                requestAnimationFrame(this.animate);
            } else if ("webkitRequestAnimationFrame" in window) {
                webkitRequestAnimationFrame(this.animate);
            } else if ("msRequestAnimationFrame" in window) {
                msRequestAnimationFrame(this.animate);
            } else if ("mozRequestAnimationFrame" in window) {
                mozRequestAnimationFrame(this.animate);
            }
        },
    },
};
</script>
<style lang="stylus">
.vue-popove {
    font-family: '微软雅黑';

    .el-divider {
        margin: 40px 0 25px 0;

        &:first-child {
            margin: 20px 0 25px 0;
        }
    }

    ul {
        li {
            line-height: 22px;

            &::before {
                content: '>';
                padding: 0 10px;
            }

            .li-child {
                display: block;
                padding: 0 10px 0 30px;
            }
        }
    }
}
</style>
