<template>
  <el-container>
    <el-aside>
      <el-table :data="tableData">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column label="昵称">
          <template slot-scope="scope">{{
            getUserById(scope.row.id).name
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="publisher"
          prop="select"
          label="选项"
        ></el-table-column>
        <el-table-column label="结果">
          <template slot-scope="scope">
            <i
              :class="[
                scope.row.result ? 'el-icon-check' : 'el-icon-close',
                'icon-result',
              ]"
            ></i>
          </template>
        </el-table-column>
      </el-table>

      <el-footer>答题计时中: {{ time | formatTimeValue }}</el-footer>
    </el-aside>
    <el-main>
      <el-row class="title">
        <b>{{ item.title }}</b>
      </el-row>

      <el-row class="el-list">
        <el-row
          v-for="(item, index) in item.options"
          :key="index"
          :class="[
            publisher
              ? ''
              : selectValue == index
              ? 'select current-row'
              : 'select',
          ]"
          :gutter="20"
          @click.native="selectHandler(index)"
        >
          <el-col :span="2">{{ subjectOptionLabel[index] }}、</el-col>
          <el-col :span="22">{{ item }}</el-col>
        </el-row>
      </el-row>

      <el-footer>
        <template v-if="publisher">
          <!-- <el-alert
            effect="dark"
            :title="'正确选项：' + item.correct"
            description
            type="success"
            :closable="false"
          ></el-alert>-->
          <el-button type="danger" @click="closeSubject">关闭答题</el-button>
        </template>

        <template v-else>
          <p>选择答案选项，并提交答案，等待老师结束答题</p>
          <el-button
            v-if="!getResultById(user.id)"
            type="success"
            @click="submitResult"
            >提交答案</el-button
          >
        </template>
      </el-footer>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "AnswerPanel",
  props: {
    item: {},
    user: {},
  },
  data() {
    return {
      time: 0,
      result: "",
      selectValue: -1,
      subjectOptionLabel: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
      ],
    };
  },
  computed: {
    ...mapGetters("UserData", ["getUserById"]),
    ...mapGetters("SubjectData", ["getResultById"]),
    ...mapState("SubjectData", {
      subject: (state) => state,
    }),
    publisher() {
      return this.user && this.user.role == this.RoleType.PUBLISHER;
    },
    tableData() {
      return (this.subject && this.subject.list) || [];
    },
  },
  methods: {
    ...mapActions("SubjectData", [
      "initResults",
      "addResult",
      "addRankingList",
    ]),
    selectHandler(index) {
      this.selectValue = index;
    },
    submitResult() {
      var opt = this.subjectOptionLabel[this.selectValue];
      this.$confirm(
        "您确认提交答案？提交后将不得再更改答案。",
        "提交答案，选项 " + opt,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.client.subject("answer", opt, this.addResult);
      });
    },
    closeSubject() {
      this.$confirm(
        "确认结束答题？确认结束后，学生将不能提交答案。",
        "结束答题",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.client.subject("stop", null, (data) => {
          this.$emit("complete", data);
        });
      });
    },
  },
  mounted() {
    this.client.on("reply", this.addResult);
    this.client.on("startTime", (time) => (this.time = time));
    this.client.on("stop", (data) => {
      this.$emit("complete", data);
    });
  },
};
</script>

<style lang="stylus" scoped>
.el-container {
  width: 100%;
  height: 100%;
}

.el-aside {
  margin-right: 5px;
  height: 100%;
  width: 300px;

  .el-table {
    height: calc(100% - 60px);
    text-align: center;

    .icon-result {
      font-size: 22px;
      font-weight: bold;

      &.el-icon-check {
        color: #67C23A;
      }

      &.el-icon-close {
        color: #F56C6C;
      }
    }
  }

  .el-footer {
    background: #EEE;
    display: flex;
    align-items: center;
  }
}

.el-main {
  .title {
    margin-bottom: 50px;
    font-size: 22px;
  }

  .el-list {
    margin: 0 30px;
    height: cacl(100% -500px);
    overflow-x: none;
    overflow-y: auto;

    .el-row {
      margin: 10px 0 !important;
      border-radius: 5px;
      overflow: hidden;

      .el-col {
        padding: 15px 10px;
        font-size: 18px;

        &:first-child {
          text-align: right;
        }
      }

      &.select {
        cursor: pointer;

        &:hover {
          background: #B3D8FF;
        }
      }

      &.current-row {
        color: #FFF;
        background: #66B1FF;

        &:hover {
          background: #66B1FF;
        }
      }
    }
  }

  .el-footer {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
