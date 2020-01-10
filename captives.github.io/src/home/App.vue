<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">HOME</router-link> &nbsp;|&nbsp;
      <router-link to="/about">ABOUT</router-link>&nbsp;|&nbsp;
      <a href="/live.html">LIVE</a> &nbsp;|&nbsp;
      <a href="/webrtc.html">WEB RTC</a> &nbsp;|&nbsp;
      <a href="/charts.html">图表</a>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
