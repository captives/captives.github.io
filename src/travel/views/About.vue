<template>
    <van-row>
        <van-button type="default">凯迪拉克</van-button>
        <van-field v-model="cadillac.count" type="number" label="次数"></van-field>
        <van-cell :border="false" title="结果" :value="cadillac.result" />
        <van-cell>
            <van-button type="default" @click="requestHandler">开始请求</van-button>
            <van-button type="danger" @click="stopHandler">停止请求</van-button>
        </van-cell>

        <van-button type="default">大众奥迪</van-button>
        <van-field v-model="audi.count" type="number" label="次数"></van-field>
        <van-cell :border="false" title="结果" :value="audi.result" />
        <van-cell>
            <van-button type="default" @click="requestAudiHandler">开始请求</van-button>
            <van-button type="danger" @click="stopAudiHandler">停止请求</van-button>
        </van-cell>
    </van-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from 'axios';
import _ from 'lodash';

const citys = ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区 ", "虹口区", "杨浦区", "浦东新区", "闵行区", "宝山区", "嘉定区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"];

@Component({ name: "About" })
export default class About extends Vue {
    private cadillac: any = {
        count: 0,
        params: {
            ts: '1621938294443',
            selmodel: 2252,
            driverName: "哈哈哈",
            model: "上海市",
            city: "静安区",
            sex: '1',
            dealer: "CD1061",
            driverPhone: '13356788778',
            driverPlan: '1',
            driverRead: '1',
            privacyRead: 'on',
            mz_ca: '',
            mz_sp: '',
            mz_kw: '',
            utm_source: "SP - CA0000001_00000000",
            utm_medium: '',
            utm_term: '',
            utm_content: '',
            utm_campaign: '',
            wSourceID: '0',
        },
        autoId: null,
        result: "",
    };

    requestHandler() {
        const days = [1, 2, 4, 5, 30];
        axios({
            method: "get",
            url: "https://www.cadillac.com.cn/api/testdrive.ashx",
            params: Object.assign(this.cadillac.params, {
                ts: Date.now() - Math.floor(Math.random() * 99999),
                driverName: citys[Math.floor(Math.random() * citys.length)],
                city: citys[Math.floor(Math.random() * citys.length)],
                driverPlan: days[Math.floor(Math.random() * days.length)].toString(),
                selmodel: Number(Math.floor(Math.random() * 9999)),
                dealer: _.padEnd("CD10" + Math.floor(Math.random() * 100), 5, "1"),
                driverPhone: _.padEnd("1" + Math.floor(Math.random() * 9999999999), 11, "2"),
                driverRead: Math.random() > 0.5 ? "1" : "0"
            })
        }).then(res => {
            console.log(res.data);
            this.cadillac.count++;
            this.cadillac.result = res.data;
            this.stopHandler();
            this.cadillac.autoId = setTimeout(this.requestHandler.bind(this), 50);
        })
    }

    stopHandler() {
        if (this.cadillac.autoId) {
            clearTimeout(this.cadillac.autoId);
        }
    }


    private audi: any = {
        count: 0,
        params: {
            atd_atdIntentCar: 163760,
            atd_atdIntentModel: 164060,
            atd_atdDealerProvince: 500,
            atd_atdDealerCity: 501,
            atd_atdIntentDealer: -1,
            atd_atdName: "",
            atd_atdGender: 2,
            atd_atdMobile: 14388889999,
            atd_atdPlanBuytime: '146',
            atd_apStandby1: 'https://contact.audi.cn/testdrive.html',
            atd_apStandby2: _,
        },
        autoId: null,
        result: "",
    }


    private requestAudiHandler() {
        const days = [1, 2, 4, 5, 30];
        axios({
            method: "POST",
            url: "https://contact.audi.cn/contact/testdrive_add.json",
            params: Object.assign(this.audi.params, {
                atd_atdName: citys[Math.floor(Math.random() * citys.length)],
                atd_atdIntentCar: 163000 + Math.floor(Math.random() * 1000),
                atd_atdIntentModel: 164000 + Math.floor(Math.random() * 1000),
                atd_atdDealerProvince: Math.floor(Math.random() * 9999),
                atd_atdDealerCity: Math.floor(Math.random() * 100000),
                atd_atdGender: Math.floor(Math.random() * 10),//购车时间
                atd_atdMobile: _.padEnd("1" + Math.floor(Math.random() * 9999999999), 11, "2"),//电话
            })
        }).then(res => {
            console.log(res.data);
            this.audi.count++;
            this.audi.result = res.data.message;
            this.stopAudiHandler();
            this.audi.autoId = setTimeout(this.requestAudiHandler.bind(this), 50);
        })
    }

    private stopAudiHandler() {
        if (this.audi.autoId) {
            clearTimeout(this.audi.autoId);
        }
    }



}
</script>
