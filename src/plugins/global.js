import './../assets/css/code-style.css';
import Code from './../components/Code';
import Source from './../components/Source';
import SourceCode from './../components/SourceCode';
import URLInput from './../components/URLInput.vue';

/**Vue 全局属性、方法*/
export default {
    install(Vue) {
        Vue.component('el-code', Code);
        Vue.component('url-input', URLInput);
        Vue.component('el-source', Source);
        Vue.component('source-code', SourceCode);

        Vue.prototype.$videoList = [
            { label: "Parkour 720P MP4", value: "/medias/parkour_720P.mp4" },
            { label: "Parkour 720P WEBM", value: "/medias/parkour_720P.webm" },
            { label: "Parkour 1080P MP4", value: "/medias/parkour_1080P.mp4" },
            { label: "Parkour 1080P WEBM", value: "/medias/parkour_1080P.webm" },

            { label: "Piper 720P", value: "/medias/Piper_720P.mp4" },
            { label: "Piper 1080P", value: "/medias/Piper_1080P.mp4" },

            { label: "汽车 绿幕视频", value: "/medias/green-screen-car.mp4" },
        ];
    }
}