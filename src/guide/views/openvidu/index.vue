<template>
  <el-main>
    在Windows中是
    <vue-code>
      <pre lang="bash">
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-server-kms:2.11.0
</pre>
    </vue-code>在Windows中是
    <vue-code>
      <pre lang="bash">
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET -e openvidu.publicurl=https://192.168.99.100:4443/ openvidu/openvidu-server-kms:2.11.0
</pre>
    </vue-code>

    <el-row>
      <h3>openvidu-js-node</h3>
      <vue-code>
        <pre lang="bash">node server.js local.uuabc.com:4443 MY_SECRET</pre>
      </vue-code>
      <h3>openvidu-serve</h3>
      <vue-code>
<pre lang="bash">
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET -e openvidu.publicurl=https://local.uuabc.com:4443/ openvidu/openvidu-server-kms:2.11.0
</pre>
      </vue-code>
    </el-row>
  </el-main>
</template>
<script>
export default {
  name: "index",
}
</script>
