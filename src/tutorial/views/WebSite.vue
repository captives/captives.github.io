<template>
  <el-main>
    <el-header>
      <el-menu
        mode="horizontal"
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#545c64"
        :collapse="isCollapse"
        :default-active="selectActive"
        @select="navSelectHandler"
      >
        <el-menu-item index="/index.html">
          <span class="nav-menu-logo">logo</span>
        </el-menu-item>
        <template v-for="item in list">
          <el-submenu v-if="item.children" :key="item.path" :index="item.path">
            <template slot="title">
              <i :class="item.icon" v-if="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>

            <template v-for="sub in item.children">
              <el-submenu v-if="sub.children" :key="sub.path" :index="sub.path">
                <template slot="title">{{ sub.name }}</template>
                <el-menu-item
                  v-for="ssub in sub.children"
                  :key="ssub.path"
                  :index="ssub.path"
                >{{ssub.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :key="sub.path" :index="sub.path">{{sub.name}}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="item.path" :index="item.path">{{item.name}}</el-menu-item>
        </template>
      </el-menu>
    </el-header>

    <el-row :gutter="50">
      <el-col :span="12">
        <el-tree :data="list" :props="{ label: 'name'}" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="12">
        <el-cascader
          v-model="selectActive"
          :options="list"
          :props="{ label: 'name', value: 'path'}"
          @change="handleChange"
        ></el-cascader>
      </el-col>
    </el-row>
  </el-main>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import list from './../../router';

import NavMenu from '@/components/NavMenu.vue';

// @ts-ignore
@Component({
  name: "WebSite", components: { NavMenu }
})
export default class WebSite extends Vue {
  private isCollapse: boolean = false;
  private selectActive: any | string = '';
  private list: Array<any> = list;

  private handleNodeClick(data: any) { }
  private handleChange(data: any) { }

  private searchPath() {
    const path = window.location.hash.substr(1, window.location.hash.length);
    this.selectActive = path || this.list[0].path;
  }

  private navSelectHandler(path: string, list: any, el: any) {
    console.log('nav', path, list, el);
    const str = list[0] + "#" + path;

    if (path.indexOf('.') != -1) {
      window.location.href = path;
    }else{
      window.location.href = list[0] + "#" + path;
    }

    // if (path.indexOf('.') != -1) {
    //   window.location.href = path;
    // } else {
    //   this.selectActive = path;
    //   this.$router.push({ path });
    // }
  }
}

</script>
<style lang="stylus" scoped>
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
}
</style>