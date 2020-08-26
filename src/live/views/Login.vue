<template>
  <el-container>
    <div class="login-panel">
      <el-input placeholder="请输入用户名" v-model="user.name">
        <template slot="prepend">用户名</template>
      </el-input>
      <el-input placeholder="请输入密码" v-model="user.password">
        <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
      </el-input>
      <el-button @click="loginHandler" type="primary">登入</el-button>
    </div>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import api from './../api/index'
@Component({
  name: "Login"
})
export default class Login extends Vue {
  private user: any = { name: 'admin', password: '123456', role: '', channel: '' };

  private loginHandler() {
    api.create(this.user.name, this.user.password).then((res: any) => {
      if (res.success) {
        //@ts-ignores
        this.$router.push({ path: "/room" });
      } else {
        //@ts-ignore
        this.$message({ type: 'danger', type: "用户名密码错误" });
      }
    }).catch((err: any) => {
      //@ts-ignore
      this.$message({ type: 'danger', type: "请求失败" });
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

  .login-panel {
    margin: 10% auto;
    text-align: center;

    .el-input, .el-button {
      margin-top: 5%;
    }
  }
}
</style>