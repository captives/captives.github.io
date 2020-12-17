<template>
  <el-container id="app">
    <template v-if="logined">
      <el-main>
        <CoursePanel
          ref="course"
          :list="courseList"
          class="content"
          @change="courseChange"
        ></CoursePanel>

        <el-button-group v-if="userData.role == RoleType.PUBLISHER">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-arrow-left"
            @click="prevPage"
            >上一页</el-button
          >
          <el-button size="mini">{{ coursePage }}</el-button>
          <el-button type="primary" size="mini" @click="nextPage">
            下一页
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-button-group>
      </el-main>

      <el-drawer
        class="el-drawer-answer"
        title="答题中...."
        size="100%"
        :modal="false"
        :show-close="false"
        :wrapperClosable="false"
        :close-on-press-escape="false"
        :visible.sync="courseStatus == CourseStatusType.ANSWER"
        direction="ltr"
      >
        <AnswerPanel
          v-if="answerItem"
          :item="answerItem"
          :user="userData"
          @complete="answerCompleteHandler"
        ></AnswerPanel>
      </el-drawer>

      <el-aside width="400px">
        <VideoDisplay :user="userData" class="video-display"></VideoDisplay>
        <VideoSeatList v-model="videoData" :list="tableData"></VideoSeatList>

        <el-tabs v-model="activeName" type="border-card" class="online-list">
          <el-tab-pane label="用户" name="zero">
            <UserProfile :user="userData">
              <el-button type="danger" @click="logoutHandler">退出</el-button>
            </UserProfile>
          </el-tab-pane>

          <el-tab-pane
            v-if="userData.role == RoleType.PUBLISHER"
            label="题库"
            name="second"
          >
            <QuestionBank v-if="currentSubject" :data="currentSubject">
              <el-button
                v-if="!currentSubject.done"
                v-show="!subject.starting"
                type="danger"
                @click="sendPageSubject"
                >发送答题</el-button
              >
            </QuestionBank>
          </el-tab-pane>
          <el-tab-pane label="排行榜" name="third">
            <el-table :data="rankList" border stripe :show-header="false">
              <el-table-column
                width="100"
                prop="id"
                label="UID"
                align="center"
              ></el-table-column>
              <el-table-column width="80" label="昵称" align="center">
                <template slot-scope="scope">{{
                  getUserById(scope.row.id).name
                }}</template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane
            id="console"
            label="Console"
            name="console"
          ></el-tab-pane>
        </el-tabs>

        <el-button
          v-if="activeName == 'console'"
          class="clear-btn"
          type="primary"
          icon="el-icon-delete"
          @click="clearHistory"
          >清除</el-button
        >
      </el-aside>

      <VideoList :list="videoData"></VideoList>

      <el-dialog :title="dialogRank.title" :visible.sync="dialogRank.visible">
        <CompetitionList :data="rankList" :lucky="lucky"></CompetitionList>
      </el-dialog>
    </template>

    <el-main v-else class="center">
      <el-carousel height="100%" arrow="never">
        <el-carousel-item
          v-for="item in ['#409EFF', '#67C23A', '#F56C6C']"
          :key="item"
          :style="{ background: item }"
        ></el-carousel-item>
      </el-carousel>
      <Login class="login" @complete="loginComplete"></Login>
    </el-main>
  </el-container>
</template>

<script>
import UserProfile from "./../components/UserProfile";
import OnlineList from "./../components/OnlineList";
import QuestionBank from "./../components/QuestionBank";
import CompetitionList from "./../components/CompetitionList";
import CoursePanel from "./CoursePanel";
import AnswerPanel from "./AnswerPanel";
import VideoDisplay from "./VideoDisplay.vue";
import VideoList from "./VideoList";
import VideoSeatList from "./VideoSeatList";
import Login from "./LoginPanel";
import { mapGetters, mapActions, mapState } from "vuex";

