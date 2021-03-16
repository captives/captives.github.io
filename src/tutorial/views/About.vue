<template>
    <el-container>
        <el-main>
            <h2>1、$store.state.user.name: {{$store.state.user.name}}</h2>
            <h2>2、$store.state.user.age: {{$store.state.user.age}}</h2>
            <hr>
            <h2>3、name:{{name}} - age:{{age}}</h2>
            <h2>4、user: {{user}}</h2>
            <h2>5、user.name: {{user.name}} | user.age:{{user.age}}</h2>
            <h2>6、userInfo: {{userInfo}}</h2>
            <el-input v-model="value" placeholder="请输入" @blur="changeHander"></el-input>
        </el-main>
        <el-main>
            <h2>list:{{list}}</h2>
            <h2>index:{{index}}</h2>
            <h2> ===> {{ list[index]}} </h2>
            <hr>
            <h2>itemList: {{ itemList }}</h2>
            <h2>===> {{itemList[index]}}</h2>
            <div>
                <el-button type="primary" @click="addItem">增加一个数据</el-button>
                <el-button type="primary" @click="randomItem">随机一个数据</el-button>
            </div>

            <Calendar></Calendar>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";

import Calendar from './../components/Calendar.vue';


const VuexUser = namespace('user');

@Component({ name: "About", components: { Calendar } })
export default class About extends Vue {
    private value: string = "";
    @VuexUser.Action('setData') public setData: Function;
    @VuexUser.State("name") private name: string;
    @VuexUser.State("age") private age: string;
    @VuexUser.State(state => state) private user: any;
    @VuexUser.Getter('toString') private userInfo: string;

    private changeHander() {
        this.setData({ name: this.value, age: Math.round(Math.random() * 100) });
    }

    /** ----------------------------- list ----------------------------------- */
    private list: Array<any> = [];
    private itemList: any = {};
    private index: Number = 0;
    private addItem() {
        const data = { type: 1, value: Math.floor(Math.random() * 1000) };
        this.list.push(data);
        this.itemList[this.list.length - 1] = data;
    }

    private randomItem() {
        this.index = Math.floor(Math.random() * (this.list.length + 5));
    }
}
</script>
<style lang="stylus" scoped>
.el-main {
    width: 70%;
    margin: 0 auto;
}
</style>
