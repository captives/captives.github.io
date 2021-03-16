<template>
    <el-main>
        <h1>CSS3 transform 中的 matrix</h1>
        <h3>CSS3 中 transform</h3>
        <p>
            CSS3 中使用 transform 可以对元素进行变换, 其中包含：位移
            <em>translate</em>、旋转 <em>rotate</em>、扭曲/斜切 <em>skew</em>、缩放
            <em>scale</em>。也可以使用 matrix 的方式来控制元素变换。
        </p>
        <vue-code>
            <pre lang="html">&lt;div class="block"&gt;楷&lt;/div&gt;</pre>
            <pre lang="css">
.block {
    position: absolute;
    display: block;
    width: 200px;
    height: 220px;
    line-height: 200px;
    text-align: center;
    border-radius: 5px;
    font-family: &#x27;华文楷体&#x27;;
    font-size: 5cm;
    background-image: -webkit-linear-gradient(bottom, #F56C6C, #FFFFFF);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.55);
}</pre>
        </vue-code>
        <p>
            首先使用
            <em>translate</em>
            <em>rotate</em>
            <em>skew</em>
            <em>scale</em>的方式：
        </p>
        <vue-code>
            <pre lang="css">
.block {
    transform: translate(666px, 278px) rotate(-25deg) skew(-50deg, 30deg) scale(1, 1)
  }
</pre>
        </vue-code>
        <p>
            等同于用
            <em>matrix</em>的方式：
        </p>
        <vue-code>
            <pre lang="css">
.block {
    transform: matrix(1.1503, 0.1006, -0.6575, 1.4100, 666.0000, 278.0000)
  }
</pre>
        </vue-code>

        <h3>CSS3中的矩阵</h3>
        <p>
            Matrix的中文是矩阵，在计算机科学中，会用矩阵来对向量进行变换，在css3的transform属性中，可以使用矩阵对图像进行变换。
        </p>
        <p>
            CSS3中的矩阵指的是一个方法，书写为matrix()和matrix3d()，前者是元素2D平面的移动变换(transform)，后者则是3D变换。2D变换矩阵为3x3；3D变换则是4x4的矩阵。
        </p>
        <p>transform的matrix()方法格式如下:</p>
        <vue-code>
            <pre lang="js">
matrix(a: number, b: number, c: number, d: number, x: number, y: number)</pre>
        </vue-code>
        <p>参数对应矩阵的格式为</p>
        <p>
            <img :src="images.matrix1" alt />
        </p>
        <p>
            第一行代表的是X轴变化，第二行代表的是Y轴的变化，第三行代表的是Z轴的变化，2D不涉及到Z轴，这里使用
            0 0 1;
        </p>
        <p>对应规则大致为:</p>
        <ul>
            <li>a : X轴水平缩放 scaleX, 默认值: 1</li>
            <li>b : Y轴纵向斜切（拉伸） skewY, 默认值: 0</li>
            <li>c : X轴横向斜切（拉伸） skewX, 默认值: 0</li>
            <li>d : Y轴纵向缩放 scaleY, 默认值: 1</li>
            <li>e : X轴水平偏移量 translateX, 默认值: 0</li>
            <li>f : Y轴垂直偏移量 translateY, 默认值: 0</li>
        </ul>

        <h3>矩阵和向量的计算</h3>
        <p>
            <img :src="images.matrix2" alt />
        </p>
        <p>
            矩阵相乘的规则
            <b>左一行右一列,相乘再相加</b>, <em>ax+cy+e</em>为变换后的水平坐标，
            <em>bx+dy+f</em>
            表示变换后的垂直位置
        </p>

        <h3>缩放 scale(x, y)</h3>
        <p>
            默认值(1, 1),
            缩放对应的是矩阵中的a和d，x轴的缩放比例对应a，y轴的缩放比例对应d。
        </p>
        <vue-code>
            <pre lang="css">
transform: scale(1.5, 2);
//等同于
transform: matrix(1.5, 0, 0, 2, 0, 0);</pre>
        </vue-code>

        <h3>平移 translate(x, y)</h3>
        <p>默认值(0, 0), 平移对应的是矩阵中的e和 f。x的平移对应e, y的平移对应f。</p>
        <vue-code>
            <pre lang="css">
transform: translate(300, 150);
//等同于
transform: matrix(1, 0, 0, 1, 300, 150);</pre>
        </vue-code>

        <h3>旋转 rotate(θdeg)</h3>
        <p>默认值(0), 旋转影响的是a、b、c、d四个值。</p>
        <ul>
            <li>a = cosθ</li>
            <li>b = sinθ</li>
            <li>c = -sinθ</li>
            <li>d = cosθ</li>
        </ul>
        <vue-code>
            <pre lang="css">
transform: rotate(30);
//等同于
const r = π / 180 × θ;
transform: matrix(cos(r), sin(r), -sin(r), cos(r), 0, 0);</pre>
        </vue-code>

        <p>
            如果要获取弧度值,必须先将角度值转成弧度值, 公式
            <em>r = π / 180 * θ</em>
        </p>
        <vue-code>
            <pre lang="css">
// 弧度和角度的转换公式：r = π / 180 × θ 
const radian = Math.PI / 180 * 30 // 算出弧度

const sin = Math.sin(radian); // 计算 sinθ
const cos = Math.cos(radian); // 计算 cosθ</pre>
        </vue-code>

        <h3>扭曲/斜切 skew(x, y)</h3>
        <p>
            默认值(0, 0), 扭曲/斜切对应的是矩阵中的c和 b。x的斜切对应c, y的斜切对应b。
            这个值对应并不是相等，需要对skew的x值和y值进行tan运算。
        </p>
        <vue-code>
            <pre lang="css">
transform: skew(20deg, 30deg);
//等同于
const tan20 = Math.tan(Math.PI / 180 * 20);
const tan30 = Math.tan(Math.PI / 180 * 30);
transform: matrix(1, tan30, tan20, 1, 0, 0);</pre>
        </vue-code>

        <h3>复合使用</h3>
        <p>
            在实际使用中,我们会复合使用这些,
            那么我们就需要将缩放、平移、旋转、斜切等按照
            <em>transform</em>里scale、translate、rotate、skew对应顺序的多个矩阵相乘即可。
        </p>
        <h3>附录</h3>
        <p>
            <span class="el-dropdown-link" @click="drawer.visible = !drawer.visible">查看示例</span>、
            <source-code :value="sources">查看源码</source-code>
        </p>

        <h3>补: 矩阵计算</h3>
        <p>一、矩阵的加减法</p>
        <p>两个相同大小的矩阵,对应的各元素进行相加、相减;</p>
        <p>
            <img :src="images.matrix8" alt />
        </p>
        <p>二、矩阵的乘法</p>
        <p>两个矩阵相乘,必须A矩阵列数和B矩阵的行数相同才能运算</p>
        <p>
            用小写字母代表第一个矩阵,用大写字母代表第二个矩阵, 根据矩阵相乘
            <em>左一行右一列,相乘再相加</em>原则,拆分如图:
        </p>
        <p>
            <img :src="images.matrix3" alt />
        </p>
        <p>简化后,效果如下</p>
        <p>
            <img :src="images.matrix4" alt />
        </p>

        <p>矩阵乘法注意事项</p>
        <ul>
            <li>矩阵没有交换律, AB ≠ BA (A = 2x3, B = 3x3; AB有意义, BA不能相乘)</li>
            <li style="display: flex; align-items: center">
                <img :src="images.matrix5" alt />&nbsp;&nbsp;与&nbsp;&nbsp;
                <img :src="images.matrix6" alt />
            </li>
            <li>两个非0矩阵, 结果可能为0矩阵;</li>
            <li>由 AB = 0 ≠> A=0 或 B=0</li>
            <li>由 AB = AC, A ≠ 0 ≠> B = C</li>
            <li>
                单位矩阵可以与任何与之相乘的矩阵交换; 即
                <em>EA = AE = A</em> (条件, 可以相乘)
            </li>
            <li>
                数量矩阵可以与任何可与之相乘的矩阵交换; 即
                <em>(kE)A = A(kE) = kA</em>, k是一个数;(条件, 可以相乘)
            </li>
            <li>
                方阵可以与其逆矩阵交换; 即
                <em>AB = BA = E</em>
            </li>
            <li>
                方阵可以与其伴随矩阵交换; 即
                <em>
                    AA
                    <sup>*</sup> = A <sup>*</sup>A = |A|E
                </em>
            </li>
        </ul>
        <p>运算规律</p>
        <ul>
            <li>
                结合律
                <em>(AB)C = A(BC)</em>
            </li>
            <li>
                分配律
                <em>(A+B)C = AC + BC, C(A+B) = CA + CB</em>
            </li>
            <li>
                数与乘积的结合律
                <em>(kA)B = A(kB) = k(AB)</em> (A、B没有变化位置)
            </li>
        </ul>
        <p>三、行列式</p>
        <ul>
            <li>|AB| = |A|B| = |BA|</li>
        </ul>
        <p>四、转置</p>
        <p>
            把方阵A
            <sub>2x4</sub>的行变为新方阵B <sub>4x2</sub>列的形式, B就是A的转置矩阵;
        </p>
        <p>
            <img :src="images.matrix7" alt />
        </p>
        <p>运算规律(假定运算都是可行的)</p>
        <ul>
            <li>
                (A
                <sup>T</sup>) <sup>T</sup> = A
            </li>
            <li>
                (A + B)
                <sup>T</sup> = A <sup>T</sup> + B
                <sup>T</sup>
            </li>
            <li>
                (λA)
                <sup>T</sup> = λA
                <sup>T</sup>
            </li>
            <li>
                (AB)
                <sup>T</sup> = B <sup>T</sup>A
                <sup>T</sup>
            </li>
            <li>
                (A
                <sup>n</sup>) <sup>T</sup> = (A <sup>T</sup>)
                <sup>n</sup>
            </li>
            <li>
                (A
                <sup>-1</sup>) <sup>T</sup> = (A <sup>T</sup>)
                <sup>-1</sup>
            </li>
            <li>
                (A
                <sup>*</sup>) <sup>T</sup> = (A <sup>T</sup>)
                <sup>*</sup>
            </li>
        </ul>

        <el-drawer title="CSS3 transform 中的 matrix" :visible.sync="drawer.visible" direction="ltr" size="100%">
            <CSSMatrix></CSSMatrix>
        </el-drawer>
    </el-main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CSSMatrix from "./CSSMatrix.vue";
import images from "./image";
@Component({
    name: "index",
    components: { CSSMatrix },
})
export default class index extends Vue {
    private drawer: any = { visible: false };
    private images: any = images;
    private sources: Array<any> = [
        { value: "tutorial/views/matrix/CSSMatrix.vue", lang: "html" },
        { value: "tutorial/views/matrix/Sidebar.vue", lang: "html" },
        { value: "tutorial/views/matrix/Matrix.ts", lang: "js" },
    ];
}
</script>
<style lang="stylus" scoped>
.el-main {
    width: 60%;
    margin: 0 auto;

    ul {
        list-style: auto;
        margin-left: 40px;

        li {
            padding-left: 15px;
            list-style-type: decimal;
        }
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    img {
        max-width: 100%;
    }
}
</style>
