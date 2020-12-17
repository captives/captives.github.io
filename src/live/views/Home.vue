<template>
  <el-container>
    <el-main>
      <article v-for="(item, index) in list" :key="index" class="card">
        <header class="card__header">
          <img :src="thumbs[index]" alt />
        </header>
        <div class="card__body">
          <div class="card__category">{{ item.label }}</div>
          <h2 class="card__title">{{ item.title }}</h2>
          <div class="card__subtitle">-- {{ item.subtitle }}</div>

          <el-row class="card__description" :gutter="10">
            <el-col :span="18">
              <el-input v-model="tdvalue" placeholder="请输入房间号" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="enterRoom(item.type)"
                >进入</el-button
              >
            </el-col>
          </el-row>
        </div>
        <footer class="card__footer"></footer>
      </article>
    </el-main>
    <el-footer v-show="false">
      <el-row class="card__description" :gutter="10">
        <el-col :span="12">
          <el-input v-model="tdvalue" placeholder="请输入房间号" />
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="enterRoom('chat')">进入</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="success" @click="enterRoom('1v1')">进入</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" @click="enterRoom('1vn')">进入</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="warning" @click="enterRoom('live')">进入</el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//@ts-ignore
import card_1 from "./../assets/card_1.png";
//@ts-ignore
import card_2 from "./../assets/card_2.png";
//@ts-ignore
import card_3 from "./../assets/card_3.png";
//@ts-ignore
import card_4 from "./../assets/card_4.png";

@Component({ name: "Home" })
export default class Home extends Vue {
  private tdvalue: number | null = null;

  private list: Array<any> = [
    {
      label: "聊天会议室",
      title: "人闲桂花落，夜静春山空。",
      subtitle: "王维",
      type: "chat",
    },
    {
      label: "私密会议室",
      title: "荷风送香气，竹露滴清响。",
      subtitle: "孟浩然",
      type: "1v1",
    },
    {
      label: "公共会议室",
      title: "秋窗犹曙色，落木更天风。",
      subtitle: "杜甫",
      type: "1vn",
    },
    {
      label: "直播会议室",
      title: "墙角数枝梅，凌寒独自开。",
      subtitle: "王安石",
      type: "live",
    },
  ];
  private thumbs: Array<any> = [card_1, card_2, card_3, card_4];

  private enterRoom(type: string) {
    //@ts-ignore
    this.$router.push({ path: `/${type}/${this.tdvalue}` });
  }
}
</script>

<style lang="stylus" scoped>
.el-main {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.card {
  position: relative;
  display: inline-block;
  width: 350px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.5s;

  .card__header {
    height: 380px;
    overflow: hidden;
    background-color: #000;
    transition: height 0.5s;

    img {
      display: block;
      opacity: 1;
      width: 100%;
      transform: scale(1);
      transition: opacity 0.5s, transform 0.5s;
    }
  }

  /* *BODY* */
  .card__body {
    position: relative;
    height: 80px;
    padding: 20px;
    transition: height 0.5s;

    .card__category {
      position: absolute;
      top: -25px;
      left: 0;
      height: 25px;
      padding: 0 15px;
      background-color: coral;
      color: #fff;
      text-transform: uppercase;
      font-size: 11px;
      line-height: 25px;
    }

    .card__title {
      margin: 0;
      padding: 0 0 10px 0;
      color: #000;
      font-size: 22px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .card__subtitle {
      text-align: right;
      margin: 0;
      padding: 0 0 10px 0;
      font-size: 19px;
      color: coral;
    }

    .card__description {
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 26px;
      margin: 0;
      padding: 0;
      color: #666C74;
      line-height: 27px;
      opacity: 0;
      transform: translateY(45px);
      transition: opacity 0.3s, transform 0.3s;
      transition-delay: 0s;
    }
  }
}

.card:hover {
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);

  .card__header {
    height: 330px;

    img {
      opacity: 0.6;
      transform: scale(1.2);
    }
  }

  .card__body {
    height: 130px;

    .card__description {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.2s;
    }
  }

  .card__footer {
    position: absolute;
    bottom: 12px;
    left: 20px;
    right: 20px;
    font-size: 11px;
    color: #A3A9A2;
  }
}
</style>
