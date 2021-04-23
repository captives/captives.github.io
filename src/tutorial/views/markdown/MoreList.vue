<template>
    <div class="more-list">
        <el-divider v-if="title" content-position="left">{{title}}</el-divider>
        <div class="list-item" v-for="(item,index) in value" :key="index">
            <el-input :value="item" :placeholder="placeholder" @input="changeItemAtIndex($event, index)"></el-input>
            <span class="el-icon-tools">
                <i class="el-icon el-icon-circle-plus" @click="addItemAtIndex(index)"></i>
                <i class="el-icon el-icon-error" v-if="value.length > 1" @click="removeItemAtIndex(index)"></i>
            </span>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
@Component({ name: 'MoreList' })
export default class MoreList extends Vue {
    @Prop({ default: () => [""] }) private value: Array<string>;
    @Prop() private readonly title: string;
    @Prop({ default: "请输入" }) private readonly placeholder: string;

    private changeItemAtIndex(value: string, index: number) {
        let list: Array<string> = JSON.parse(JSON.stringify(this.value));
        list.splice(index, 1, value);
        this.$emit('input', list);
    }

    private addItemAtIndex(index: number): void {
        let list: Array<string> = JSON.parse(JSON.stringify(this.value));
        list.splice(index + 1, 0, "");
        this.$emit('input', list);
    }

    private removeItemAtIndex(index: number): void {
        let list: Array<string> = JSON.parse(JSON.stringify(this.value));
        list.splice(index, 1);
        this.$emit('input', list);
    }

    created() {
        if (!this.value.length) {
            this.$emit('input', [""]);
        }
    }
}
</script>
<style lang='stylus' scoped>
.more-list {
    .list-item {
        display: flex;
        margin-bottom: 10px;

        .el-icon-tools {
            padding-left: 10px;
            width: 80px;
            height: 28px;
            line-height: 28px;
            color: #cccccc;
            display: flex;
            align-items: center;

            .el-icon {
                font-size: 20px;
                color: #ff4d4f;
                cursor: pointer;
                transition: all 0.2s;
                opacity: 0.85;

                &:hover {
                    opacity: 1;
                    transform: scale(1.2);
                }

                &.el-icon-circle-plus {
                    color: #4790f1;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>