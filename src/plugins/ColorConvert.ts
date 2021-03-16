/**
 * rgb 转 16进制颜色值
 * @param rgb 颜色值格式 RGB(255, 0, 0);
 */
const rgb2hex = (rgb: string) => {
    // var  rgb = this;
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(rgb)) {
        var aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = rgb;
        }
        return strHex;
    } else if (reg.test(rgb)) {
        var aNum = rgb.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return rgb;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    }
    return rgb;
};

/**
 * rgb 转hex
 * @param value RGB
 */
var colorHex = function (value: string) {
    var color: string = value.replace(/[^\d,]/g, '').replace(/(\d+)/g, function (s, s1) {
        return parseInt(s1).toString(16);
    });
    return '#' + color.replace(/,/g, '').toUpperCase();
};

/**
 * 16进制  转  RGB 颜色值
 * @param hex 16进制颜色值,格式 #FF9000;
 */
const hex2rgb = (hex: string): Array<number> | string => {
    // var hex = this;
    var sColor = hex.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }

        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }

        return sColorChange;
    }
    return sColor;
};

const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

/**
 * HSL颜色值转换为RGB. 
 * 
 * HSL色彩模式是工业界的一种颜色标准，是通过对色调(H)、饱和度(S)、亮度(L)三个颜色通道的变化
 * 以及它们相互之间的叠加来得到各式各样的颜色的，HSL即是代表色调，饱和度，亮度三个通道的颜色，
 * 这个标准几乎包括了人类视力所能感知的所有颜色，是目前运用最广的颜色系统之一。
 * 
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, l 设定在 [0, 1] 之间
 * 返回的 r, g, b 在 [0, 255]之间
 *
 * @param   Number  H(Hue)              色相(0或360表示红色，120 表示绿色，240 表示蓝色)
 * @param   Number  S(Saturation)       饱和度(0%到100%)
 * @param   Number  L(Lightness)        亮度(0%到100%)
 * @return  Array           RGB色值数值
 */
const hsl2rgb = (h: number, s: number, l: number) => {
    h /= 360;

    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
* RGB 颜色值转换为 HSL.
* 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
* r, g, 和 b 需要在 [0, 255] 范围内
* 返回的 h, s, 和 l 在 [0, 1] 之间
*
* @param   Number  r       红色色值
* @param   Number  g       绿色色值
* @param   Number  b       蓝色色值
* @return  Array           HSL各值数组
*/
const rgb2hsl = (r: number, g: number, b: number) => {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}


/**
 * RGB转HSB/HSV的方法
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  Array           HSL各值数组
 */
const rgb2hsv = (r: number, g: number, b: number) => {
    r /= 255, g /= 255, b /= 255;
    let h = 0, s = 0, v = 0;
    var min = Math.min(r, g, b);
    var max = v = Math.max(r, g, b);
    var l = (min + max) / 2;
    var difference = max - min;

    if (max == min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / difference + (g < b ? 6 : 0);
                break;
            case g:
                h = 2.0 + (b - r) / difference;
                break;
            case b:
                h = 4.0 + (r - g) / difference;
                break;
        }
        h = Math.round(h * 60);
    }
    if (max == 0) {
        s = 0;
    } else {
        s = 1 - min / max;
    }
    s = Math.round(s * 100);
    v = Math.round(v * 100);
    return [h, s, v];
}

/**
 * HSV/HSB转RGB色值
 * @param h 
 * @param s 
 * @param v 
 */
const hsv2rgb = (h: number, s: number, v: number) => {
    s = s / 100;
    v = v / 100;
    var r = 0, g = 0, b = 0;
    var i = parseInt(((h / 60) % 6).toString());
    var f = h / 60 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    switch (i) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
        default:
            break;
    }

    r = parseInt((r * 255.0).toString());
    g = parseInt((g * 255.0).toString());
    b = parseInt((b * 255.0).toString());
    return [r, g, b];
}

/**
 * CMYK 转 RGB 颜色
 *
 * CMYK 是彩色印刷时采用的一种套色模式，利用色料的三原色混色原理，加上黑色油墨，
 * 共计四种颜色混合叠加，形成所谓“全彩印刷”，是减色模式。所以，只要在屏幕上显示
 * 的图像，是RGB模式来表现。在印刷品上看到的图像，是CMYK模式表现。
 * 
 * 参考 https://www.qtccolor.com/tool/cmyk2rgb.aspx 
 * 注意： CMYK 不能直接转换成RGB模式，exifr 读取icc 文件可以转换
 * @param c (Cyan)      紫色
 * @param m (Magenta)   青色
 * @param y (Yellow)    黄色
 * @param k (Black)     黑色
 */
const cmyk2rgb = (c: number, m: number, y: number, k: number) => {
    function padZero(str: string) {
        return "000000".substr(str.length) + str
    }

    let cyan = (c * 255 * (1 - k)) << 16;
    let magenta = (m * 255 * (1 - k)) << 8;
    let yellow = (y * 255 * (1 - k)) >> 0;

    let black = 255 * (1 - k);
    let white = black | black << 8 | black << 16;

    let color = white - (cyan | magenta | yellow);

    return ("#" + padZero(color.toString(16)));
}

export {
    colorHex,
    rgb2hex,
    hex2rgb,
    hue2rgb,
    hsl2rgb,
    rgb2hsl,
    rgb2hsv,
    hsv2rgb,
    cmyk2rgb
};

