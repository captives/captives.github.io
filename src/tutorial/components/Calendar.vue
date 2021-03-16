<template>
    <div class="calendar">
        <slot name="title" :title="title"></slot>
        <div></div>
        <!-- <van-grid square :column-num="7">
            <van-grid-item class="calendar-header" v-for="value in weeklist" :key="value" :text="value" />
            <van-grid-item class="calendar-body" v-for="item in list" :key="item.time" @click="itemChangeHandler(item)">
                <div :class="['fill', item.className]">{{item.label}}</div>
            </van-grid-item>
        </van-grid> -->
        <slot></slot>
    </div>
</template>
<script lang='ts'>
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';

//日期类型
enum IDateType {
    SELECTED = 'selected',
    START = 'start',
    MIDDLE = 'middle',
    END = 'end',
    DISABLED = 'disabled'
}

//日期对象
interface IDate {
    //日期对应的 Date 对象
    date: Date;
    //日期
    label: string | number;
    // //日期类型，可选值为selected、start、middle、end、disabled
    // type: IDateType;
    //中间显示的文字
    text?: string;
    //上方的提示信息
    topInfo?: string;
    //下方的提示信息
    bottomInfo?: string;
    //额外类名
    className?: string;
    //时间戳
    time: number;
}

@Component({ name: "Calendar" })
export default class Calendar extends Vue {
    @Model('input', { type: Date, default: () => new Date() }) private value!: Date;
    private weeklist: Array<string> = "日一二三四五六".split("");
    private list: Array<IDate> = [];
    private title: string = "2020年12月";

    @Watch('value')
    private valueChange(val: Date) {
        this.change(val);
    }

    private createDate(date: Date) {
        // console.log(date.toLocaleString());
        return {
            date,
            label: date.getDate(),
            text: "",
            topInfo: "",
            bottomInfo: "",
            className: "",
            time: date.getTime()
        };
    };


    private change(date: Date) {
        this.list = [];
        this.title = date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
        console.log("当前:", date.getMonth() + 1, '/', date.getDate(), '周' + this.weeklist[date.getDay()]);
        const total: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        console.log('%s年%s月共%s天', date.getFullYear(), date.getMonth() + 1, total);
        //当前月,第一天空余格子
        const a: number = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const lastMonth: Date = new Date(date.getFullYear(), date.getMonth() - 1);
        const lastCount: number = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).getDate();
        for (var i: number = lastCount - a; i < lastCount; i++) {
            this.list.push(this.createDate(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), i + 1)));
        }
        //当前月, 日期
        for (var i: number = 0; i < total; i++) {
            const idate: IDate = this.createDate(new Date(date.getFullYear(), date.getMonth(), i + 1));
            idate.className = "active";
            this.list.push(idate);
            if (i == total - 1) {
                //下个月
                const b: number = new Date(date.getFullYear(), date.getMonth(), i + 1).getDay();
                const nextMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1);
                for (var j: number = 0; j < 6 - b; j++) {
                    this.list.push(this.createDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), j + 1)));
                }
            }
        }
    }

    private itemChangeHandler(data: IDate) {
        const date: Date = data.date;
        this.title = date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
        console.log(data, date.toLocaleDateString());
        this.$emit('input', date);
    }

    private mounted() {
        this.change(this.value);
    }
}
</script>
<style lang='stylus' scoped>
.calendar {
    padding: 0;
    font-size: 29px;

    .calendar-header {
        padding-top: 8% !important;

        ::v-deep .van-grid-item__text {
            font-size: 22px;
        }
    }

    .calendar-body {
        &.select {
            &::before {
                position: absolute;
                left: 5%;
                top: 6%;
                content: '';
                width: 90%;
                height: 90%;
                border-radius: 50%;
                background: #7684c7;
            }

            .fill {
                color: #fff;
            }
        }

        ::v-deep .van-grid-item__content {
            background: none;
        }
    }
}

.van-grid-item__content {
    .fill {
        text-align: center;
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        line-height: 40px;
    }
}
</style>