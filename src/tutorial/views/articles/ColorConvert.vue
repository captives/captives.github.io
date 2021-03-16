<template>
    <el-main class="center">
        <h3>JavaScript颜色转换的核心</h3>
        <p> JavaScript颜色转换的核心就是进制间的转换。RGB格式其实就是十进制表示法，所以，十六进制颜色与RGB颜色的转换就是十六进制与十进制之间的转换。</p>
        <p>十六进制转换为十进制相对容易些，核心代码如下示例：<em>parseInt("0xFF")</em>，其结果就是255，”0x”就表明当前是16进制，由于parseInt后面无参数，默认就是转换为10进制了。</p>
        <p>十进制转换为16进制，核心代码如下：<em>var num=255; num.toString(16);</em>，其结果是FF。”16″表示数值转换为16进制字符串。</p>

        <h3>JavaScript颜色表示方式的转换的实现</h3>

        <ColorRGBToHex>
            <p>RGB颜色转换为十六进制</p>
        </ColorRGBToHex>

        <ColorHexToRGB>
            <p>十六进制颜色转为RGB格式</p>
        </ColorHexToRGB>
        <vue-code>
            <pre lang="html">{{ list }}</pre>
        </vue-code>

    </el-main>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import ColorRGBToHex from '@/components/ColorRGBToHex.vue';
import ColorHexToRGB from '@/components/ColorHexToRGB.vue';

@Component({ name: 'ColorConvert', components: { ColorRGBToHex, ColorHexToRGB } })
export default class ColorConvert extends Vue {

    private get list() {
        return [
            //@ts-ignore;
            { name: ColorRGBToHex.name, src: ColorRGBToHex['__file'] },
            //@ts-ignore;
            { name: ColorHexToRGB.name, src: ColorHexToRGB['__file'] },
        ];
    }
}
</script>