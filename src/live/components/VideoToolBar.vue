<template>
    <div ref="video-bar" class='video-bar'>
        <slot></slot>
        <p class="user-name">{{label}}</p>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Ref, Prop } from "vue-property-decorator";

@Component({ name: 'VideoToolBar' })
export default class VideoToolBar extends Vue {
    @Prop() private readonly label: string;
    @Prop() private readonly value: any;
    @Ref('video-bar') private readonly videoBar!: HTMLDivElement;

    private visible: boolean = false;
    private mouseDown: boolean = false;
    private emitTime: number = Date.now();

    private mounted() {
        this.videoBar.addEventListener('mouseenter', this.mouseEnterHandler.bind(this), false);
        this.videoBar.addEventListener('mouseleave', this.mouseLeaveHandler.bind(this), false);
        this.videoBar.addEventListener('mousedown', this.mouseDownHandler.bind(this), false);
    }

    private mouseEnterHandler() {
        this.visible = true;
    }

    private mouseLeaveHandler() {
        this.visible = false;
    }

    private mouseDownHandler(event: MouseEvent) {
        this.mouseDown = this.value.stage && true;
        if (this.mouseDown) {
            this.videoBar.style['zIndex'] = '10';
            this.$emit('movestart', event);
            document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), true);
            document.addEventListener("mouseup", this.mouseUpHandler.bind(this), false);
            document.addEventListener("mouseleave", this.mouseUpHandler.bind(this), false);
        }
    }

    private mouseMoveHandler(event: MouseEvent) {
        if (this.mouseDown && Date.now() - this.emitTime > 20) {
            this.emitTime = Date.now();
            this.$emit('move', event, this.value, this.videoBar.getBoundingClientRect());
        }
    }

    private mouseUpHandler(event: MouseEvent) {
        if (this.mouseDown) {
            this.videoBar.style['zIndex'] = '1';
            console.log('离开可视区域');
            this.mouseDown = false;
            this.$emit('moveend', event);
            document.removeEventListener("mousemove", this.mouseMoveHandler, true);
            document.removeEventListener("mouseup", this.mouseUpHandler, false);
            document.removeEventListener("mouseleave", this.mouseUpHandler, false);
        }
    }
}
</script>
<style lang='stylus' scoped>
.video-bar {
    position: relative;
    width: 100%;
    height: 100%;

    &.stage {
        position: fixed;
        z-index: 1;
        width: 150px;
        height: 150px;
    }

    &.move {
        cursor: move;
        user-select: none;
    }

    .user-name {
        position: absolute;
        height: 20px;
        line-height: 20px;
        max-width: 120px;
        margin: 0;
        padding: 2px 15px 2px 5px;
        color: #fff;
        font-size: 11px;
        border-top-right-radius: 10px;
        background: rgba(0, 0, 0, 0.45);
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>