<template>
    <div>
        <vue-hash-calendar :visible="true" :isShowWeekView="true" pickerType="date" :scrollChangeDate="true" :isShowArrow="true" :isShowAction="true" :showTodayButton="true" @change="calendarChangeHandler">
            <div slot="week" slot-scope="scope" class="calendar-week">
                周{{ scope.week }}
            </div>
            <div slot="today" class="font-bold">今天</div>

            <div slot="arrow" slot-scope="scope" class="calendar-arrow">
                <van-icon :name="[scope.show ? 'arrow-down' : 'cross' ]" />
            </div>

        </vue-hash-calendar>
        <van-button type="primary" block>Button</van-button>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "Main" })
export default class Main extends Vue {

    private calendarChangeHandler(date: Date) {
        console.log('time', date.toLocaleString());
    }
}
</script>
<style lang="stylus">
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
<style lang="stylus" scoped>
.calendar-week {
    color: $btn-active-bdc;
}
</style>
