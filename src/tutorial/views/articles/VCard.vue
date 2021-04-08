<template>
    <el-main>
        <h1>
            VCard 电子名片
        </h1>
        <qr-code :value="value"></qr-code>
        <vue-code>
            <pre lang="html">{{value}}</pre>
        </vue-code>
    </el-main>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'VCard'
})

export default class VCard extends Vue {
    private value: string = `BEGIN:VCARD 
VERSION:3.0 
N:姓;名 
TEL;CELL;VOICE:183-0000-7788 
TEL;WORK;VOICE: 
EMAIL:ming.xing@live.com 
TITLE:资深工程师 
ROLE:研发组 
ORG:互联网教育 
ADR;WORK:;;单位地址;深圳;广东;433000;中国 
ADR;HOME;POSTAL;PARCEL:;;街道地址;深圳;广东;433330;中国 
URL: wwwedu
END:VCARD`;
}
</script>
<style lang='stylus' scoped></style>