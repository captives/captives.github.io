interface MatrixType {
  a: number;
  b: number;
  c: number;
  d: number;
  x: number;
  y: number;
}

class Matrix {
  public static temp: Matrix = new Matrix();

  public a: number;
  public b: number;
  public c: number;
  public d: number;
  public x: number;
  public y: number;

  constructor(
    a?: number,
    b?: number,
    c?: number,
    d?: number,
    x?: number,
    y?: number
  ) {
    this.a = a || 1;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 1;
    this.x = x || 0;
    this.y = y || 0;
  }

  //等于
  public equals(m: Matrix) {
    if (
      this.a === m.a &&
      this.b === m.b &&
      this.c === m.c &&
      this.d === m.d &&
      this.x === m.x &&
      this.y === m.y
    ) {
      return true;
    }
    return false;
  }

  //默认值
  public identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.x = 0;
    this.y = 0;
  }

  //克隆
  public clone() {
    return new Matrix(this.a, this.b, this.c, this.d, this.x, this.y);
  }

  //拷贝
  public copyFrom(m: Matrix) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.x = m.x;
    this.y = m.y;
  }

  //旋转
  public rotate(angle: number) {
    const u = Math.cos(angle);
    const v = Math.sin(angle);

    let temp = this.a;
    this.a = u * this.a - v * this.b;
    this.b = v * temp + u * this.b;
    temp = this.c;
    this.c = u * this.c - v * this.d;
    this.d = v * temp + u * this.d;
    temp = this.x;
    this.x = u * this.x - v * this.y;
    this.y = v * temp + u * this.y;
  }

  //平移
  public translate(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  //连接
  public concat(m: Matrix) {
    let a = this.a * m.a;
    let b = 0;
    let c = 0;
    let d = this.d * m.d;
    let x = this.x * m.a + m.x;
    let y = this.y * m.d + m.y;

    if (this.b !== 0 || this.c !== 0 || m.b !== 0 || m.c !== 0) {
      a += this.b * m.c;
      d += this.c * m.b;
      b += this.a * m.b + this.b * m.d;
      c += this.c * m.a + this.d * m.c;
      x += this.y * m.c;
      y += this.x * m.b;
    }

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.x = x;
    this.y = y;
  }

  //转换
  public invert() {
    if (this.b === 0 && this.c === 0 && this.a !== 0 && this.d !== 0) {
      this.a = 1 / this.a;
      this.d = 1 / this.d;
      this.b = 0;
      this.c = 0;
      this.x = -this.a * this.x;
      this.y = -this.d * this.y;
    } else {
      let det = this.a * this.d - this.b * this.c;
      if (det === 0) {
        this.identity();
        return;
      }
      det = 1 / det;

      let temp = this.a;
      this.a = this.d * det;
      this.b = -this.b * det;
      this.c = -this.c * det;
      this.d = temp * det;

      temp = this.y;
      this.y = -(this.b * this.x + this.d * this.y);
      this.x = -(this.a * this.x + this.c * temp);
    }
  }

  public getRotationX() {
    return Math.atan2(this.b, this.a);
  }

  public getRotationY() {
    return Math.atan2(this.c, this.d);
  }

  public getTransformedX(x: number, y: number) {
    return this.x + this.a * x + this.c * y;
  }

  public getTransformedY(x: number, y: number) {
    return this.y + this.d * y + this.b * x;
  }

  //缩放矩阵
  public scale(x: number, y: number) {
    this.a *= x;
    this.b *= y;
    this.c *= x;
    this.d *= y;
    this.x *= x;
    this.y *= y;
  }

  //控制点
  public containsPoint(x: number, y: number, w: number, h: number) {
    // find mouse in local target space
    // and check within bounds of that area
    const inv = Matrix.temp; // use pooled Matrix to reduce allocations
    inv.copyFrom(this);
    inv.invert();

    const tx = inv.x + inv.a * x + inv.c * y;
    const ty = inv.y + inv.d * y + inv.b * x;
    // compare locations in non-transformed space (inverted)
    if (tx >= 0 && tx <= w && ty >= 0 && ty <= h) {
      return true;
    }

    return false;
  }
}

export default Matrix;
