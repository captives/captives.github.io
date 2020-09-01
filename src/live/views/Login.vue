<template>
  <el-container>
    <el-tabs tab-position="left" class="login-panel">
      <el-tab-pane label="登陆">
        <h1>登陆</h1>
        <el-input placeholder="请输入用户名" v-model="user.name">
          <template slot="prepend">用户名</template>
        </el-input>
        <el-input placeholder="请输入密码" v-model="user.password">
          <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
        </el-input>
        <el-button @click="loginHandler" type="primary">登入</el-button>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <h1>注册</h1>
        <el-input placeholder="请输入用户名" v-model="user.name">
          <template slot="prepend">用户名</template>
        </el-input>
        <el-input placeholder="请输入密码" v-model="user.password">
          <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
        </el-input>
        <el-button @click="regHandler" type="danger">注册</el-button>
      </el-tab-pane>
      <el-tab-pane label="管理">管理</el-tab-pane>
    </el-tabs>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import api from './../api/index'
@Component({
  name: "Login"
})
export default class Login extends Vue {
  private actived: boolean = false;
  private user: any = { name: 'admin', password: '123456', role: '', channel: '' };

  private loginHandler() {
    api.create(this.user.name, this.user.password).then((res: any) => {
      if (res.success) {
        //@ts-ignores
        this.$router.push({ path: "/home" });
      } else {
        //@ts-ignore
        this.$message({ type: 'danger', message: "用户名密码错误" });
      }
    }).catch((err: any) => {
      //@ts-ignore
      this.$message({ type: 'danger', message: "请求失败" });
    });
  }

  private regHandler() {
    api.register(this.user.name, this.user.password).then((res: any) => {
      if (res.success) {
        //@ts-ignore
         this.$message({ type: "success", message: "用户注册成功" });
        } else {
        //@ts-ignore
        this.$message({ type: 'danger', message: "用户注册失败" });
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
    width: 30%;
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