<template>
    <el-container>
        <div class="news_list">
            <ul class="list">
                <li v-for="(item,index) in list" :key="index">
                    <div class="news_time fl">
                        <span class="day">{{ dateString(item.createTime)[2] }} </span>
                        <span class="year"> {{ dateString(item.createTime).slice(0,2).join("-") }} </span>
                        <span class="type"></span>
                    </div>
                    <div class="news_cont fr">
                        <h2>
                            <router-link :to="'/markdown/view/' + item.id" tag="a">{{item.title}}</router-link>
                        </h2>
                        <p class="demo"> {{item.desc}} </p>
                        <p class="vis">
                            更新日期：{{item.updateTime}}
                            <router-link :to="'/markdown/view/' + item.id" tag="a" class="more btn">查看更多 &gt;&gt;</router-link>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </el-container>
</template>
<script>
import { request } from "./HTTPRequest.js";
export default {
    name: "List",
    data() {
        return {
            list: [],
        };
    },
    computed: {
        isDebug() {
            return window.location.href.indexOf("local") != -1;
        },
        dateString() {
            return (value) => {
                const time = new Date(value);
                return time.toLocaleDateString().split("/");
            };
        },
    },
    methods: {
        loginHander() {
            //登陆
        },
        getList() {
            request("/edit/list").then(({ data }) => {
                console.log(data);
                this.list = data;
            });
        },
    },
    mounted() {
        this.getList();
    },
};
</script>
<style lang="stylus" scoped>
/* news */
.news_list {
    width: 960px;
    margin: 0 auto;

    a {
        text-decoration: none;
    }

    li {
        background: #f7f7f7;
        zoom: 1;
        margin-top: 40px;
        position: relative;

        &::after {
            content: '';
            clear: both;
            display: table;
        }
    }

    .line {
        display: block;
        position: absolute;
        background: #2eafbb;
    }
}

.news_time {
    float: left;
    background: #2eafbb;
    width: 120px;
    height: 100%;
    color: #777;
    padding: 40px 0;

    .day {
        display: block;
        font-size: 70px;
        color: #fff;
        width: 100%;
        font-family: 'Impact';
        text-align: center;
    }

    .year {
        display: block;
        color: #eee;
        text-align: center;
        line-height: 22px;
        font-size: 13px;
    }

    .author {
        display: block;
        color: #eee;
        text-align: center;
        line-height: 22px;
    }

    .type {
        display: block;
        text-align: center;
        line-height: 28px;
        min-height: 28px;

        .el-button {
            padding: 0 5px;
            color: #FFF;
        }
    }
}

.news_cont {
    width: 780px;
    margin-right: 20px;
    float: right;

    h2 {
        font-size: 20px;
        font-weight: normal;
        padding-top: 26px;

        a {
            color: #333;

            &::hover {
                color: #2eafbb;
            }
        }
    }

    .demo {
        height: 67px;
        line-height: 24px;
        margin-top: 14px;
        color: #8d8d8d;
        font-size: 14px;
        overflow: hidden;
    }

    .vis {
        color: #999;
        line-height: 24px;
        margin-top: 20px;
        font-size: 14px;
    }

    .more {
        float: right;
        color: #2eafbb;
        display: inline-block;
        line-height: 24px;
        padding: 0 24px;
        font-size: 14px;
    }
}
</style>