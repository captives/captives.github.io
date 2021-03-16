<template>
  <el-main class="center">
    <h3>JS生成 UUID的四种方法</h3>
    <p>
      全局唯一标识符（GUID，Globally Unique Identifier）也称作 UUID(Universally
      Unique IDentifier) 。
    </p>

    <p>
      GUID是一种由算法生成的二进制长度为128位的数字标识符。GUID
      的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，其中的 x 是 0-9 或 a-f
      范围内的一个32位十六进制数。在理想情况下，任何计算机和计算机集群都不会生成两个相同的GUID。
    </p>

    <p>
      GUID
      的总数达到了2^128（3.4×10^38）个，所以随机生成两个相同GUID的可能性非常小，但并不为0。GUID一词有时也专指微软对UUID标准的实现。
    </p>

    <h3>
      算法一:
      <el-button class="el-icon-refresh" type="text" @click="guid.value1 = create1_uuid()"></el-button>
      <em>{{ guid.value1 }}</em>
    </h3>
    <vue-code>
      <pre lang="js">
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i &lt; 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}</pre>
    </vue-code>

    <h3>
      算法二:
      <el-button class="el-icon-refresh" type="text" @click="guid.value2 = create2_uuid()"></el-button>
      <em>{{ guid.value2 }}</em>
    </h3>
    <vue-code>
      <pre lang="js">
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}</pre>
    </vue-code>

    <h3>
      算法三:
      <el-button class="el-icon-refresh" type="text" @click="guid.value3 = create3_uuid()"></el-button>
      <em>{{ guid.value3 }}</em>
    </h3>
    <vue-code>
      <pre lang="js">
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}</pre>
    </vue-code>

    <h3>
      算法四:
      <el-button class="el-icon-refresh" type="text" @click="guid.value4 = create4_uuid(guid.length, guid.radix)"></el-button>
      <em>{{ guid.value4 }}</em>
      长度
      <el-input-number v-model="guid.length" :min="8" :max="32" size="mini" label="长度"></el-input-number>

      <el-radio-group v-model="guid.radix">
        <el-radio :label="2">二进制</el-radio>
        <el-radio :label="10">十进制</el-radio>
        <el-radio :label="16">十六进制</el-radio>
      </el-radio-group>
    </h3>
    <vue-code>
      <pre lang="js">
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [];
    var i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i &lt; len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i &lt; 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}</pre>
    </vue-code>
    <p>这个可以指定长度和基数。比如:</p>
    <vue-code>
      <pre lang="js">
    // 8 character ID (base=2)
uuid(8, 2) //  "01001010"
    // 8 character ID (base=10)
uuid(8, 10) // "47473046"
    // 8 character ID (base=16)
uuid(8, 16) // "098F4D35"</pre>
    </vue-code>
  </el-main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "JavaScriptGenerateUUID",
})
export default class JavaScriptGenerateUUID extends Vue {
  private guid: any = {
    length: 8,
    radix: 2,
    value1: "",
    value2: "",
    value3: "",
    value4: "",
  };

  private create1_uuid() {
    var s: any = [];
    var hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  }

  private create2_uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private create3_uuid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  private create4_uuid(len: number, radix: number) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    var uuid = [];
    var i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join("");
  }

  private mounted() {
    this.guid.value1 = this.create1_uuid();
    this.guid.value2 = this.create2_uuid();
    this.guid.value3 = this.create3_uuid();
    this.guid.value4 = this.create4_uuid(this.guid.length, this.guid.radix);
  }
}
</script>