<template>
    <div class="main">
        <div ref="header" class="header">
            <slot></slot>
            <h2>这是标题
                <el-checkbox v-model="stick" @change="onresize">{{stick?'钉住':'适配'}}</el-checkbox>
                <el-button type="text" @click="clickHandler">{{extend?'收起':'展开'}}</el-button>
            </h2>
            <p v-if="extend" style="height:300px;margin:0">

            </p>
        </div>
        <el-table :data="tableData" :style="{height:maxHeight}" :max-height="maxHeight">
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
            <el-table-column fixed min-width="100px" label="商品 ID" sortable prop="id">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称1" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述1" prop="desc">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称2" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述2" prop="desc">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称3" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述3" prop="desc">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称4" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述4" prop="desc">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称5" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述5" prop="desc">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称6" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述6" prop="desc">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称7" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述7" prop="desc">
            </el-table-column>
            <el-table-column min-width="200px" label="商品名称8" prop="name">
            </el-table-column>
            <el-table-column min-width="300px" label="描述8" prop="desc">
            </el-table-column>
            <el-table-column fixed="right" min-width="120px" label="商品名称9" prop="name">
            </el-table-column>
            <el-table-column fixed="right" min-width="200px" label="描述9" prop="desc">
            </el-table-column>

        </el-table>
        <div ref="footer" class="footer">
            <slot></slot>
            <el-pagination background layout="prev, pager, next" @current-change="changePage" :page-size="pageInfo.size" :total="pageInfo.total">
            </el-pagination>
            <h4>这是版权信息</h4>
        </div>
    </div>
</template>
<script lang='ts'>
import { entries } from 'lodash';
import { Component, Vue } from 'vue-property-decorator'
@Component({ name: 'VueTable' })
export default class VueTable extends Vue {
    private extend: boolean = false;//展开收缩
    private stick: boolean = true;//固定住
    private maxHeight: string | null = "100%";
    private pageInfo: any = { page: 1, size: 50, total: 1 };
    private tableData: Array<any> = [];

    private list: Array<any> = [];

    private changePage(page: number) {
        this.pageInfo.page = page;
        this.tableData = this.list.slice((this.pageInfo.page - 1) * this.pageInfo.size, this.pageInfo.page * this.pageInfo.size);
    }

    private created() {
        for (let i = 0; i < 2000; i++) {
            this.list.push({
                id: '1298712' + i,
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333'
            });
        }
        this.pageInfo.total = this.list.length;
        this.changePage(1);
    }

    private clickHandler() {
        this.extend = !this.extend;
        this.$nextTick(() => {
            this.onresize();
        })
    }

    private onresize() {
        let doc = document.documentElement.getBoundingClientRect();
        let main = (this.$el as HTMLElement).getBoundingClientRect();
        let header = (this.$refs['header'] as HTMLElement).getBoundingClientRect();
        let footer = (this.$refs['footer'] as HTMLElement).getBoundingClientRect();
        if (this.stick) {
            this.maxHeight = Math.floor(doc.height - main.top - footer.height) + "px";
        } else {
            this.maxHeight = Math.floor(doc.height - header.top - header.height - footer.height) + "px";
        }
        console.log('header', header);
        console.log('footer', footer);
        console.log('main', main);
        console.log('document', document.documentElement.getBoundingClientRect());
    }

    private mounted() {
        //@ts-ignore;
        const resizeObserver: any = new ResizeObserver((entries: Array<any>) => {
            this.onresize();
        });
        window.addEventListener('resize', this.onresize);
        resizeObserver.observe(this.$el);
        resizeObserver.observe(this.$refs['header'] as HTMLElement);
        resizeObserver.observe(this.$refs['footer'] as HTMLElement);
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
<style>
html,
body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
</style>

<style lang="stylus" scoped>
.el-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 60px;
    bottom: 0;

    .main {
        flex: 1;
        overflow-x: hidden;

        h1, h2, h3, h4, h5 {
            margin: 0;
        }

        .header {
            background: red;
        }

        .footer {
            background: yellow;
        }
    }
}
</style>