<template>
    <el-main>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="常用" name="/">
                <el-button type="primary" @click="openColorPickerHandler">色卡</el-button>
                <ColorRGBToHex style="width:45%">
                    <p slot="footer"></p>
                </ColorRGBToHex>
            </el-tab-pane>
            <el-tab-pane v-for="(list, key) in data" :key="key" :label="key" :name="key">
                <el-row class="list" :gutter="20">
                    <el-col :xs="12" :sm="8" :md="6" :lg="6" :span="4" v-for="item in list" :key="item.title">
                        <el-card>
                            <div slot="header">
                                <a class="header" :href="item.href">{{ item.title }}</a>
                            </div>
                            <p class="desc">{{ item.desc }}</p>
                            <ul v-if="item.about && item.about.length > 0" class="news">
                                <li v-for="li in item.about" :key="li.label">
                                    <a :href="li.value" :title="li.alt">{{ li.label }}</a>
                                </li>
                            </ul>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>

            <el-tab-pane label="自定义指令" name="/demo">
                <el-checkbox v-model="visible">闪屏</el-checkbox>
                <VueCode v-splash:[visible].fullscreen="loadingText">
                    <ColorRGBToHex style="width:45%"></ColorRGBToHex>
                    <div>这是第二个元素</div>
                </VueCode>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>
<script>
import ColorRGBToHex from "@/components/ColorRGBToHex";
import VueCode from "@/components/VueCode.vue";
export default {
    name: "Favorite",
    components: { ColorRGBToHex, VueCode },
    data() {
        return {
            data: {},
            activeName: "",
            error: null,
            visible: false,
            loadingText: "",
        };
    },
    created() {
        this.$fetch("/assets/data/favorite.json")
            .then((res) => {
                console.log(res);
                this.data = JSON.parse(res);
                this.activeName = "/";
            })
            .catch((err) => {
                this.error = "数据加载失败";
            });

        setInterval(() => {
            this.loadingText = new Date().toLocaleString();
        }, 1000);
    },
    methods: {
        openColorPickerHandler() {
            window.open("/pdfview/index.html?file=/assets/color-card.pdf");
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-tab-pane {
    .el-row {
        .el-col {
            padding: 40px;

            .el-card {
                .header {
                    color: #FFF;
                    text-decoration: none;
                }

                color: #49cfef;
                background-color: #405261;
                border-left: 1px solid #4c6575;
            }

            .desc {
                overflow: hidden;
                word-break: break-word;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }
        }

        &.list {
            display: flex;
            align-items: stretch;
            flex-wrap: wrap;
        }
    }
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        display: inline-block;

        a {
            color: #ffd214;
            padding: 5px 10px;
            text-decoration: none;
        }
    }
}
</style>
