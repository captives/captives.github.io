<template>
  <el-main class="center">
    <el-row
      :gutter="50"
      class="center"
    >
      <el-col
        class="center"
        :xs="24"
        :sm="24"
        :md="12"
      >
        <el-table
          :data="tableData"
          stripe
        >
          <el-table-column
            prop="name"
            label="User"
          >
          </el-table-column>
          <el-table-column
            prop="pass"
            label="Password"
          >
          </el-table-column>
          <el-table-column
            prop="role"
            label="Role"
          >
          </el-table-column>
          <el-table-column label>
            <el-button
              slot-scope="scope"
              @click="loginHandler(scope.row)"
            >Enter</el-button>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col
        class="center"
        :xs="12"
        :sm="12"
        :md="6"
      >
        <el-divider content-position="left">video session</el-divider>
        <el-form label-width="80px">
          <el-form-item label="Participant:">
            <el-input v-model="participant"></el-input>
          </el-form-item>
          <el-form-item label="Session:">
            <el-input v-model="session"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success">join !</el-button>
            <el-button type="primary">logout</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row
      :gutter="50"
      class="video-view"
    >
      <div class="videoplay main">
        <video
          autoplay
          muted
          loop
        ></video>
        <p>标签二</p>
        <p class="right">标签二</p>
      </div>
      <div class="videoplay">
        <video
          autoplay
          muted
          loop
        ></video>
        <p>标签二</p>
        <p class="right">标签二</p>
      </div>
    </el-row>
  </el-main>
</template>
<script>
import { OpenVidu } from "openvidu-browser";

const SERVER_URL = "https://local.uuabc.com:5000/";
export default {
  name: "AudioVideoCall",
  data() {
    return {
      tableData: [
        { name: 'publisher1', pass: 'pass', role: 'PUBLISHER' },
        { name: 'publisher2', pass: 'pass', role: 'PUBLISHER' },
        { name: 'subscriber', pass: 'pass', role: 'SUBSCRIBER' }
      ],
      username: 'SessionA3',
      password: "",
      participant: "",
      session: "",
      OV: null,
      session: null,
    }
  },
  methods: {
    httpPostRequest(url, body, errorMsg, callback) {
      var http = new XMLHttpRequest();
      http.open('POST', url, true);
      http.setRequestHeader('Content-type', 'application/json');
      http.addEventListener('readystatechange', processRequest, false);
      http.send(JSON.stringify(body));

      function processRequest() {
        if (http.readyState == 4) {
          if (http.status == 200) {
            try {
              callback(JSON.parse(http.responseText));
            } catch (e) {
              callback();
            }
          } else {
            console.warn(errorMsg);
            console.warn(http.responseText);
          }
        }
      }
    },
    loginHandler(user) {
      console.log('login', user);
      //   this.axios({
      //     method: 'POST',
      //     url: SERVER_URL + "api-login/login",
      //     data: JSON.stringify({ user: user.name, pass: user.pass }),
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //   }).then(response => {
      //     console.log(response);
      //   })
      //     .catch(function (error) {
      //       console.log(error);
      //     });

      this.httpPostRequest(
        SERVER_URL + 'api-login/login',
        { user: user.name, pass: user.pass },
        'Login WRONG',
        (response) => {
          console.log(response);
        });
    },
    joinSession() {
      this.OV = new OpenVidu();
      this.session = this.OV.initSession();
      this.session.on('streamCreated', ({ stream }) => {
        this.session.subscribe(stream, 'subscriber');
      });

      this.getToken(this.userName).then(token => {
        this.session.connect(token).then(() => {
          var publisher = this.OV.initPublisher("publisher");
          this.session.publish(publisher);
        }).catch(error => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        })
      });
    },
    leaveSession() {
      if (this.session) {
        this.session.disconnect();
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.video-view {
  .videoplay {
    position: relative;
    display: block;
    float: left;
    margin: 5px;
    width: 240px;
    height: 180px;
    background: #EEE;
    overflow hidden;

    video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    p {
      position: absolute;
      left: 0;
      top: -13px;
      color: #FFF;
      font-size: 14px;
      padding: 1px 10px;
      background: rgba(0, 0, 0, 0.55);

      &.right {
        left: inherit;
        right: 0;
        font-size: 11px;
        background: rgba(18, 140, 118, 0.55);
      }
    }

    &.main {
      width: 490px;
      height: 370px;
    }
  }
}
</style>