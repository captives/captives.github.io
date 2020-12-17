<template>
  <li class="upload-picture_card">
    <img :src="item.url" class="fill" style="object-fit: contain" alt />

    <el-progress
      v-if="editabled && item.raw && percentage > 0"
      :stroke-width="4"
      :percentage="percentage"
      :text-inside="true"
      status="success"
    ></el-progress>

    <label
      v-if="editabled && !item.raw"
      class="el-upload-list__item-status-label"
    >
      <i class="el-icon-upload-success el-icon-check"></i>
    </label>

    <span v-if="preview" class="fill el-upload-list__item-actions">
      <span class="el-upload-list__item-preview" @click="previewItemHandler">
        <i class="el-icon-zoom-in"></i>
      </span>
      <slot name="preview" :data="item"></slot>
      <span
        v-if="editabled && removed"
        class="el-upload-list__item-delete"
        @click="removeItemHandler"
      >
        <i class="el-icon-delete"></i>
      </span>
    </span>

    <el-row v-if="editabled && item.status == 'error'" class="fill error">
      <span class="el-icon-question">{{ item.message }}</span>
      <span>
        <i class="el-icon-refresh" @click="reUploadhandler"></i>
        <i
          v-if="editabled && removed"
          class="el-icon-delete"
          @click="removeItemHandler"
        ></i>
      </span>
    </el-row>

    <el-dialog
      v-if="dialogVisible"
      :title="item.name"
      width="90%"
      top="2vh"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <img :src="item.url" class="dialog-fill" />
    </el-dialog>
  </li>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, PropSync } from "vue-property-decorator";
@Component({ name: "PictureCardItem" })
export default class PictureCardItem extends Vue {
  @PropSync("data", { default: () => {} }) item: any;
  @Prop() readonly editabled!: boolean;
  @Prop() readonly removed!: boolean;
  @Prop() readonly preview!: boolean;

  private dialogVisible = false;
  private percentage = 0;

  @Watch("item", { deep: true })
  itemChange() {
    this.percentage = this.item && this.item && this.item.percentage;
  }

  private upload() {
    if (this.item.raw) {
      this.item.status = "ready";
      this.item.message = null;
      this.item.percentage = 0;
      //@ts-ignore
      this.$message({ type: "error", message: "执行上传逻辑" });
      delete this.item.raw;
    }
  }

  private previewItemHandler() {
    this.$emit("preview", this.item);
    this.dialogVisible = true;
  }

  private removeItemHandler() {
    this.$emit("remove", this.item);
  }

  private reUploadhandler() {
    this.upload();
  }

  mounted() {
    this.upload();
  }
}
</script>
<style lang="stylus" scoped>
.upload-picture_card {
  .fill {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .error {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(245, 108, 108, 0.76);
    span {
      height: 25px;
      width: 100%;
      color: #fff;
      text-align: center;
    }

    i {
      cursor: pointer;
      width: 25px;
      height: 25px;
      margin: 0 5px;
      line-height: 25px;
      font-size: 16px;
    }
  }

  .el-upload-list__item-status-label {
    position: absolute;
    right: -17px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc;
    display: block;

    i {
      font-size: 12px;
      margin-top: 12px;
      color: #fff;
      transform: rotate(-45deg);
    }
  }

  .el-progress {
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    width: 100%;
  }

  .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }

    span {
      cursor: pointer;
      display: inline-block;
    }

    .el-upload-list__item-delete {
      margin-left: 15px;
      position: static;
      font-size: inherit;
      color: inherit;
    }
  }
}

.el-dialog {
  ::v-deep .el-dialog__header {
    position: relative;
    .el-dialog__title {
      position: absolute;
      word-break: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      left: 10px;
      right: 30px;
    }
  }
  .dialog-fill {
    width: 100%;
  }
}
</style>
