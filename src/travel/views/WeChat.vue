<template>
    <div class="home">
        <vue-hash-calendar :visible="true" :isShowWeekView="true" pickerType="date" :scrollChangeDate="true" :isShowArrow="true" :isShowAction="true" :showTodayButton="true" @change="calendarChangeHandler">
            <div slot="week" slot-scope="scope" class="calendar-week">
                周{{ scope.week }}
            </div>
            <div slot="today" class="font-bold">今天</div>
            <div slot="arrow" slot-scope="scope" class="calendar-arrow">
                <van-icon :name="[scope.show ? 'arrow-down' : 'cross' ]" />
            </div>
        </vue-hash-calendar>
        <van-button @click="scanQRCodeHandler">扫一扫</van-button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


//@ts-ignore;
const wx: any = window['wx'];
@Component({
    name: "WeChat",
})
export default class Home extends Vue {
    beforeCreate() {
        console.log(this.$route);
        this.$router.afterEach(() => {
            document.title = this.$route.name || document.title;
        });
        console.log(wx);
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx77f5c3c171d2451d', // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: Date.now(), // 必填，生成签名的时间戳
            nonceStr: 'seven', // 必填，生成签名的随机串
            signature: 'seven',// 必填，签名，见附录1
            jsApiList: [
                'scanQRCode'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        //接口检测
        wx.checkJsApi({
            jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res: any) {
                console.log(res);
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });

        wx.ready(function () {
            console.log('----------ready');
        });
    }

    private calendarChangeHandler(date: Date) {
        console.log('time', date.toLocaleString());
    }

    private scanQRCodeHandler() {
        wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res: any) {
                // 回调
            },
            error: function (res: any) {
                if (res.errMsg.indexOf('function_not_exist') > 0) {
                    alert('版本过低请升级')
                }
            }
        });
    }
}
</script>
<style lang="stylus" scoped>
.calendar-week {
    color: $btn-active-bdc;
}
</style>
