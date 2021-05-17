<template>
    <div class="more-list">
        <div class="list-item" v-if="title">
            <el-divider content-position="left">{{title}}</el-divider>
            <el-dropdown @command="commandHandler">
                <slot name="title">
                    <span class="el-dropdown-link">预设 <i class="el-icon-arrow-down el-icon--right"></i></span>
                </slot>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in list" :key="index" :command="item.value">{{ item.label }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
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
    @Prop() private readonly list: Array<any>;

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

    private commandHandler(value: string): void {
        if (!this.value.includes(value)) {
            let list: Array<string> = JSON.parse(JSON.stringify(this.value));
            list.push(value);
            this.$emit('input', list);
        }
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
        align-items: center;

        .el-dropdown {
            margin-left: 20px;
            width: 80px;
        }

        .el-icon-tools {
            padding-left: 10px;
            // width: 80px;
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