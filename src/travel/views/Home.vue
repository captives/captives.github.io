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
        <div class="test-bok">
            <p>1</p>
            <p>2</p>
        </div>
        <van-button type="primary" block>Button</van-button>
        <swiper ref="mySwiper" style="height:200px;background:red" :options="swiperOptions">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <transition mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <img v-show="show" alt="Vue logo" src="../assets/logo.png" @click="show=!show" />
        </transition>
        <transition mode="out-in" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <img v-show="!show" alt="Vue logo" src="../assets/logo.png" @click="show=!show" />
        </transition>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Home",
})
export default class Home extends Vue {
    private show: boolean = false;

    private swiperOptions: any = {
        pagination: {
            el: '.swiper-pagination'
        }
    };

    beforeCreate() {
        console.log(this.$route);
        this.$router.afterEach(() => {
            document.title = this.$route.name || document.title;
        });
    }

    private calendarChangeHandler(date: Date) {
        console.log('time', date.toLocaleString());
    }
}
</script>
<style lang="stylus" scoped>
.calendar-week {
    color: $btn-active-bdc;
}

.test-bok {
    display: flex;
}

.home {
    text-align: center;
}
</style>
