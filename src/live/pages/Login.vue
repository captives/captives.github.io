<template>
    <el-container>
        <el-card v-if="activeName == 'login'" shadow="hover" style="width: 520px">
            <div slot="header">
                <span>登陆</span>
                <span style="float: right; padding: 2px">
                    <el-button type="text" @click="changeActive('register')">注册</el-button>
                    <el-button type="text" @click="changeActive('manager')">管理</el-button>
                </span>
            </div>
            <el-input v-model="user.name" placeholder="请输入用户名">
                <template slot="prepend">用户名</template>
            </el-input>

            <el-input v-model="user.password" placeholder="请输入密码">
                <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
            </el-input>

            <el-button type="primary" @click="loginHandler">登入</el-button>
        </el-card>

        <el-card v-if="activeName == 'register'" shadow="hover" style="width: 520px">
            <div slot="header">
                <span>注册</span>
                <span style="float: right; padding: 2px">
                    <el-button type="text" @click="changeActive('login')">登陆</el-button>
                    <el-button type="text" @click="changeActive('manager')">管理</el-button>
                </span>
            </div>

            <el-input v-model="user.name" placeholder="请输入用户名">
                <template slot="prepend">用户名</template>
            </el-input>
            <el-input v-model="user.password" placeholder="请输入密码">
                <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
            </el-input>
            <el-button type="danger" @click="regHandler">注册</el-button>
        </el-card>

        <el-card v-if="activeName == 'manager'" shadow="hover" style="width: 520px">
            <div slot="header">
                <span>管理</span>
                <span style="float: right; padding: 2px">
                    <el-button type="text" @click="changeActive('login')">登陆</el-button>
                    <el-button type="text" @click="changeActive('register')">注册</el-button>
                </span>
            </div>

            <el-input v-model="user.name" placeholder="请输入用户名">
                <template slot="prepend">用户名</template>
            </el-input>
            <el-input v-model="user.password" placeholder="请输入密码">
                <template slot="prepend">密&nbsp;&nbsp;&nbsp;码</template>
            </el-input>
            <el-button type="primary" disabled>登入</el-button>
        </el-card>
    </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "./../api/index";
@Component({
    name: "Login",
})
export default class Login extends Vue {
    private actived = false;
    private activeName = "login";
    private changeActive(value: string) {
        this.activeName = value;
    }

    private user: any = {
        name: "admin",
        password: "123456",
        role: "",
        channel: "",
    };

    private loginHandler() {
        api.create(this.user.name, this.user.password).then((res: any) => {
            if (res.success) {
                //@ts-ignores
                this.$router.push({ path: "/home" });
            } else {
                //@ts-ignore
                this.$message({ type: "danger", message: "用户名密码错误" });
            }
        }).catch((err: any) => {
            //@ts-ignore
            this.$message({ type: "danger", message: "请求失败" });
        });
    }

    private regHandler() {
        api.register(this.user.name, this.user.password).then((res: any) => {
            if (res.success) {
                //@ts-ignore
                this.$message({ type: "success", message: "用户注册成功" });
            } else {
                //@ts-ignore
                this.$message({ type: "danger", message: "用户注册失败" });
            }
        });
    }
}
</script>
<style lang="stylus" scoped>
.el-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-card {
        position: absolute;
        width: 25%;
        text-align: center;

        .el-input, .el-button {
            margin-top: 5%;
        }
    }
}
</style>
