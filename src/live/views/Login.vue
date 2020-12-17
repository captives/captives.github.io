<template>
  <el-container>
    <el-collapse v-model="activeName" accordion class="login-panel">
      <el-collapse-item name="a">
        <el-row :gutter="10" slot="title" style="width: 100%">
          <el-col :span="20"> 登陆 </el-col>
          <el-col :span="4" v-if="activeName === 'a'">
            <el-button type="text" @click="loginHandler">登入</el-button>
          </el-col>
        </el-row>
        <el-input v-model="user.name" placeholder="请输入用户名">
          <template slot="prepend">用户名</template>
        </el-input>
        <el-input v-model="user.password" placeholder="请输入密码">
          <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
        </el-input>
        <el-button type="primary" @click="loginHandler">登入</el-button>
      </el-collapse-item>

      <el-collapse-item name="b">
        <el-row :gutter="10" slot="title" style="width: 100%">
          <el-col :span="20"> 注册 </el-col>
          <el-col :span="4" v-if="activeName === 'b'">
            <el-button type="text" @click="regHandler">注册</el-button>
          </el-col>
        </el-row>

        <el-input v-model="user.name" placeholder="请输入用户名">
          <template slot="prepend">用户名</template>
        </el-input>
        <el-input v-model="user.password" placeholder="请输入密码">
          <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
        </el-input>
        <el-button type="danger" @click="regHandler">注册</el-button>
      </el-collapse-item>
      <el-collapse-item name="c">
        <el-row :gutter="10" slot="title" style="width: 100%">
          <el-col :span="20"> 管理 </el-col>
          <el-col :span="4" v-if="activeName === 'c'"></el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "./../api/index";
@Component({
  name: "Login",
})
export default class Login extends Vue {
  private actived = false;
  private activeName = "a";

  private user: any = {
    name: "admin",
    password: "123456",
    role: "",
    channel: "",
  };

  private loginHandler() {
    api
      .create(this.user.name, this.user.password)
      .then((res: any) => {
        if (res.success) {
          //@ts-ignores
          this.$router.push({ path: "/home" });
        } else {
          //@ts-ignore
          this.$message({ type: "danger", message: "用户名密码错误" });
        }
      })
      .catch((err: any) => {
        //@ts-ignore
        this.$message({ type: "danger", message: "请求失败" });
      });
  }

  private regHandler() {
    api.register(this.user.name, this.user.password).then((res: any) => {
      if (res.success) {
        //@ts-ignore
        this.$message({ type: "success", message: "用户注册成功" });
      } else {
        //@ts-ignore
        this.$message({ type: "danger", message: "用户注册失败" });
      }
    });
  }
}
</script>
<style lang="stylus" scoped>
.el-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-panel {
    position: absolute;
    width: 25%;
    text-align: center;

    >>> .el-tabs__content {
      padding-left: 100px;
    }

    .el-input, .el-button {
      margin-top: 5%;
    }
  }
}
</style>
