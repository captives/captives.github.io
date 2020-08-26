<template>
  <div
    ref="videoPanel"
    :class="[drag.moving ? size : '', drag.moving ? 'video-item move' : 'video-item']"
  >
    <video autoplay :muted="muted" :srcObject.prop="stream"></video>
    <slot></slot>
    <p ref="titleBar" class="title-bar">
      <em>{{title}}</em>
      <i v-if="drag.moving" class="el-icon-full-screen" @click="videoResizeHandler"></i>
      <i
        :class="[ drag.moving ? 'el-icon-news' : 'el-icon-copy-document']"
        @click="videoMoveHandler"
      ></i>
    </p>

    <ul>
      <li>startMatrix = {{drag.startMatrix}}</li>
      <li>endMatrix = {{drag.endMatrix}}</li>
      <li>initStartMatrix = {{drag.initStartMatrix}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import Matrix from './Matrix';
@Component({
  name: 'VideoPlayer',
})
export default class VideoPlayer extends Vue {
  @Ref() readonly titleBar: HTMLElement;
  @Ref() readonly videoPanel: HTMLElement;
  @Prop({ type: MediaStream, default: null }) readonly stream?: MediaStream;
  @Prop({ type: Boolean, default: false }) readonly muted?: boolean;
  @Prop({ type: String, default: "标签" }) readonly title?: string;
  @Prop({ type: Object, default: null }) readonly range?: any;
  private size: string = "";
  private rect: any = {};

  private drag: any = {
    startX: 0,
    startY: 0,
    moving: false,
    startMatrix: new Matrix(),
    endMatrix: new Matrix(),
    initStartMatrix: new Matrix(),
  };

  private videoResizeHandler() {
    this.size = this.size == "" ? "large" : (this.size === "large" ? 'small' : "");
  }

  private videoMoveHandler() {
    this.drag.moving = !this.drag.moving;
    if (this.drag.moving) {
      this.initMove();
      this.titleBar.addEventListener('mousedown', this.startMove.bind(this), false);
    } else {
      this.videoPanel.style.transform = "";
      this.titleBar.removeEventListener('mousedown', this.startMove.bind(this), false);
      document.removeEventListener('mousemove', this.moveEvent, false);
      document.removeEventListener('mouseup', this.upEvent, false);
    }
  }

  private getRange() {
    this.rect = { x: 0, y: 0, width: 0, height: 0 };
    if (this.range) {
      this.rect = { ... this.range };
    } else {
      this.rect = document.documentElement.getBoundingClientRect();
    }
  }

  private initMove() {
    this.getRange();
    if (!this.videoPanel.style.transform) {
      this.drag.startMatrix = new Matrix(1, 0, 0, 1, this.rect.x, this.rect.y);
    } else {
      this.drag.startMatrix.copyFrom(this.drag.endMatrix);
    }
    this.drag.endMatrix.copyFrom(this.drag.startMatrix);
    this.drag.initStartMatrix.translate(this.drag.startMatrix.x, this.drag.startMatrix.y);

    let { x, y } = this.drag.initStartMatrix;
    this.videoPanel.style.transform = `matrix(1, 0, 0, 1, ${x}, ${y})`;
  }

  private startMove(event: MouseEvent) {
    this.getRange();

    this.drag.startX = event.x;
    this.drag.startY = event.y;
    if (!this.videoPanel.style.transform) {
      this.drag.startMatrix = new Matrix(1, 0, 0, 1, 0, 0);
    } else {
      this.drag.startMatrix.copyFrom(this.drag.endMatrix);
    }

    // @ts-ignore
    document.addEventListener('mousemove', this.moveEvent, false);
    document.addEventListener('mouseup', this.upEvent, false);
  }

  private moveEvent(evt: MouseEvent) {
    let { width, height } = this.videoPanel.getBoundingClientRect();

    if (this.drag.moving) {
      this.drag.initStartMatrix.copyFrom(this.drag.startMatrix);
      const addX = evt.x - this.drag.startX;
      const addY = evt.y - this.drag.startY;
      this.drag.initStartMatrix.translate(addX, addY);

      let { x, y } = this.drag.initStartMatrix;

      //边界处理
      if (x < this.rect.x) {
        x = this.rect.x;
      }

      if (y < this.rect.y) {
        y = this.rect.y;
      }

      if (x + width >= this.rect.width + this.rect.x) {
        x = this.rect.width + this.rect.x - width;
      }

      if (y + height >= this.rect.height) {
        y = this.rect.height + this.rect.y - height;
      }

      const transform = `matrix(1, 0, 0, 1, ${x}, ${y})`;
      this.videoPanel.style.transform = transform;
    }
  };

  private upEvent() {
    this.drag.endMatrix.copyFrom(this.drag.initStartMatrix);
    // @ts-ignore

    document.removeEventListener('mousemove', this.moveEvent, false);
    document.removeEventListener('mouseup', this.upEvent, false);
  };
}
</script>
<style lang="stylus" scoped>
.video-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  height: 240px;
  background: #999;
  margin: 0;
  padding: 0;
  font-size: 12px;
  display: inline-block;

  &.small {
    font-size: 13px;
    width: 320px;
    height: 240px;
  }

  &.large {
    font-size: 15px;
    width: 640px;
    height: 480px;
  }

  &.move {
    position: fixed;
    border-image: linear-gradient(to bottom, #24c2ff, #0158c2) 1 10;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.55);

    p.title-bar {
      cursor: move;
      background: rgba(83, 168, 255, 0.65);
    }
  }

  video {
    outline: none;
    width: 100%;
    height: 100%;
  }

  p.title-bar {
    color: #FFF;
    padding: 5px 10px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin: 0;
    user-select: none;
    text-align: left;
    background: rgba(0, 0, 0, 0.35);

    i {
      float: right;
      margin-right: 3px;
      margin-top: 5px;
      cursor: pointer;

      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    }

    em {
      font-style: normal;
      display: inline-block;
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: none;
    }
  }
}
</style>