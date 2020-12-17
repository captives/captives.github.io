<template>
  <el-main>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="默认" name="/">暂无信息</el-tab-pane>
      <el-tab-pane
        v-for="(list, key) in data"
        :key="key"
        :label="key"
        :name="key"
      >
        <el-row :gutter="50">
          <el-col v-for="item in list" :key="item.title" :span="7">
            <h3>
              <a :href="item.href">{{ item.title }}</a>
            </h3>
            <p>{{ item.desc }}</p>
            <ul v-if="item.about && item.about.length > 0" class="news">
              <li v-for="li in item.about" :key="li.label">
                <a :href="li.value" :title="li.alt">{{ li.label }}</a>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>
<script>
export default {
  name: "Favorite",
  data() {
    return {
      data: {},
      activeName: "",
      error: null,
    };
  },
  created() {
    this.$fetch("/assets/data/favorite.json")
      .then((res) => {
        console.log(res);
        this.data = JSON.parse(res);
        this.activeName = "/";
      })
      .catch((err) => {
        this.error = "数据加载失败";
      });
  },
};
</script>
<style lang="stylus" scoped>
.el-tab-pane {
  .el-row .el-col {
    padding: 20px;
    margin: 20px;
    color: #49cfef;
    background-color: #405261;
    border-left: 1px solid #4c6575;
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  display: inline-block;
}

ul li a, h3 a {
  color: #ffd214;
  padding: 5px 10px;
  text-decoration: none;
}
</style>
