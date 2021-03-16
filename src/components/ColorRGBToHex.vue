<template>
    <el-card class="box-card">
        <div slot="header" :style="{color: value}">
            <slot>
                <span>颜色转换：RGB转16进制</span>
            </slot>
        </div>

        <el-form ref="form" :model="form" label-width="40px">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="R">
                        <el-input-number v-model="form.R" :min="0" :max="255"> </el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="G">
                        <el-input-number v-model="form.G" :min="0" :max="255"> </el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="B">
                        <el-input-number v-model="form.B" :min="0" :max="255"> </el-input-number>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="RGB">
                        <el-input v-model="rgb"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="Hex">
                        <el-input :value="value"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Hex">
                        <el-input :value="hex"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <slot name="footer">
            <vue-code>
                <pre lang="js">{{ rgb2hex }}</pre>
            </vue-code>
        </slot>
    </el-card>
</template>
<script>
import { rgb2hex, colorHex } from "@/plugins/ColorConvert";
export default {
    name: "ColorRGBToHex",
    data() {
        return {
            form: {
                R: 0,
                G: 0,
                B: 0,
            },
        };
    },
    computed: {
        rgb2hex() {
            return rgb2hex.toString();
        },
        rgb: {
            set(value) {
                let list = value.split(",");
                if (list.length < 3) {
                    list = [0, 0, 0];
                }

                this.form.R = Number(list[0].toString().trim()) || 0;
                this.form.G = Number(list[1].toString().trim()) || 0;
                this.form.B = Number(list[2].toString().trim()) || 0;
            },
            get() {
                return [this.form.R, this.form.G, this.form.B].join(", ");
            },
        },
        value() {
            return rgb2hex("RGB(" + this.rgb + ")").toUpperCase();
        },
        hex() {
            return this.value.replace("#", "0x");
        },
    },
};
</script>