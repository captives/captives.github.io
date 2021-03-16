<template>
    <div>
        RegExp
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
@Component({ name: 'RegExpFile' })
export default class RegExpFile extends Vue {
    mounted() {
        console.log(router);
        // const list: Array<any> = router.filter((item: any) => (item.path as String).lastIndexOf('.html') != -1);
        // console.log(list);
        // router.forEach((item: any) => {
        //     console.log(" >>", item);
        //     console.log("   ___", item.path.match(new RegExp(/'.html'/)));
        // });

        var list: Array<string> = [
            "/user/info",
            "/user/info/999",
            "/user/info/999/ddd",
            "/user/info/abc",
            "/user/list",
            "/user/list/base",
        ];
        list.forEach((path: string) => {
            console.log("\n\n\n字符串 >>", path, path.match(/^\/user\/info\/[0-9]+$/g));

            var str: string = "/user/info";
            var reg = new RegExp("^" + str + "/[0-9]+$", "g");
            console.log(path, path.match(reg));
        });

        const data1: Array<any> = [
            { path: "/1", name: '1111' },
            { path: "/2", name: '2222' },
            { path: "/3", name: '3333' },
            { path: "/4", name: '4444' },
            { path: "/5", name: '5555' },
            { path: "/6", name: '6666' },
            { path: "/7", name: '7777' },
            { path: "/8", name: '8888' },
            { path: "/9", name: '9999' },
            { path: "/10", name: '1010' },
        ];

        const result = data1.find((item: any) => {
            if (item.path === '/14') {
                // return item;
                return item;
            } else {
                if (item.name == "7777") {
                    return true;
                    // return { path: "/66666", name: "替换后更新的值" }
                }
            }
        });

        console.log('>>>', result);

    }
}
</script>
<style lang='scss' scoped>
</style>