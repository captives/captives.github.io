<template>
  <el-main>
    <!--
    <h1>HTML5 WebStorage</h1>
    <h2>LocalStorage/SessionStorage</h2>
    <p>这两个是以键值对（字符串）存储的解决方案，存储少量数据结构很有用，但是对于大量结构化数据就无能为力了，灵活大不够强大。</p>
    //-->

    <h2>Web SQL Database</h2>
    <p>在数据库中处理大量结构化数据，html5引入Web SQL Database概念，它使用 SQL 来操纵客户端数据库的 API，这些 API 是异步的，规范中使用的是SQLlite（SQL后端）。</p>
    <h4>三个核心方法</h4>
    <ul>
      <li>1、openDatabase：这个方法使用现有数据库或创建新数据库创建数据库对象。</li>
      <li>2、transaction：这个方法允许我们根据情况控制事务提交或回滚。</li>
      <li>3、executeSql：这个方法用于执行真实的SQL查询。</li>
    </ul>
    <h4>新建/打开数据库</h4>
    <el-row>
      openDatabase方法可以打开已经存在的数据库，不存在则创建：
      <vue-code>
        <pre lang="javascript">var dataBase = window.openDatabase(database_name, database_version, database_displayname, database_size);</pre>
      </vue-code>
      <span>参数分别为：数据库名、版本号、描述、数据库大小。</span>
    </el-row>
    <el-row style="padding: 20px 0px;">
      <el-form :inline="true" :model="dataBase" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="dataBase.name" placeholder="数据库名称" :disabled="dataBase.connected"></el-input>
        </el-form-item>
        <el-form-item label="版本号">
          <el-input v-model="dataBase.version" placeholder="版本号" :disabled="dataBase.connected"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dataBase.desc" placeholder="数据库名" :disabled="dataBase.connected"></el-input>
        </el-form-item>
        <el-form-item label="大小">
          <el-input v-model="dataBase.size" placeholder="数据库名" :disabled="dataBase.connected"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" v-if="dataBase.connected" @click="unConnectHandler">断开数据库</el-button>
          <el-button type="primary" v-else @click="connectHandler">连接数据库</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <h4>插入/查询数据操作</h4>
    <el-row>
      <el-form :inline="true" :model="table" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="table.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="table.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertHandler">插入数据</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </el-row>
  </el-main>
</template>
<script>
export default {
  name: "OpenDatabase",
  data() {
    return {
      db: null,
      dataBase: {
        name: "websql",
        version: 1,
        desc: "4M Web DB",
        size: 1024 * 1024 * 4,
        connected: false
      },
      table: {
        name: "",
        address: ""
      },
      tableData: []
    }
  },
  methods: {
    connectHandler() {
      const that = this;
      this.db = window.openDatabase(
        this.dataBase.name + this.dataBase.version,
        this.dataBase.version,
        this.dataBase.desc,
        this.dataBase.size,
        res => {
          this.dataBase.connected = true;
        });
      this.dataBase.connected = true;
      console.log(this.db);

      this.db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS demos (id, name, address)');
        that.queryTableDataList();
      });
      
    },
    insertHandler() {
      const that = this;
      const sql = `INSERT INTO demos (id, name, address) VALUES (${Date.now()}, ${this.table.name}, ${this.table.address})`;
      this.db.transaction(tx => { 
        tx.executeSql(sql); 
        that.queryTableDataList();
      });
    },
    queryTableDataList() {
      const that = this;
      that.tableData = [];
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM demos', [], (tx, results) => {
          console.log(results.rows);
          for (var i = 0; i < results.rows.length; i++) {
            that.tableData.push(results.rows[i]);
          }
        });
      })
    },
    unConnectHandler() {
      this.dataBase.connected = false;
    }
  }
}
</script>