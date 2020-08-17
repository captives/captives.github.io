<template>
  <el-row>
    <h3>排行榜</h3>
    <el-row
      v-for="item in data"
      :key="item.id"
      class="el-row-list-item"
      :class="[item.id === lucky.id ? 'lucky' : '']"
    >
      <template v-if="item.total > 0">
        <el-col :span="4" align="center">{{item.id}}</el-col>
        <el-col :span="6" align="center">{{getUserById(item.id).name}}</el-col>
        <el-col :span="5" align="center">{{item.time | formatTimeValue}}</el-col>
        <el-col :span="6" align="center">
          <el-rate :value="item.score" disabled text-color="#ff9900"></el-rate>
        </el-col>
        <el-col :span="3" align="center">{{item.total}}</el-col>
      </template>
    </el-row>

    <h2>幸运奖</h2>
    <el-row class="el-row-lucky">
      <el-col :span="4" align="center">{{lucky.id}}</el-col>
      <el-col :span="9" align="center">{{getUserById(lucky.id).name}}</el-col>
      <el-col :span="8" align="center">
        <el-rate :value="lucky.luckyScore" disabled text-color="#ff9900"></el-rate>
      </el-col>
      <el-col :span="3" align="center">+{{lucky.luckyScore}}</el-col>
    </el-row>
  </el-row>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "CompetitionList",
  props: {
    data: {},
    lucky: {}
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters("user", ["getUserById"])
  },
  methods: {
    luckyTabelRow({ row, index }) {
      if (row.id === this.lucky.id) {
        return 'success-row';
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-row-list-item {
  font-size: 18px;

  .el-col {
    line-height: 30px;
    padding: 8px 0;
  }

  &.lucky {
    background: #F56C6C;
    color: #FFF;
    border-radius: 5px;
  }

  .el-rate {
    height: 30px;
    line-height: 30px;

    >>> .el-rate__icon {
      font-size: 30px;
    }
  }
}

h2 {
  margin-top: 50px;
}

.el-row-lucky {
  .el-col {
    height: 50px;
    line-height: 50px;
    font-size: 20px;

    .el-rate {
      >>> .el-rate__icon {
        font-size: 40px;
      }

      >>> .el-rate__item > i {
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
</style>