const CourseStatusType = { NORMAL: "normal", ANSWER: "answer" };
export default {
  name: "Home",
  components: {
    Login,
    UserProfile,
    OnlineList,
    QuestionBank,
    CompetitionList,
    VideoDisplay,
    VideoList,
    VideoSeatList,
    CoursePanel,
    AnswerPanel,
  },
  data() {
    return {
      CourseStatusType: CourseStatusType,
      userData: null,
      videoData: [],
      logined: false,
      courseStatus: CourseStatusType.NORMAL,
      answerItem: null,
      activeName: "zero",
      coursePage: "",
      dialogRank: { visible: false, title: "" },
      lucky: null,
      rankList: [],
      courseList: [],
      currentSubject: null,
    };
  },
  computed: {
    ...mapGetters("UserData", ["getUserById"]),
    ...mapState("UserData", {
      user: (state) => state,
    }),
    ...mapState("SubjectData", {
      subject: (state) => state,
    }),
    tableData() {
      return this.user && this.user.userList;
    },
  },
  methods: {
    ...mapActions("SubjectData", ["startSubject", "stopSubject"]),
    logoutHandler() {
      this.client.close();
    },
    loginComplete(user) {
      this.userData = user;
      this.logined = true;
    },
    prevPage() {
      this.$refs.course.prevPage();
    },
    nextPage() {
      this.$refs.course.nextPage();
    },
    courseChange(page, total) {
      this.coursePage = page + "/" + total;
      if (this.logined && this.userData.role == this.RoleType.PUBLISHER) {
        this.client.subject("search", page, (data) => {
          this.currentSubject = Object.values(data).length ? data : null;
        });
      }
    },
    sendPageSubject() {
      this.client.subject("start", this.$refs.course.page, (data) => {
        this.courseStatus = CourseStatusType.ANSWER;
        this.answerItem = data;
        this.startSubject(data);
      });
    },
    answerCompleteHandler(data) {
      this.rankList = data.list || []; //答对排行榜
      this.lucky = data.lucky; //幸运观众
      console.log("答题结束,幸运观众", this.lucky, this.rankList);
      this.courseStatus = CourseStatusType.NORMAL;
      this.answerItem = null;
      this.stopSubject();
      this.currentSubject.done = true;
      this.dialogRank.visible = this.rankList.length > 0;
    },
    clearHistory() {
      console.clear();
    },

    luckyTabelRow({ row, index }) {
      if (row.id === this.lucky.id) {
        return "success-row";
      }
    },
  },
  mounted() {
    this.client.on("start", (data) => {
      this.courseStatus = CourseStatusType.ANSWER;
      this.answerItem = data;
      this.currentSubject = data;
      this.startSubject(data);
    });

    this.client.on("page", (page) => {
      this.$refs.course.changePage(page);
    });

    this.client.on("closed", () => {
      this.logined = false;
      sessionStorage.removeItem("live_user");
    });

    this.axios.get("/assets/stellar/index.json").then(({ data }) => {
      this.courseList = data.list.map((item) => {
        return "/assets/stellar/" + item;
      });
    });
  },
};
</script>
<style lang="stylus" scoped>
#app {
  .el-drawer-answer {
    width: calc(100% - 410px);
    height: 100%;
  }

  .el-main {
    &.center {
      align-items: center;
    }

    .content {
      position: absolute;
      top: 0;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.35);
    }

    .el-button-group {
      position: absolute;
      bottom: 0;
    }
  }

  .el-aside {
    margin-left: 5px;
    overflow: hidden;

    .video-display {
      margin-bottom: 5px;
      width: 400px;
      height: 300px;
    }

    .online-list {
      height: calc(100% - 305px);
      background: #FFF;

      .el-tabs__content {
        overflow-y: auto;
        overflow-x: hidden;
        height: calc(100% - 40px);
        padding: 0;
        margin: 0px;
      }
    }
  }
}
</style>

<style lang="stylus" scoped>
#app {
  .el-main {
    display: flex;
    position: relative;
    justify-content: center;

    .el-carousel {
      position: absolute;
      z-index: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: darkcyan;
    }

    .login {
      z-index: 666;
    }
  }

  .clear-btn {
    position: fixed;
    right: 5px;
    bottom: 5px;
  }
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
