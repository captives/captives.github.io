<template>
    <el-container ref="page" class="page" :style="domStyle">
        <el-header>
            顶部控制
        </el-header>
        <el-container>
            <el-aside width="308" class="video-list">
                <div class="video-item" v-for="item in list" :key="item.id">
                    <VideoToolBar v-if="item.stage" :label="item.label" :value="item"></VideoToolBar>
                    <VideoToolBar :label="item.label" :value="item" @move="videoBarMoveHandler" :class="{stage: item.stage, move: item.stage && true }" :style="anchor(item)">
                        <p style="text-align:center; margin: 0;">{{anchor(item) | toString}}</p>
                        <el-button class="stage-button" :type="item.stage?'danger':'primary'" circle :icon="item.stage?'el-icon-bottom-left':'el-icon-top-right'" @click="stageChangeHandler(item)"></el-button>
                    </VideoToolBar>
                </div>
            </el-aside>
            <el-aside ref="white-board" width="800" class="stage-body white-board">
                舞台区域
                <template v-for="item in list">
                    <p :key="item.id" v-if="item.stage">{{ item.label }} - <b style="color:red;">{{ item.position }}</b></p>
                </template>
            </el-aside>
            <el-main>
                聊天扩展区
            </el-main>
        </el-container>

        <el-footer>
            <marquee>底部占位</marquee>
        </el-footer>
    </el-container>
</template>
<script lang="ts">
import { ElAside } from "element-ui/types/aside";
import { ElContainer } from "element-ui/types/container";
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
import { namespace, State } from 'vuex-class';

import VideoToolBar from './../components/VideoToolBar.vue';

const RoomStore = namespace("RoomStore");
@Component({
    name: "LiveRoom",
    components: { VideoToolBar },
    filters: {
        toString(val: any) {
            if (val) {
                val.left = Math.round(val.left.replace('px', ''));
                val.top = Math.round(val.top.replace('px', ''));
                return val.left + "x" + val.top;
            }
            return "";
        }
    }
})
export default class LiveRoom extends Vue {
    @Ref() private readonly page!: ElContainer;
    @Ref('white-board') private readonly whiteBoard!: ElAside;
    @RoomStore.State(state => state) private room: any;
    @RoomStore.Getter('domStyle') private domStyle!: any;
    @RoomStore.Action('onResize') private onResize!: Function;

    private list: Array<any> = [
        { label: "video 1", id: "v1", stage: false, position: null },
        { label: "video 2", id: "v2", stage: false, position: null },
        { label: "video 3", id: "v3", stage: false, position: null },
        { label: "video 4", id: "v4", stage: false, position: null },
        { label: "video 5", id: "v5", stage: false, position: null },
        { label: "video 6", id: "v6", stage: false, position: null },
        { label: "video 7", id: "v7", stage: false, position: null },
        { label: "video 8", id: "v8", stage: false, position: null },
        { label: "video 9", id: "v9", stage: false, position: null },
        { label: "video 10", id: "v10", stage: false, position: null },
        { label: "video 11", id: "v11", stage: false, position: null }
    ];

    @Watch('room.ratio')
    roomRatioChange(val: number) {
        setTimeout(() => this.$forceUpdate(), 10);
    }

    public get anchor() {
        return (user: any) => {
            const points = (user.position || '0x0').split('x');
            const pageRect: DOMRect = this.room.wrapperRect;
            const stageRect: DOMRect = this.room.whiteBoardRect;
            if (pageRect && stageRect && user.stage) {
                const offset = {
                    x: (stageRect.x - pageRect.x) / this.room.ratio,
                    y: (stageRect.y - pageRect.y) / this.room.ratio
                };
                return { left: (Number(points[0]) + offset.x) + "px", top: (Number(points[1]) + offset.y) + "px" };
            } else {
                return null;
            }
        }
    }

    mounted() {
        this.onResize({ element: this.$el, whiteBoard: this.whiteBoard.$el, padding: 20 });
        window.addEventListener('resize', this.onResize.bind(this, { element: this.$el, whiteBoard: this.whiteBoard.$el, padding: 20 }), false);
    }

    private stageChangeHandler(item: any) {
        item.stage = !item.stage;
    }

    private videoBarMoveHandler(event: MouseEvent, item: any, domRect: DOMRect) {
        console.log('move', event.x, event.y, item, domRect);
        if (item.stage) {
            const ratio = this.room.ratio;
            const pageRect: DOMRect = this.room.wrapperRect;
            const stageRect: DOMRect = this.room.whiteBoardRect;

            let client = { x: 0, y: 0 };
            //让移动点在元素中心上
            client.x = event.x - domRect.width / 2;
            client.y = event.y - domRect.height / 2;

            //左边距限制
            if (client.x <= stageRect.x) {
                client.x = stageRect.x;
            }

            //上边距限制
            if (client.y <= stageRect.y) {
                client.y = stageRect.y;
            }

            //右边距限制
            if (client.x + domRect.width >= stageRect.x + stageRect.width) {
                client.x = stageRect.x + stageRect.width - domRect.width;
            }

            //下边距限制
            if (client.y + domRect.height >= stageRect.y + stageRect.height) {
                client.y = stageRect.y + stageRect.height - domRect.height;
            }

            console.log("有效坐标：%sx%s, 页边距：%sx%s, 舞台边距：%sx%s", Math.round(client.x), Math.round(client.y), Math.round(pageRect.x), Math.round(pageRect.y), Math.round(stageRect.x), Math.round(stageRect.y));

            // 坐标位置｜ 有效位置 -  坐标起始  - ｜ 舞台的起始位置｜  
            let top = client.y - pageRect.y - (stageRect.y - pageRect.y);
            let left = client.x - pageRect.x - (stageRect.x - pageRect.x);
            //⬆是缩放前的数据，⬇ 是缩放后的数据
            let x = Math.round(left / ratio);
            let y = Math.round(top / ratio);

            console.log('800x600 位置坐标', x, y);
            item.position = [x, y].join('x');
        }
    }
}
</script>
<style lang="stylus" scoped>
.page {
    flex: none;
    border-radius: 5px;
    width: 1350px;
    height: 720px;
    background: rgb(195, 223, 201);
    color: rgb(0, 155, 158);
    overflow: hidden;

    .video-list {
        width: 308px;
        padding: 2px;
        height: 600px;
        background: rgba(255, 255, 255, 0.25);
        overflow-y: auto;

        .video-item {
            width: 150px;
            height: 150px;
            display: block;
            float: left;
            border: 0.5px rgba(255, 255, 255, 0.35) dotted;
            box-sizing: border-box;
            margin: 1px;

            .video-bar {
                background: rgba(255, 255, 255, 0.25);

                &.stage {
                    background: rgb(248, 170, 151);
                }
            }

            .stage-button {
                position: absolute;
                padding: 5px;
                font-size: 20px;
                margin: 35%;
                top: 0;
                left: 0;
            }
        }
    }

    .stage-body {
        width: 800px;
        height: 600px;
        margin: 0 10px;
        background: rgba(255, 255, 255, 0.35);
    }

    .el-main {
        background: rgba(255, 255, 255, 0.35);
    }

    .el-footer {
        height: 60px;
        background: rgb(175, 221, 231);
    }
}
</style>
