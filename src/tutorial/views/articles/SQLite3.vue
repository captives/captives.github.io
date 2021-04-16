<template>
    <el-main class="center">
        <h3>SQLite3 基础知识</h3>
        <p>连接到指定到数据库文件</p>
        <vue-code>
            <pre lang="bash"> sqlite3 filename.sqlitedb </pre>
        </vue-code>
        <p>退出SQLite客户端软件</p>
        <vue-code>
            <pre lang="bash"> sqlite>.exit </pre>
        </vue-code>
        <p>显示数据库中的表</p>
        <vue-code>
            <pre lang="bash"> sqlite>.tables </pre>
        </vue-code>
        <p>将表结构转成SQL语句</p>
        <vue-code>
            <pre lang="bash"> .dump table-name </pre>
        </vue-code>
        <p>运行结果</p>
        <vue-code>
            <pre lang="sql">PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE article (
    id              INTEGER     PRIMARY KEY AUTOINCREMENT,              -- 账户id
    enabled         INTEGER     default 0,                              -- 默认禁用
    create_time     INTEGER     default (datetime('now', 'localtime')), -- 创建日期
    name            TEXT        NOT NULL,                               -- 昵称
    birthday        INTEGER                                             -- 生日
);
COMMIT;</pre>
        </vue-code>
    </el-main>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'SQLite3'
})
export default class SQLite3 extends Vue {

}
</script>