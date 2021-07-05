<template>
    <el-container>
        <el-header>
            <el-menu mode="horizontal" text-color="#fff" active-text-color="#ffd04b" background-color="#545c64" :collapse="false" @select="navSelectHandler">
                <template v-for="item in list">
                    <el-submenu v-if="item.children" :key="item.path" :index="item.path">
                        <template slot="title">
                            <i v-if="item.icon" :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>

                        <template v-for="sub in item.children">
                            <el-submenu v-if="sub.children" :key="sub.path" :index="sub.path">
                                <template slot="title">{{ sub.name }}</template>
                                <el-menu-item v-for="ssub in sub.children" :key="ssub.path" :index="ssub.path">{{ ssub.name }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :key="sub.path" :index="sub.path">{{ sub.name }}</el-menu-item>
                        </template>
                    </el-submenu>
                    <el-menu-item v-else-if="item.path !='*'" :key="item.path" :index="item.path">{{ item.name }}</el-menu-item>
                </template>
            </el-menu>
        </el-header>
        <router-view></router-view>
    </el-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { RouteConfig } from "vue-router";

@Component({ name: "Main" })
export default class Main extends Vue {
    private list: Array<RouteConfig> = [];
    private created() {
        this.list = this.$router.options.routes || [];

        this.$router.afterEach(() => {
            document.title = "Main - " + this.$route.name;
        });
    }

    private beforeCreate() {
        console.log(this.$route);
        this.$router.afterEach(() => {
            document.title = this.$route.name || document.title;
        });
    }

    private navSelectHandler(path: string, list: any, el: any) {
        console.log("nav", path, list, el);

        this.$router.push({ path: path })
        // const str = list[0] + "#" + path;

        /*   if (path.indexOf(".") != -1) {
              window.location.href = path;
          } else {
              window.location.href = list[0] + "#" + path;
          } */
    }
}
</script>
<style lang="stylus">
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.el-drawer__wrapper {
    >>> .el-drawer:focus {
        outline: none;
    }

    >>> .el-drawer__header {
        padding-top: 20px;
        margin-bottom: 10px;

        &:focus, button:focus {
            outline: none;
        }
    }

    >>> .el-drawer__body {
        position: relative;

        .code {
            position: absolute;
            top: 0;
            left: 20px;
            right: 20px;
            bottom: 20px;
            margin: 0;
        }
    }
}

.el-main.center {
    text-align: initial;
    width: 60%;
    min-width: 750px;
    margin: 0 auto;

    .el-card {
        margin-top: 20px;
    }
}
</style>
<style lang="stylus" scoped>
.el-container {
    display: flex;
    height: 100%;

    .el-header {
        padding: 0;

        >>> ul {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        a {
            display: inline-block;
            margin: 10px;
            text-decoration: none;
        }
    }
}
</style>
