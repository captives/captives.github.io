<template>
  <div>
    <el-alert type="success" :closable="false">
      <b>班级：</b>
      {{user.td}} # {{user.label}}
    </el-alert>

    <el-alert type="info" :closable="false">
      <b>姓名：</b>
      {{user.name}}
    </el-alert>
    <el-alert type="warning" :closable="false">
      <b>ID：</b>
      {{user.id}}
    </el-alert>
    <el-alert type="info" :closable="false">
      <b>角色：</b>
      {{RoleType[user.role]}}
    </el-alert>

    <el-alert type="warning" :closable="false">
      <b>SID：</b>
      {{user.sid}}
    </el-alert>

    <el-alert type="info" :closable="false">
      <b>登陆时间：</b>
      {{user.time | localTime}}
    </el-alert>
    <el-row class="footer">
      <slot :data="user"></slot>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "UserProfile",
  props: {
    user: {

    }
  }
}
</script>
<style lang="stylus" scoped>
    .footer{
        margin-top 50px;
        width 100%;
        text-align center;
    }
</style>