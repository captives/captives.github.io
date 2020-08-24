
/**
 * 矩阵, 3行3列的数表,也称为三阶方阵
 * X轴    a    c    e
 * Y轴    b    d    f
 * Z轴    0    0    1
 */
class Matrix {
    private a: number;
    private b: number;
    private c: number;
    private d: number;
    private x: number; //X轴水平偏移量
    private y: number; //Y轴垂直偏移量
    constructor(a: number, b: number, c: number, d: number, x: number, y: number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.x = x;
        this.y = y;
    }

    /**
     * 默认值
     */
    public identity() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.x = 0;
        this.y = 0;
    }

    /**
     * 矩阵相等, 同型矩阵,对应的每个元素都相等;
     * 即,行和行,列和列,值相等
     * @param m 
     */
    public equals(m: Matrix) {
        if (this.a === m.a
            && this.b === m.b
            && this.c === m.c
            && this.d === m.d
            && this.x === m.x
            && this.y === m.y) {
            return true;
        }
        return false;
    }

    /**
     * 拷贝
     * @param m 
     */
    public copy(m: Matrix) {
        this.a = m.a;
        this.b = m.b;
        this.c = m.c;
        this.d = m.d;
        this.x = m.x;
        this.y = m.y;
    }

    /**
     * 克隆副本
     */
    public clone() {
        return new Matrix(this.a, this.b, this.c, this.d, this.x, this.y);
    }

    //缩放矩阵
    public scale(x: number, y: number) {

    }

    /**
     * 相加,两个相同大小的矩阵,对应元素相加
     * @param m 
     */
    public addition(m: Matrix): Matrix {
        return new Matrix(this.a + m.a, this.b + m.b, this.c + m.c, this.d + m.d, this.x + m.x, this.y + m.y);
    }

    /**
     * 相减,两个相同大小的矩阵,对应元素相减
     * @param m 
     */
    public subtract(m: Matrix) {
        return new Matrix(this.a - m.a, this.b - m.b, this.c - m.c, this.d - m.d, this.x - m.x, this.y - m.y);
    }

    /**
     * 乘积, 左一行右一列,相乘再相加
     * @param m 
     */
    public concat(m: Matrix): Matrix {
        // a  c  x			a  c  x
        // b  d  y			b  d  y
        // 0  0  1			0  0  1

        let a = this.a * m.a + this.c * m.b + this.x * 0;
        let c = this.a * m.c + this.c * m.d + this.x * 0;
        let x = this.a * m.x + this.c * m.y + this.x * 1;
        let b = this.b * m.a + this.d * m.b + this.y * 0;
        let d = this.b * m.c + this.d * m.d + this.y * 0;
        let y = this.b * m.x + this.d * m.y + this.y * 1;

        return new Matrix(a, b, c, d, x, y);
    }

    public toString() {
        return `matrix(${this.a.toFixed(4)}, ${this.b.toFixed(4)}, ${this.c.toFixed(4)}, ${this.d.toFixed(4)}, ${this.x.toFixed(4)}, ${this.y.toFixed(4)})`;
    }
}

export default Matrix;