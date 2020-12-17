<template>
  <ul class="picture_card">
    <PictureCardItem
      v-for="(item, index) in list"
      :key="index"
      class="upload-picture_card"
      :data.sync="item"
      :editabled="true"
      :preview="true"
      :removed="true"
      @remove="optionRemoveHandler(item, index)"
    ></PictureCardItem>

    <li class="upload-picture_card upload">
      <el-upload
        class="el-upload"
        action="#"
        :limit="50"
        :show-file-list="false"
        :auto-upload="false"
        accept=".png, .jpg, .jpeg, .bmp"
        :on-preview="picturePreviewHandler"
        :on-change="pictureChangeHandler"
        :on-remove="pictureRemoveHandler"
      >
        <div slot="default" class="img-wrap">
          <p class="tip">大小:5M以内/张</p>
        </div>
      </el-upload>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PictureCardItem from "./PictureCardItem.vue";
@Component({
  name: "FileUploader",
  components: { PictureCardItem },
})
export default class FileUploader extends Vue {
  private list: Array<any> = [];

  private pictureRemoveHandler(file: any, list: Array<any>) {
    console.log("pictureRemoveHandler", file.url, list);
  }

  private picturePreviewHandler(file: any) {
    console.log("预览", file.url);
  }

  private pictureChangeHandler(file: any, list: Array<any>) {
    const raw: any = file.raw;
    if (file.status == "ready") {
      if (raw.type.indexOf("image") != -1) {
        if (raw.size <= 5 * 1024 * 1024) {
          this.list.push({
            ...file,
            id: Date.now(),
            url: URL.createObjectURL(file.raw),
          });
        } else {
          //@ts-ignore
          this.$message({
            type: "error",
            message: "图片文件大小不能超出5M限制！",
          });
        }
      }
    }
  }

  private optionRemoveHandler(item: any, index: number) {
    this.list.splice(index, 1);
  }
}
</script>
<style lang="stylus" scoped>
.picture_card {
  margin: 10px;
  padding: 0;

  .upload-picture_card {
    background: #e5ebef;
    list-style: none;
    display: inline-block;
    width: 120px;
    height: 120px;
    margin: 0 10px 10px 0;
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    &.upload {
      background: none;
      width: 116px;
      height: 116px;
      border: 2px #0181d3 dashed;
      border-radius: 5px;
      overflow: hidden;

      ::v-deep .el-upload {
        width: 100%;
        height: 100%;
        .tip {
          position: absolute;
          bottom: 0;
          width: 100%;
          font-size: 9px;
        }
      }
    }
  }
}
</style>
