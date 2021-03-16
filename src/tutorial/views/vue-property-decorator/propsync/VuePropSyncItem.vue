<template>
    <el-alert :type="type()" :closable="false">{{syncedName}}
        <div slot="title">
            <el-button :type="type()" size="mini" @click="changeHandler">更改值</el-button>
        </div>
    </el-alert>
</template>
<script lang='ts'>
import { Component, Vue, PropSync, Provide, Inject } from 'vue-property-decorator'
@Component({ name: 'VuePropSyncItem' })
export default class VuePropSyncItem extends Vue {
    @Inject() private readonly type!: Function;
    @PropSync('name', { type: String, default: "这是默认值" }) syncedName!: string;

    private changeHandler() {
        this.syncedName = "内部更改" + Date.now();
        console.log('更改后', this.syncedName);
    }
}
</script>