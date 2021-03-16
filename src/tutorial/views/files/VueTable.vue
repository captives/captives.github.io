<template>
    <el-main>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="商品 ID" sortable prop="id">
            </el-table-column>
            <el-table-column label="商品名称" prop="name">
            </el-table-column>
            <el-table-column label="描述" prop="desc">
            </el-table-column>
        </el-table>
        <el-footer>
            这是底部
        </el-footer>
    </el-main>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({ name: 'VueTable' })
export default class VueTable extends Vue {
    private tableData: Array<any> = [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
    }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
    }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
    }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
    }];

    private created() {
        this.tableData = this.tableData.concat(JSON.parse(JSON.stringify(this.tableData))).concat(JSON.parse(JSON.stringify(this.tableData))).concat(JSON.parse(JSON.stringify(this.tableData))).concat(JSON.parse(JSON.stringify(this.tableData)));
        this.tableData.map((item, index) => { item.id += index; return item; })
    }
}
</script>
<style scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>

<style lang="stylus" scoped>
.el-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 60px;
    bottom: 0;

    .el-main {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .el-table {
        flex: 1;
        position: relative;
        overflow: hidden;

        >>> {
            .el-table__header-wrapper {
                position: absolute;
                width: 100%;
                z-index: 2;
                top: 0;
            }

            .el-table__body-wrapper {
                overflow-y: auto;
                height: calc(100% - 55px);
                top: 51px;
            }

            th, td {
                padding: 8px 0;
            }
        }
    }
}
</style>