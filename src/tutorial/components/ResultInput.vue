<template>
  <el-row class="card-tabs el-tabs">
    <div class="answer-list">
      <div class="tabs">
        <div
          v-for="(item, i) in tabList"
          :key="i"
          class="single-tab"
          :class="{ 'tab-active': activeTab == i }"
          @click="activeTab = i"
        >
          {{ item }}
        </div>
      </div>
      <div class="ipt-region">
        <div v-if="!activeTab" class="textarea">
          <textarea
            ref="inputValue"
            v-model="inputValue"
            rows="5"
            :disabled="!enabled"
            :placeholder="enabled ? '请输入答案' : '等待老师发题'"
          ></textarea>
        </div>
        <div v-else class="upload-img">
          <ul class="picture_card">
            <PictureCardItem
              v-for="(item, index) in list"
              :key="index"
              class="upload-picture_card"
              :data.sync="item"
              :editabled="enabled"
              :preview="true"
              :removed="true"
              @remove="optionRemoveHandler(item, index)"
            ></PictureCardItem>
            <li v-if="enabled" class="upload-picture_card upload">
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
        </div>
      </div>
    </div>
  </el-row>
</template>
<script lang="ts">
//@ts-ignore
import { Vue, Component, Prop, PropSync, Watch } from "vue-property-decorator";
import PictureCardItem from "./PictureCardItem.vue";
const URL: any = window.URL || window.webkitURL;
@Component({
  name: "ResultInput",
  components: { PictureCardItem },
})
export default class ResultInput extends Vue {
  private actived = true;
  private inputValue = "";
  private list: Array<any> = [];
  private enabled = true;
  private activeTab = 0;
  private tabList: Array<string> = ["文本答题", "上传图片"];

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
.card-tabs {
  position: relative;
  width 80%;
  margin 0 auto;

  .el-tabs {
    margin-bottom: 20px;
    height: 100%;
    width: 100%;
    border: none;
    box-shadow: none;
    background: #e7f3fb;

    >>> {
      .el-tabs__header {
        background-color: #e7f3fb;
        border-bottom: 1px solid #e7f3fb;

        .el-tabs__item {
          color: #333333;

          &.is-active {
            color: #0181d3;
            background-color: #e7f3fb;
            border-bottom: 2px solid #0181d3;
            border-left: none;
            border-right: none;
          }
        }
      }

      .el-tabs__content {
        height: 150px;
        width: 100%;
        padding: 0;

        .el-tab-pane {
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }
      }
    }
  }

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

        >>> .el-upload {
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
}

.answer-list {
  margin: 20px 0;
  background-color: #f3f9fd;

  .tabs {
    display: flex;
    height: 46px;
    line-height: 46px;
    background-color: #e7f3fb;
    font-size: 14px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);

    .single-tab {
      width: 115px;
      text-align: center;
    }

    .tab-active {
      color: #0181d3;
      border-bottom: 3px solid rgba(1, 129, 211, 1);
    }
  }

  .ipt-region {
    padding: 15px 0;
    height: 131px;

    .textarea {
      height: 100%;

      textarea {
        width: calc(100% - 32px);
        height: 100%;
        padding: 0px;
        margin: 0px 16px;
        border: none;
        resize: none;
        background: rgba(0, 0, 0, 0);
        line-height: 22px;
        font-weight: 400;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
    }

    .upload-img {
      height: 131px;
      overflow-y: auto;
    }
  }
}

.el-button.float {
  position: fixed;
  bottom: 60px;
  left: calc(50% - 70px);
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.05), 0 8px 11px 2px rgba(0, 0, 0, 0.05), 0 6px 22px 5px rgba(0, 0, 0, 0.1);
}
</style>
