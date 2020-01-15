<template>
  <el-container id="app">
    <el-header class="center">
      <router-link to="/">HOME</router-link>&nbsp;|&nbsp;
      <router-link to="/about">ABOUT</router-link>&nbsp;|&nbsp;
      <router-link to="/element">ElementUI</router-link>&nbsp;|&nbsp;
      <a href="/live.html">LIVE</a> &nbsp;|&nbsp;
      <a href="/webrtc.html">WEB RTC</a> &nbsp;|&nbsp;
      <a href="/charts.html">图表</a>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>