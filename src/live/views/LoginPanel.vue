<template>
  <el-form :model="user" label-width="80px">
    <el-form-item label="UID: ">
      <el-select v-model="user.id" placeholder="请选择UID">
        <el-option v-for="id in idList" :key="id" :label="id" :value="id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="班级: ">
      <el-select v-model="user.td" placeholder="请选择班级">
        <el-option v-for="{label, td} in classList" :key="td" :label="label" :value="td"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="角色: ">
      <el-select v-model="user.classType" placeholder="请选择橘色">
        <el-option v-for="{label, value} in classTypes" :key="value" :label="label" :value="value"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="昵称">
      <el-input v-model="user.name" placeholder="请输入昵称"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="success" @click="onSubmit(RoleType.PUBLISHER)">老师进入</el-button>
      <el-button type="primary" @click="onSubmit(RoleType.SUBSCRIBER)">学生进入</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "LoginPanel",
  data() {
    return {
      logined: false,
      idList: [
        1001,
        1002,
        1003,
        1004,
        1005,
        1006,
        1007,
        1008,
        1009],
      classList: [
        { label: '甘露班', td: 1001 },
        { label: '晨曦班', td: 1002 },
        { label: '花儿班', td: 1003 },
        { label: '伶俐班', td: 1004 },
        { label: '铃茉莉班', td: 1005 },
        { label: '小太阳班', td: 1006 },
        { label: '冰淇淋班', td: 1007 },
        { label: '可爱猪班', td: 1008 }
      ],
      classTypes: [
        { label: '直播', value: 1 },
        { label: '一对一', value: 2 },
        { label: '一对多', value: 3 },
      ],
      user: {
        td: 1002,
        id: 1001,
        classType: 1,
        name: '希西',
        label: '甘露班',
        role: 0
      }
    }
  },
  methods: {
    ...mapActions("UserData", ["setUser", "initUsers", "pushUser", "removeUser"]),
    connected() {
      this.logined = false;
      const us = sessionStorage.getItem("live_user");
      if (us) {
        const user = JSON.parse(us);
        this.user.name = user.name;
        this.user.td = user.td;
        this.user.label = user.label;
        this.onSubmit(user.role);
      }
    },
    disconnected() {
      this.logined = false;
    },
    closed() {
      this.logined = false;
    },
    onSubmit(role) {
      const that = this;
      const option = this.classList.filter(item => item.td === this.user.td);
      if (option.length > 0) {
        this.user.role = role;
        // this.client.register(option[0].td, this.$fingerprint, this.user.name, role, data => {
        this.client.register(option[0].td, this.user.id, this.user.name, role, data => {
          const us = { ...that.user, ...data };
          sessionStorage.setItem('live_user', JSON.stringify({ td: us.td, id: us.id, name: us.name, label: us.label, role: us.role }));
          that.setUser(us);
          that.$emit('complete', us);
        });
      }
    }
  },
  mounted() {
    this.client.init("wss://" + window.location.hostname + ":3000", '/live');
    this.client.on('connected', this.connected);
    this.client.on('entry', this.pushUser);
    this.client.on('list', this.initUsers);
    this.client.on('leave', this.removeUser);
    this.client.on('disconnect', this.disconnected);
    this.client.on('closed', this.closed);
  },
}
</script>
<style lang="stylus" scoped>
.el-form {
  >>> .el-form-item__label {
    color: #FFF;
  }
}
</style>