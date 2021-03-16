<template>
    <el-alert type="success" :closable="false">{{value}} <el-button type="info" size="mini" @click="updateHandler">更改值</el-button>
    </el-alert>
</template>
<script lang='ts'>
import { Component, VModel, Vue } from 'vue-property-decorator'
@Component({ name: 'VueVModelItem' })
export default class VueVModelItem extends Vue {
    //'value', 'input', 
    @VModel({ type: String, default: "默认值" }) private time: string;
    private updateHandler() {
        this.time = "Now: " + new Date().toLocaleString();
    }
}
</script>