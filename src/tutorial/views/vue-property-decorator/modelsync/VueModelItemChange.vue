<template>
    <el-alert type="success" :closable="false">{{name}} <el-button type="info" size="mini" @click="updateHandler">更改值</el-button>
    </el-alert>
</template>
<script lang='ts'>
import { Component, Vue, ModelSync } from 'vue-property-decorator'
@Component({ name: 'VueModelItemChange' })
export default class VueModelItemChange extends Vue {
    @ModelSync('value', 'change', { type: String, default: "默认值" }) private name: string;

    private updateHandler() {
        this.name = "update --->" + Date.now();
        console.log(this.name);
    }
}
</script>